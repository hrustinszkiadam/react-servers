import CreateServerForm from '@/components/create-server';

export default function NewServerPage() {
  return (
    <section className='flex grow items-center justify-center gap-8 p-4'>
      <CreateServerForm />
    </section>
  );
}
