import ErrorDisplay from '@/components/error';
import Server from '@/components/server';
import { Button } from '@/components/ui/button';
import { Link, useParams } from 'react-router';

export default function ServerPage() {
  const { id } = useParams();
  if (!id || Number.isNaN(Number(id))) {
    return <ErrorDisplay error={new Error('No server ID provided')} />;
  }
  return (
    <section className='flex grow flex-col items-center justify-center gap-8 p-4'>
      <Server id={Number(id)} />
      <Button
        asChild
        className='w-1/2 md:w-1/4 lg:w-1/5'
      >
        <Link to={`/servers/${id}/edit`}>Edit Server</Link>
      </Button>
      <Button
        asChild
        className='w-1/2 md:w-1/4 lg:w-1/5'
      >
        <Link to='/'>Back to Servers List</Link>
      </Button>
    </section>
  );
}
