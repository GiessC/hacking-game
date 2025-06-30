import z from 'zod';

export const lobbyPlayerSchema = z.object({
  name: z.string().min(1, 'Player name is required.'),
});

export type LobbyPlayer = z.infer<typeof lobbyPlayerSchema>;

export const lobbyTeamSchema = z
  .object({
    name: z.string().min(1, 'Team name is required.'),
    players: z
      .array(lobbyPlayerSchema)
      .min(1, 'At least one player is required.'),
  })
  .superRefine((team, context) => {
    const duplicatePlayerNames = findDuplicatePlayerNames(team.players);
    if (duplicatePlayerNames.length > 0) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Player names must be unique within a team.',
        path: duplicatePlayerNames.flatMap((index) => [
          'players',
          index,
          'name',
        ]),
      });
    }
  });

export type LobbyTeam = z.infer<typeof lobbyTeamSchema>;

export const lobbySchema = z
  .object({
    id: z.string().uuid(),
    teams: z.array(lobbyTeamSchema).min(2, 'At least two teams are required.'),
  })
  .superRefine((lobby, context) => {
    const duplicateTeamNames = findDuplicateTeamNames(lobby.teams);
    if (duplicateTeamNames.length > 0) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Team names must be unique.',
        path: duplicateTeamNames.flatMap((index) => ['teams', index, 'name']),
      });
      return false;
    }
  });

export type Lobby = z.infer<typeof lobbySchema>;

function findDuplicateTeamNames(teams: LobbyTeam[]): number[] {
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

function findDuplicatePlayerNames(players: LobbyPlayer[]): number[] {
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
