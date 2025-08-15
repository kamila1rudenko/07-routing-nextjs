import axios, { AxiosError } from 'axios';
import type { CreateNotePayload, Note } from '../types/note';

const BASE_URL = 'https://notehub-public.goit.study/api';
const API_TOKEN = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN || '';

export interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

export interface FetchNotesParams {
  page?: number;
  perPage?: number;
  search?: string;
  tag?: string;
  sortBy?: 'created' | 'updated';
}

const validateParams = ({
  page = 1,
  perPage = 12,
  search = '',
  tag = '',
  sortBy = 'created',
}: FetchNotesParams = {}): Record<string, string | number> => {
  const params: Record<string, string | number> = {
    page: Math.max(1, page),
    perPage: Math.max(1, perPage),
  };

  if (sortBy === 'created' || sortBy === 'updated') {
    params.sortBy = sortBy;
  } else {
    params.sortBy = 'created';
  }

  const trimmedSearch = search.trim();
  if (trimmedSearch) params.search = trimmedSearch;

  const trimmedTag = (tag ?? '').trim().toLowerCase();
  if (trimmedTag && trimmedTag !== 'all') params.tag = trimmedTag;

  return params;
};

export const fetchNotes = async ({
  page = 1,
  perPage = 12,
  search = '',
  tag = '',
  sortBy = 'created',
}: FetchNotesParams = {}): Promise<FetchNotesResponse> => {
  if (!API_TOKEN) {
    throw new Error('API token is missing');
  }

  const params = validateParams({ page, perPage, search, tag, sortBy });

  console.log('Fetching notes with params:', params);
  console.log('Using API token:', API_TOKEN ? 'Yes' : 'No');

  try {
    const response = await axios.get<FetchNotesResponse>(`${BASE_URL}/notes`, {
      params,
      headers: { Authorization: `Bearer ${API_TOKEN}` },
    });
    return response.data;
  } catch (error) {
    const err = error as AxiosError;
    console.error('API error fetching notes:', err.response?.data || err.message);
    throw err;
  }
};

export const fetchNoteById = async (id: string): Promise<Note> => {
  if (!API_TOKEN) {
    throw new Error('API token is missing');
  }

  try {
    const response = await axios.get<Note>(`${BASE_URL}/notes/${id}`, {
      headers: { Authorization: `Bearer ${API_TOKEN}` },
    });
    return response.data;
  } catch (error) {
    const err = error as AxiosError;
    console.error(`API error fetching note with id ${id}:`, err.response?.data || err.message);
    throw err;
  }
};

export const createNote = async (noteData: CreateNotePayload): Promise<Note> => {
  if (!API_TOKEN) {
    throw new Error('API token is missing');
  }

  try {
    const response = await axios.post<Note>(`${BASE_URL}/notes`, noteData, {
      headers: { Authorization: `Bearer ${API_TOKEN}` },
    });
    return response.data;
  } catch (error) {
    const err = error as AxiosError;
    console.error('API error creating note:', err.response?.data || err.message);
    throw err;
  }
};

export const deleteNote = async (noteId: string): Promise<Note> => {
  if (!API_TOKEN) {
    throw new Error('API token is missing');
  }

  try {
    const response = await axios.delete<Note>(`${BASE_URL}/notes/${noteId}`, {
      headers: { Authorization: `Bearer ${API_TOKEN}` },
    });
    return response.data;
  } catch (error) {
    const err = error as AxiosError;
    console.error(`API error deleting note with id ${noteId}:`, err.response?.data || err.message);
    throw err;
  }
};