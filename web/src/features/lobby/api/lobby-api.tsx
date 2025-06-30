import { useMutation } from '@tanstack/react-query';
import z from 'zod';

export const createLobbySchema = z.object({
  numberOfTeams: z.number().min(2, 'At least two teams are required.'),
});

export type CreateLobbyRequest = z.infer<typeof createLobbySchema>;

export function useCreateLobby() {
  return useMutation({
    mutationKey: ['create-lobby'],
    mutationFn: async (data: CreateLobbyRequest) => {
      return new Promise((resolve) => {
        setTimeout(() => {
          console.log('Lobby created with data:', data);
          resolve(data);
        }, 1000);
      });
    },
  });
}
