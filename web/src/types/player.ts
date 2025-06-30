import z from 'zod';

export const playerSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(1, 'Player name is required.'),
  team: z
    .object({
      id: z.string().uuid(),
      name: z.string().min(1, 'Team name is required.'),
    })
    .optional(),
});

export type Player = z.infer<typeof playerSchema>;
