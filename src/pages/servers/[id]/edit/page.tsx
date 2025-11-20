import CreateServerForm from '@/components/create-server';
import ErrorDisplay from '@/components/error';
import Loading from '@/components/loading';
import { Button } from '@/components/ui/button';
import { fetchServerById } from '@/lib/utils';
import { useQuery } from '@tanstack/react-query';
import { Link, useParams } from 'react-router';

export default function EditServerPage() {
  const { id } = useParams();
  const {
    data: server,
    isLoading,
    error,
  } = useQuery({
    queryKey: [`server-${id}`],
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
    <section className='flex grow flex-col items-center justify-center gap-8 p-4'>
      <CreateServerForm server={server} />
      <Button
        asChild
        className='w-1/2 md:w-1/4 lg:w-1/5'
      >
        <Link to={`/servers/${id}`}>Back to Server</Link>
      </Button>
    </section>
  );
}
