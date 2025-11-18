import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import {
  CreateServerSchema,
  UpdateServerSchema,
  type FormState,
  type Server,
} from '@/lib/definitions';
import { API_BASE_URL } from './constats';
import z from 'zod';
import type { QueryClient } from '@tanstack/react-query';
import type { NavigateFunction } from 'react-router';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const fetchServers = async () => {
  const response = await fetch(`${API_BASE_URL}`);

  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return (await response.json()) as Server[];
};

export const fetchServerById = async (id: number) => {
  const response = await fetch(`${API_BASE_URL}/${id}`);

  if (response.status === 404) {
    throw new Error('Server not found');
  }

  if (!response.ok) {
    throw new Error('Network response was not ok');
  }

  return (await response.json()) as Server;
};

export const createServer = async (
  navigate: NavigateFunction,
  queryClient: QueryClient,
  _: FormState,
  formData: FormData,
) => {
  const newState: FormState = {
    fields: {
      ip_address: String(formData.get('ip_address') || ''),
      mac_address: String(formData.get('mac_address') || ''),
      memory_gb: String(formData.get('memory_gb') || ''),
      storage_gb: String(formData.get('storage_gb') || ''),
      nickname: String(formData.get('nickname') || ''),
    },
    errors: {},
  };

  const validatedFields = CreateServerSchema.safeParse({
    ip_address: formData.get('ip_address'),
    mac_address: formData.get('mac_address'),
    memory_gb: Number(formData.get('memory_gb')),
    storage_gb: Number(formData.get('storage_gb')),
    nickname: formData.get('nickname') || undefined,
  });

  if (!validatedFields.success) {
    const errors = z.flattenError(validatedFields.error).fieldErrors;
    const returnObj: FormState = {
      ...newState,
      errors,
      message: 'Hiányzó vagy érvénytelen mezők',
    };
    return returnObj;
  }

  const response = await fetch(`${API_BASE_URL}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(validatedFields.data),
  });

  if (!response.ok) {
    const returnObj: FormState = {
      ...newState,
      message: JSON.parse(await response.text()).message,
    };
    return returnObj;
  }

  queryClient.invalidateQueries({
    queryKey: ['servers'],
  });
  navigate('/');

  return newState;
};

export const updateServer = async (
  id: number,
  navigate: NavigateFunction,
  queryClient: QueryClient,
  _: FormState,
  formData: FormData,
) => {
  const newState: FormState = {
    fields: {
      ip_address: String(formData.get('ip_address') || ''),
      mac_address: String(formData.get('mac_address') || ''),
      memory_gb: String(formData.get('memory_gb') || ''),
      storage_gb: String(formData.get('storage_gb') || ''),
      nickname: String(formData.get('nickname') || ''),
    },
    errors: {},
  };

  const validatedFields = UpdateServerSchema.safeParse({
    ip_address: formData.get('ip_address'),
    mac_address: formData.get('mac_address'),
    memory_gb: Number(formData.get('memory_gb')),
    storage_gb: Number(formData.get('storage_gb')),
    nickname: formData.get('nickname') || undefined,
  });

  if (!validatedFields.success) {
    const errors = z.flattenError(validatedFields.error).fieldErrors;
    const returnObj: FormState = {
      ...newState,
      errors,
      message: 'Érvénytelen mezők',
    };
    return returnObj;
  }

  const response = await fetch(`${API_BASE_URL}/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(validatedFields.data),
  });

  if (response.status === 404) {
    throw new Error('Server not found');
  }

  if (!response.ok) {
    const returnObj: FormState = {
      ...newState,
      message: JSON.parse(await response.text()).message,
    };
    return returnObj;
  }

  queryClient.invalidateQueries({
    queryKey: ['server', id],
  });
  queryClient.invalidateQueries({
    queryKey: ['servers'],
  });
  navigate(`/servers/${id}`);
  return newState;
};

export const deleteServer = async (id: number) => {
  const response = await fetch(`${API_BASE_URL}/${id}`, {
    method: 'DELETE',
  });

  if (response.status === 404) {
    throw new Error('Server not found');
  }

  if (!response.ok) {
    throw new Error('Network response was not ok');
  }

  return true;
};
