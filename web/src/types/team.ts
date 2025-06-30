import z from 'zod';
import { playerSchema, type Player } from './player';

export const teamBaseSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(1, 'Team name is required.'),
  players: z.array(playerSchema).min(1, 'At least one player is required.'),
});

export const teamSchema = teamBaseSchema.superRefine(superRefineLobbyTeam);

export function superRefineLobbyTeam(
  team: z.infer<typeof teamBaseSchema>,
  context: z.RefinementCtx
) {
  const duplicatePlayerNames = findDuplicatePlayerNames(team.players);
  if (duplicatePlayerNames.length > 0) {
    context.addIssue({
      code: z.ZodIssueCode.custom,
      message: 'Player names must be unique within a team.',
      path: duplicatePlayerNames.flatMap((index) => ['players', index, 'name']),
    });
  }
}

export type Team = z.infer<typeof teamSchema>;

function findDuplicatePlayerNames(players: Player[]): number[] {
  const indexMap: { [playerName: string]: number[] } = {};
  for (let i = 0; i < players.length; i++) {
    const playerName = players[i].name;
    if (!indexMap[playerName]) {
      indexMap[playerName] = [];
    }
    indexMap[playerName].push(i);
  }
  return Object.values(indexMap)
    .filter((indexes) => indexes.length > 1)
    .flat();
}
