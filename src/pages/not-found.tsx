import { Button } from '@/components/ui/button';
import { Link } from 'react-router';

export default function NotFound() {
  return (
    <section className='flex grow flex-col items-center justify-center gap-8 p-4'>
      <h1 className='text-4xl font-bold'>404 - Not Found</h1>
      <Button asChild>
        <Link to='/'>Go to Home</Link>
      </Button>
    </section>
  );
}
