import { fetchNotes } from '@/lib/api';
import NotesClient from './Notes.client';

export default async function NotesPage(
  { params }: { params: Promise<{ slug?: string[] }> }
) {
  const { slug } = await params;

  const tagFromSlug = slug?.[0] || '';
  const tag = tagFromSlug === '' || tagFromSlug.toLowerCase() === 'all' ? '' : tagFromSlug;

  const initialData = await fetchNotes({ page: 1, perPage: 12, tag });

  return <NotesClient initialData={initialData} initialTag={tag} />;
}