import CreateServerForm from '@/components/create-server';
import ErrorDisplay from '@/components/error';
import Loading from '@/components/loading';
import { fetchServerById } from '@/lib/utils';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router';

export default function EditServerPage() {
  const { id } = useParams();
  const {
    data: server,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['server', id],
    queryFn: async () => {
      if (!id || Number.isNaN(Number(id))) {
        throw new Error('Invalid server ID provided');
      }
      return await fetchServerById(Number(id));
    },
    staleTime: 1000 * 60 * 5,
    refetchInterval: 1000 * 60 * 5,
  });

  if (isLoading) {
    return <Loading />;
  } else if (error) {
    return <ErrorDisplay error={error} />;
  }

  return (
    <section className='flex grow items-center justify-center gap-8 p-4'>
      <CreateServerForm server={server} />
    </section>
  );
}
