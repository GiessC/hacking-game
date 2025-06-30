import { CreateLobbyCard } from '@/features/lobby/components/create-lobby-card';

export function App() {
  return (
    <div className='flex-grow flex items-center justify-center'>
      <CreateLobbyCard className='mx-2 flex-grow sm:max-w-3/4 md:max-w-2/5' />
    </div>
  );
}
