import { useGame } from '@/features/game/api/game-api';
import { GameLobbyCard } from '@/features/game/components/game-lobby-card';
import { useParams } from 'react-router';

export function GameLobbyPage() {
  const { gameId } = useParams<{ gameId: string }>();
  const { data: game, isLoading, error } = useGame(gameId!);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading game</div>;
  }

  if (!game) {
    return <div>Game not found</div>;
  }

  return (
    <div className='flex flex-col items-center justify-center w-full p-4'>
      <GameLobbyCard game={game} />
    </div>
  );
}
