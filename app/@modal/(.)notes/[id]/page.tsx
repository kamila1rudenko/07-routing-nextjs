import { fetchNoteById } from '@/lib/api';
import { HydrationBoundary, dehydrate, QueryClient } from '@tanstack/react-query';
import NoteDetailsClient from './NotePreview.client';

export default async function NotePage({ params }: { params: { id: string } }) {
  const { id } = params;

  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ['note', id],
    queryFn: () => fetchNoteById(id),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NoteDetailsClient />
    </HydrationBoundary>
  );
}