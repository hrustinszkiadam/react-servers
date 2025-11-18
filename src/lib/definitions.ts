import { z } from 'zod';

export type Server = {
  id: number;
  ip_address: string;
  mac_address: string;
  memory_gb: number;
  storage_gb: number;
  nickname: string | null;
};

export const CreateServerSchema = z.object({
  ip_address: z.ipv4().or(z.ipv6()),
  mac_address: z.string().regex(/^([0-9A-Fa-f]{2}[:-]){5}([0-9A-Fa-f]{2})$/, {
    error: 'Invalid MAC address format',
  }),
  memory_gb: z.number().int().positive(),
  storage_gb: z.number().int().positive(),
  nickname: z
    .string()
    .max(30)
    .regex(/^[a-zA-Z0-9]+$/, {
      error: 'Nickname can only contain alphanumeric characters',
    })
    .optional(),
});

export const UpdateServerSchema = CreateServerSchema.partial();

type ServerInput = z.infer<typeof CreateServerSchema>;
export type FormState = {
  message?: string;
  fields: {
    [key in keyof ServerInput]?: string;
  };
  errors?: {
    [key in keyof ServerInput]?: string[];
  };
};
