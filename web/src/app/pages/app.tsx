import { StartGameCard } from '@/features/game/components/start-game-card';

export function App() {
  return (
    <div className='flex-grow flex items-center justify-center'>
      <StartGameCard className='mx-2 flex-grow sm:max-w-3/4 md:max-w-2/5' />
    </div>
  );
}
