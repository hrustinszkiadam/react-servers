import { useQuery } from '@tanstack/react-query';
import { fetchServers } from '@/lib/utils';
import Loading from '@/components/loading';
import ErrorDisplay from '@/components/error';
import ServersTable from '@/components/servers-table';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router';

export default function HomePage() {
  const {
    data: servers,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['servers'],
    queryFn: fetchServers,
    staleTime: 1000 * 60 * 5,
    refetchInterval: 1000 * 60 * 5,
  });

  if (isLoading) {
    return <Loading />;
  } else if (error) {
    return <ErrorDisplay error={error} />;
  }

  return (
    <section className='flex grow flex-col items-center justify-center gap-8'>
      <h1 className='text-3xl font-bold'>Servers</h1>
      <div className='max-h-1/2 w-full max-w-[100vw] overflow-auto pb-3'>
        <ServersTable servers={servers || []} />
      </div>
      <Button
        size='lg'
        asChild
        className='w-1/2 md:w-1/4'
      >
        <Link to='/servers/new'>Add New Server</Link>
      </Button>
    </section>
  );
}
