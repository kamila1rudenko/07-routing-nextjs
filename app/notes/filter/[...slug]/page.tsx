import { fetchNotes } from '@/lib/api';
import NotesClient from './Notes.client';

export default async function NotesPage(
  { params }: { params: { slug?: string[] } }
) {
  const tagFromSlug = params.slug?.[0] || '';
  const tag = tagFromSlug === '' || tagFromSlug.toLowerCase() === 'all'
    ? ''
    : tagFromSlug;

  const initialData = await fetchNotes({ page: 1, perPage: 12, tag });

  return <NotesClient initialData={initialData} initialTag={tag} />;
}