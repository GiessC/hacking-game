import { GameLobbyCard } from '@/features/game/components/game-lobby';
import { useParams } from 'react-router';

export function GameLobbyPage() {
  const { code } = useParams<{ code: string }>();

  return (
    <div className='flex flex-col items-center justify-center w-full p-4'>
      <GameLobbyCard code={code!} />
    </div>
  );
}
