import CreateServerForm from '@/components/create-server';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router';

export default function NewServerPage() {
  return (
    <section className='flex grow flex-col items-center justify-center gap-8 p-4'>
      <CreateServerForm />
      <Button
        asChild
        className='w-1/2 md:w-1/4 lg:w-1/5'
      >
        <Link to='/'>Back to Servers List</Link>
      </Button>
    </section>
  );
}
