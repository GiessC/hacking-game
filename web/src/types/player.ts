import z from 'zod';

export const playerSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(1, 'Player name is required.'),
});

export type Player = z.infer<typeof playerSchema>;
