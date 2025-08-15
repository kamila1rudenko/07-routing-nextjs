import axios from 'axios';
import type { CreateNotePayload, Note } from '../types/note';
const BASE_URL = 'https://notehub-public.goit.study/api';
const API_TOKEN = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN || '';

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

export const fetchNotes = async ({
  page = 1,
  perPage = 12,
  search = '',
  tag = '',
  sortBy = 'created',
}: FetchNotesParams = {}): Promise<FetchNotesResponse> => {
  const params: Record<string, string | number> = { page, perPage, sortBy };

  const s = search.trim();
  if (s) params.search = s;

  const t = tag.trim();
  if (t && t.toLowerCase() !== 'all') params.tag = t; // "All" не отправляем

  const response = await axios.get<FetchNotesResponse>(`${BASE_URL}/notes`, {
    params,
    headers: { Authorization: `Bearer ${API_TOKEN}` },
  });
  return response.data;
};

export const fetchNoteById = async (id: string): Promise<Note> => {
  const response = await axios.get<Note>(`${BASE_URL}/notes/${id}`, {
    headers: { Authorization: `Bearer ${API_TOKEN}` },
  });
  return response.data;
};

export const createNote = async (noteData: CreateNotePayload): Promise<Note> => {
  const response = await axios.post<Note>(`${BASE_URL}/notes`, noteData, {
    headers: { Authorization: `Bearer ${API_TOKEN}` },
  });
  return response.data;
};

export const deleteNote = async (noteId: string): Promise<Note> => {
  const response = await axios.delete<Note>(`${BASE_URL}/notes/${noteId}`, {
    headers: { Authorization: `Bearer ${API_TOKEN}` },
  });
  return response.data;
};


// export const getTags = async (): Promise<string[]> => {
//   const { notes } = await fetchNotes({ page: 1, perPage: 100 });
//   return Array.from(
//     new Set(
//       notes.map(n => n.tag?.trim()).filter((t): t is string => Boolean(t))
//     )
//   );
// };