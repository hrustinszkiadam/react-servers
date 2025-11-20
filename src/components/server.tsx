import ErrorDisplay from './error';
import { useQuery } from '@tanstack/react-query';
import Loading from './loading';
import { fetchServerById } from '@/lib/utils';
import * as Card from './ui/card';

export default function Server({ id }: { id: number }) {
  const {
    data: server,
    isLoading,
    error,
  } = useQuery({
    queryKey: [`server-${id}`],
    queryFn: () => fetchServerById(Number(id)),
    staleTime: 1000 * 60 * 5,
    refetchInterval: 1000 * 60 * 5,
  });

  if (isLoading) {
    return <Loading />;
  } else if (error || !server) {
    return <ErrorDisplay error={error || new Error('Server not found')} />;
  }

  return (
    <Card.Card className='mx-auto px-4 py-2 md:px-8 md:py-4'>
      <Card.CardHeader>
        <Card.CardTitle className='text-2xl font-bold'>
          Server Details
        </Card.CardTitle>
        <Card.CardDescription>
          Details for server with ID: {server.id}
        </Card.CardDescription>
      </Card.CardHeader>
      <Card.CardContent className='space-y-4 text-lg'>
        <p>
          <strong>IP Address:</strong> {server.ip_address}
        </p>
        <p>
          <strong>MAC Address:</strong> {server.mac_address}
        </p>
        <p>
          <strong>Memory (GB):</strong> {server.memory_gb}
        </p>
        <p>
          <strong>Storage (GB):</strong> {server.storage_gb}
        </p>
        <p>
          <strong>Nickname:</strong> {server.nickname}
        </p>
      </Card.CardContent>
    </Card.Card>
  );
}
