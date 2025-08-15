import { fetchNotes } from '@/lib/api';
import NotesClient from './Notes.client';

type NotesPageProps = {
  params: { slug: string[] };
};

export default async function NotesPage({ params }: NotesPageProps) {
  const { slug } = params;
  const tag = slug[0] === 'All' ? '' : slug[0];

  console.log("Tag in page.tsx:", tag);

  const initialData = await fetchNotes({ page: 1, perPage: 12, tag });

  return <NotesClient initialData={initialData} initialTag={tag} />;
}
