import type { Server } from '@/lib/definitions';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from './ui/button';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteServer } from '@/lib/utils';
import { Link, useNavigate } from 'react-router';

export default function ServersTable({ servers }: { servers: Server[] }) {
  if (!servers.length) {
    return (
      <p className='p-4 text-center'>
        There haven't been any servers added yet.
      </p>
    );
  }
  return (
    <Table className='mx-auto w-full overflow-x-auto md:w-2/3'>
      <TableCaption>A list of your servers.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className='w-[100px]'>ID</TableHead>
          <TableHead>IP Address</TableHead>
          <TableHead>MAC Address</TableHead>
          <TableHead>Memory (GB)</TableHead>
          <TableHead>Storage (GB)</TableHead>
          <TableHead>Nickname</TableHead>
          <TableHead className='text-right'>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {servers.map((server) => (
          <ServerTableRow
            key={server.id}
            server={server}
          />
        ))}
      </TableBody>
    </Table>
  );
}

export function ServerTableRow({ server }: { server: Server }) {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const deleteMutuation = useMutation({
    mutationKey: ['deleteServer'],
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['servers'],
      });
      navigate('/');
    },
    mutationFn: deleteServer,
  });

  return (
    <TableRow className='cursor-pointer'>
      <TableCell className='font-medium'>{server.id}</TableCell>
      <TableCell>{server.ip_address}</TableCell>
      <TableCell>{server.mac_address}</TableCell>
      <TableCell>{server.memory_gb} GB</TableCell>
      <TableCell>{server.storage_gb} GB</TableCell>
      <TableCell>{server.nickname ? server.nickname : 'N/A'}</TableCell>
      <TableCell className='space-x-4 text-right'>
        <Button
          size='sm'
          asChild
        >
          <Link to={`/servers/${server.id}`}>Details</Link>
        </Button>
        <Button
          variant='outline'
          size='sm'
          asChild
        >
          <Link to={`/servers/${server.id}/edit`}>Edit</Link>
        </Button>
        <Button
          variant='destructive'
          size='sm'
          onClick={() => {
            if (!confirm('Are you sure you want to delete this server?')) {
              return;
            }
            deleteMutuation.mutate(server.id);
          }}
        >
          Delete
        </Button>
      </TableCell>
    </TableRow>
  );
}
