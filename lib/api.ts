import axios from 'axios';
import type { CreateNotePayload, Note } from '../types/note';

const token = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;

const axiosInstance = axios.create({
  baseURL: 'https://notehub-public.goit.study/api',
  headers: { Authorization: `Bearer ${token}` },
});

export interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

interface FetchNotesParams {
  page?: number;
  perPage?: number;
  search?: string;
  tag?: string;
  sortBy?: 'created' | 'updated';
}

export async function fetchNotes({
  page = 1,
  perPage = 12,
  search = '',
  tag = '',
  sortBy = 'created',
}: FetchNotesParams = {}): Promise<FetchNotesResponse> {
  const params: Record<string, string | number> = { page, perPage, sortBy };

  if (search.trim()) params.search = search.trim();
  if (tag.trim() && tag.trim().toLowerCase() !== 'all') {
    params.tag = tag.trim();
  }

  const { data } = await axiosInstance.get<FetchNotesResponse>('/notes', { params });
  return data;
}

export const fetchNoteById = async (id: string): Promise<Note> => {
  const { data } = await axiosInstance.get<Note>(`/notes/${id}`);
  return data;
};

export const createNote = async (note: CreateNotePayload): Promise<Note> => {
  const { data } = await axiosInstance.post<Note>('/notes', note);
  return data;
};

export const deleteNote = async (id: string): Promise<Note> => {
  const { data } = await axiosInstance.delete<Note>(`/notes/${id}`);
  return data;
};

export const getTags = async (): Promise<string[]> => {
  try {
    const { notes } = await fetchNotes({ page: 1, perPage: 100 });
    return Array.from(
      new Set(
        notes
          .map(n => n.tag?.trim())
          .filter((t): t is string => Boolean(t && t.length))
      )
    );
  } catch (e) {
    console.error('Failed to fetch tags', e);
    return [];
  }
};