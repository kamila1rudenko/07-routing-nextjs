'use client';

import css from './Notes.module.css';
import { useState } from 'react';
import { useDebounce } from 'use-debounce';

import ErrorMessage from '@/components/ErrorMessage/ErrorMessage';
import SearchBox from '@/components/SearchBox/SearchBox';
import Pagination from '@/components/Pagination/Pagination';
import NoteList from '@/components/NoteList/NoteList';
import NoteModal from '@/components/Modal/Modal';
import NoteForm from '@/components/NoteForm/NoteForm';
import Loading from '@/components/Loading/Loading';

import { fetchNotes } from '@/lib/api';
import type { FetchNotesResponse } from '@/lib/api';

import { useQuery, keepPreviousData } from '@tanstack/react-query';

interface NotesClientProps {
  initialData: FetchNotesResponse;
  initialTag: string | undefined;
}

export default function NotesClient({ initialData, initialTag }: NotesClientProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [debouncedSearchValue] = useDebounce(searchValue, 1000);
  const [currentPage, setCurrentPage] = useState(1);

  const { data, isFetching, isError, isSuccess } = useQuery({
    queryKey: ['notes', debouncedSearchValue, currentPage, initialTag],
    queryFn: () =>
      fetchNotes({
        search: debouncedSearchValue,
        page: currentPage,
        tag: initialTag || '', 
      }),
    placeholderData: keepPreviousData,
    refetchOnMount: false,
    initialData:
      debouncedSearchValue === '' && currentPage === 1 ? initialData : undefined,
  });

  const handleSearch = (search: string) => {
    setSearchValue(search);
    setCurrentPage(1);
  };

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  return (
    <div className={css.app}>
      <div className={css.toolbar}>
        <SearchBox value={searchValue} onChange={handleSearch} />
        {data && data.totalPages > 1 && (
          <Pagination
            currentPage={currentPage}
            pageCount={data.totalPages}
            onPageChange={setCurrentPage}
          />
        )}
        <button className={css.button} onClick={handleOpenModal}>
          Create Note +
        </button>
      </div>

      {isFetching && <Loading />}
      {isError && <ErrorMessage message="Failed to fetch notes" />}

      {data && isSuccess && (
        <>
          {data.notes.length > 0 ? (
            <NoteList notes={data.notes} />
          ) : (
            <div className={css.emptyState}>
              <p>No notes found. Create your first note!</p>
            </div>
          )}
        </>
      )}

      {isModalOpen && (
        <NoteModal onClose={handleCloseModal}>
          <NoteForm onSuccess={handleCloseModal} />
        </NoteModal>
      )}
    </div>
  );
}
