import { useQuery } from '@tanstack/react-query';
import { useMutation } from '@tanstack/react-query';
import z from 'zod';
import { v4 as uuidv4 } from 'uuid';
import { gameBaseSchema, superRefineGame, type Game } from '../types/game';

export function useGame(gameId: string) {
  return useQuery({
    queryKey: ['game', gameId],
    queryFn: async (): Promise<Game> => {
      return new Promise((resolve) => {
        setTimeout(() => {
          const game: Game = {
            id: gameId,
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

export const startGameSchema = gameBaseSchema
  .omit({
    id: true,
  })
  .superRefine(superRefineGame);

export type StartGameRequest = z.infer<typeof startGameSchema>;

export function useStartGame() {
  return useMutation({
    mutationKey: ['create-lobby'],
    mutationFn: async (data: StartGameRequest): Promise<Game> => {
      return new Promise((resolve) => {
        setTimeout(() => {
          const lobby: Game = {
            id: uuidv4(),
            teams: data.teams.map((team) => ({
              ...team,
              players: team.players.map((player) => ({
                ...player,
                id: uuidv4(),
              })),
            })),
          };
          console.log('Lobby created with data:', lobby);
          resolve(lobby);
        }, 1000);
      });
    },
  });
}
