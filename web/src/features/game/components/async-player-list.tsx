import { useGame } from '../api/game-api';
import { PlayerList } from './player-list';

export function AsyncPlayerList({ gameId }: { gameId: string }) {
  const { data: game, isLoading, error } = useGame(gameId);

  if (isLoading) {
    return <div>Loading players...</div>;
  }

  if (error) {
    return <div>Error loading players: {error.message}</div>;
  }

  return <PlayerList players={game?.playersInLobby ?? []} />;
}
