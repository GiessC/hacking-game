import { useQuery } from '@tanstack/react-query';
import { useMutation } from '@tanstack/react-query';
import z from 'zod';
import { v4 as uuidv4 } from 'uuid';
import { type Game } from '../types/game';

export function useGame(gameId: string) {
  return useQuery({
    queryKey: ['game', gameId],
    queryFn: async (): Promise<Game> => {
      return new Promise((resolve) => {
        setTimeout(() => {
          const game: Game = {
            id: gameId,
            code: '123456',
            teams: [
              {
                id: uuidv4(),
                name: 'Team A',
                players: [
                  {
                    id: uuidv4(),
                    name: 'Player 1',
                  },
                  {
                    id: uuidv4(),
                    name: 'Player 2',
                  },
                ],
              },
              {
                id: uuidv4(),
                name: 'Team B',
                players: [
                  { id: uuidv4(), name: 'Player 3' },
                  { id: uuidv4(), name: 'Player 4' },
                ],
              },
            ],
          };
          console.log('Game fetched with data:', game);
          resolve(game);
        }, 1000);
      });
    },
  });
}

export const startGameSchema = z.object({
  numberOfTeams: z.number().min(2, 'At least 2 teams are required.'),
});

export type StartGameRequest = z.infer<typeof startGameSchema>;

export function useStartGame() {
  return useMutation({
    mutationKey: ['create-lobby'],
    mutationFn: async (gameCode: string): Promise<Game> => {
      return new Promise((resolve) => {
        setTimeout(() => {
          const game: Game = {
            id: uuidv4(),
            code: gameCode,
            teams: [
              {
                id: uuidv4(),
                name: 'Team 1',
                players: [
                  { id: uuidv4(), name: 'Player 1' },
                  { id: uuidv4(), name: 'Player 2' },
                ],
              },
              {
                id: uuidv4(),
                name: 'Team 2',
                players: [
                  { id: uuidv4(), name: 'Player 3' },
                  { id: uuidv4(), name: 'Player 4' },
                ],
              },
            ],
          };
          console.log('Game created with data:', game);
          resolve(game);
        }, 1000);
      });
    },
  });
}

export function useNewGame() {
  return useMutation({
    mutationKey: ['new-game'],
    mutationFn: async (request: StartGameRequest): Promise<Game> => {
      return new Promise((resolve) => {
        setTimeout(() => {
          const game: Game = {
            id: uuidv4(),
            code: '123456',
            teams: Array.from(
              { length: request.numberOfTeams },
              (_, index) => ({
                id: uuidv4(),
                name: `Team ${index + 1}`,
                players: [],
              })
            ),
          };
          resolve(game);
        }, 1000);
      });
    },
  });
}
