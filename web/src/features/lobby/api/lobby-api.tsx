import { useMutation } from '@tanstack/react-query';
import z from 'zod';
import type { Lobby } from '../types/lobby';
import { v4 as uuidv4 } from 'uuid';

export const createLobbySchema = z.object({
  numberOfTeams: z.number().min(2, 'At least two teams are required.'),
});

export type CreateLobbyRequest = z.infer<typeof createLobbySchema>;

export function useCreateLobby() {
  return useMutation({
    mutationKey: ['create-lobby'],
    mutationFn: async (data: CreateLobbyRequest): Promise<Lobby> => {
      return new Promise((resolve) => {
        setTimeout(() => {
          const lobby: Lobby = {
            id: uuidv4(),
            teams: Array.from({ length: data.numberOfTeams }, (_, i) => ({
              id: uuidv4(),
              name: `Team ${i + 1}`,
              players: [],
            })),
          };
          console.log('Lobby created with data:', lobby);
          resolve(lobby);
        }, 1000);
      });
    },
  });
}
