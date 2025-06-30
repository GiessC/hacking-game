import { useGame } from '@/features/game/api/game-api';
import { useParams } from 'react-router';

export function GamePage() {
  const { gameId } = useParams<{ gameId: string }>();
  const { data: game, error, isLoading } = useGame(gameId!);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading game: {error.message}</div>;
  }

  return (
    <div className='flex-grow flex flex-col p-4'>
      <h1 className='text-2xl font-bold'>Game Page</h1>
      <pre>{JSON.stringify(game, null, 2)}</pre>
    </div>
  );
}
