import { useQuery, type UseQueryOptions } from '@tanstack/react-query';
import { useMutation } from '@tanstack/react-query';
import z from 'zod';
import { type Game } from '../types/game';
import { http } from '@/lib/http';
import { LocalStorage } from '@/lib/local-storage';

export function useGame(gameId: string, options?: UseQueryOptions<Game>) {
  return useQuery({
    ...options,
    queryKey: ['game', gameId],
    queryFn: async (): Promise<Game> => {
      return await http.get<Game>(apiUrl(`/api/v1/game/${gameId}`));
    },
    refetchInterval: 10_000,
  });
}

export const startGameSchema = z.object({
  ownerName: z.string().min(1, 'Owner name is required.'),
  numberOfTeams: z.number().min(2, 'At least 2 teams are required.'),
});

export type StartGameRequest = z.infer<typeof startGameSchema>;

export function useStartGame() {
  return useMutation({
    mutationKey: ['create-lobby'],
    mutationFn: async (gameId: string): Promise<Game> => {
      return await http.post<Game>(apiUrl(`/api/v1/game/${gameId}/start`));
    },
  });
}

export function useNewGame() {
  return useMutation({
    mutationKey: ['new-game'],
    mutationFn: async (request: StartGameRequest): Promise<Game> => {
      const game = await http.post<Game, StartGameRequest>(
        apiUrl('/api/v1/game'),
        request
      );
      LocalStorage.set('userId', game.ownerId);
      return game;
    },
  });
}

export const joinGameSchema = z.object({
  name: z.string().min(1, 'Name is required.'),
  code: z.string().min(1, 'Join code is required.'),
});

export function useJoinGame() {
  return useMutation({
    mutationKey: ['join-game'],
    mutationFn: async ({
      name,
      code,
    }: z.output<typeof joinGameSchema>): Promise<Game> => {
      const { game, userId } = await http.post<
        { game: Game; userId: string },
        z.output<typeof joinGameSchema>
      >(apiUrl(`/api/v1/game/${code}/join`), { name, code });
      LocalStorage.set('userId', userId);
      return game;
    },
  });
}

function apiUrl(path: string): string {
  const baseUrl = import.meta.env.VITE_API_URL ?? 'http://localhost:3000';
  return `${baseUrl}${path}`;
}
