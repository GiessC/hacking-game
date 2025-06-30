import { z } from 'zod';

export const createLobbySchema = z.object({
  numberOfTeams: z.number().min(2, 'At least 2 teams are required'),
  ownerName: z.string().min(1, 'Owner name is required'),
});

export const startGameSchema = z.object({
  id: z.string().uuid(),
});

export const joinGameSchema = z.object({
  code: z.string().min(1, 'Join code is required'),
});

export const gameSchema = z.object({
  id: z.string().uuid(),
  joinCode: z.string().min(1, 'Join code is required'),
  started: z.boolean(),
  teams: z
    .array(
      z.object({
        id: z.string().uuid(),
        name: z.string().min(1, 'Team name is required'),
      })
    )
    .min(2, 'At least 2 teams are required'),
});
