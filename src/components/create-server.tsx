import type { FormState, Server } from '@/lib/definitions';
import { createServer, updateServer } from '@/lib/utils';
import { Activity, useActionState } from 'react';
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from './ui/field';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router';

export default function CreateServerForm({ server }: { server?: Server }) {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const actionFn = server
    ? updateServer.bind(null, server.id, navigate, queryClient)
    : createServer.bind(null, navigate, queryClient);
  const initialState: FormState = {
    fields: {
      ip_address: server?.ip_address || '',
      mac_address: server?.mac_address || '',
      memory_gb: server?.memory_gb.toString() || '',
      storage_gb: server?.storage_gb.toString() || '',
      nickname: server?.nickname || '',
    },
    errors: {},
  };

  const [state, formAction, isPending] = useActionState(actionFn, initialState);

  return (
    <form
      action={formAction}
      className='w-full space-y-8 tracking-wide md:w-1/2'
    >
      <FieldSet>
        <FieldLegend>Identification Details</FieldLegend>
        <FieldDescription>
          Please provide the server's ip- and mac address.
        </FieldDescription>
        <Field data-invalid={!!state.errors?.ip_address}>
          <FieldLabel htmlFor='ip_address'>IP Address</FieldLabel>
          <Input
            id='ip_address'
            name='ip_address'
            type='text'
            placeholder='192.168.1.1'
            defaultValue={state.fields.ip_address}
            aria-invalid={!!state.errors?.ip_address}
          />
          <Activity mode={state.errors?.ip_address ? 'visible' : 'hidden'}>
            {state.errors?.ip_address?.map((error: string) => (
              <FieldError key={error}>{error}</FieldError>
            ))}
          </Activity>
        </Field>
        <Field data-invalid={!!state.errors?.mac_address}>
          <FieldLabel htmlFor='mac_address'>MAC Address</FieldLabel>
          <Input
            id='mac_address'
            name='mac_address'
            type='text'
            placeholder='00:1A:2B:3C:4D:5E'
            defaultValue={state.fields.mac_address}
            aria-invalid={!!state.errors?.mac_address}
          />
          <Activity mode={state.errors?.mac_address ? 'visible' : 'hidden'}>
            {state.errors!.mac_address?.map((error: string) => (
              <FieldError key={error}>{error}</FieldError>
            ))}
          </Activity>
        </Field>
      </FieldSet>
      <FieldSet>
        <FieldLegend>Hardware Specifications</FieldLegend>
        <FieldDescription>
          Please provide the server's memory and storage capacity.
        </FieldDescription>
        <FieldGroup className='grid grid-cols-2 gap-4'>
          <Field data-invalid={!!state.errors?.memory_gb}>
            <FieldLabel htmlFor='memory_gb'>Memory (GB)</FieldLabel>
            <Input
              id='memory_gb'
              name='memory_gb'
              type='number'
              placeholder='16'
              defaultValue={state.fields.memory_gb}
              aria-invalid={!!state.errors?.memory_gb}
            />
            <Activity mode={state.errors?.memory_gb ? 'visible' : 'hidden'}>
              {state.errors!.memory_gb?.map((error: string) => (
                <FieldError key={error}>{error}</FieldError>
              ))}
            </Activity>
          </Field>
          <Field data-invalid={!!state.errors?.storage_gb}>
            <FieldLabel htmlFor='storage_gb'>Storage (GB)</FieldLabel>
            <Input
              id='storage_gb'
              name='storage_gb'
              type='number'
              placeholder='1024'
              defaultValue={state.fields.storage_gb}
              aria-invalid={!!state.errors?.storage_gb}
            />
            <Activity mode={state.errors?.storage_gb ? 'visible' : 'hidden'}>
              {state.errors!.storage_gb?.map((error: string) => (
                <FieldError key={error}>{error}</FieldError>
              ))}
            </Activity>
          </Field>
        </FieldGroup>
      </FieldSet>
      <FieldSet>
        <FieldLegend>Optional Nickname</FieldLegend>
        <FieldDescription>
          You can provide an optional nickname for the server.
        </FieldDescription>
        <Field data-invalid={!!state.errors?.nickname}>
          <FieldLabel htmlFor='nickname'>Nickname</FieldLabel>
          <Input
            id='nickname'
            name='nickname'
            type='text'
            placeholder='MyServer'
            defaultValue={state.fields.nickname}
            aria-invalid={!!state.errors?.nickname}
          />
        </Field>
        <Activity mode={state.errors?.nickname ? 'visible' : 'hidden'}>
          {state.errors!.nickname?.map((error: string) => (
            <FieldError key={error}>{error}</FieldError>
          ))}
        </Activity>
      </FieldSet>
      <Field>
        <Button
          type='submit'
          disabled={isPending}
        >
          {server
            ? isPending
              ? 'Updating...'
              : 'Update Server'
            : isPending
              ? 'Creating...'
              : 'Create Server'}
        </Button>
        <Activity mode={state.message ? 'visible' : 'hidden'}>
          {state.message && (
            <FieldError className='text-center'>{state.message}</FieldError>
          )}
        </Activity>
      </Field>
    </form>
  );
}
