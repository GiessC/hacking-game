import { z } from 'zod';
import { playerSchema } from './player';

export const teamSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(1, 'Team name is required'),
  players: z.array(playerSchema),
});
