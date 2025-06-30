import { z } from 'zod';

export const playerSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
});
