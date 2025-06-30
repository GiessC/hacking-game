import { playerSchema } from '@/types/player';
import { teamSchema, type Team } from '@/types/team';
import z from 'zod';

export const gameBaseSchema = z.object({
  id: z.string().uuid(),
  joinCode: z.string(),
  teams: z.array(teamSchema),
  ownerId: z.string().uuid(),
  playersInLobby: z.array(playerSchema).optional(),
  started: z.boolean().default(false),
});

export const gameSchema = gameBaseSchema.superRefine(superRefineGame);

export function superRefineGame(
  game: { teams: Team[] },
  context: z.RefinementCtx
) {
  const duplicateTeamNames = findDuplicateTeamNames(game.teams);
  if (duplicateTeamNames.length > 0) {
    context.addIssue({
      code: z.ZodIssueCode.custom,
      message: 'Team names must be unique.',
      path: duplicateTeamNames.flatMap((index) => ['teams', index, 'name']),
    });
    return false;
  }
}

export type Game = z.infer<typeof gameSchema>;

function findDuplicateTeamNames(teams: Team[]): number[] {
  const indexMap: { [teamName: string]: number[] } = {};
  for (let i = 0; i < teams.length; i++) {
    const teamName = teams[i].name;
    if (!indexMap[teamName]) {
      indexMap[teamName] = [];
    }
    indexMap[teamName].push(i);
  }
  return Object.values(indexMap)
    .filter((indexes) => indexes.length > 1)
    .flat();
}
