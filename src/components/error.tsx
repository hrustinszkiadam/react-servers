export default function ErrorDisplay({ error }: { error: Error }) {
  return (
    <div className='flex grow items-center justify-center text-center text-3xl font-bold tracking-wider text-pretty text-red-400'>
      Error: {error.message}
    </div>
  );
}
