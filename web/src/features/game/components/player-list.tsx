import { Badge } from '@/components/ui/badge';
import type { Player } from '@/types/player';

export function PlayerList({ players }: { players: Player[] }) {
  return (
    <div>
      {players.map((player) => (
        <div
          key={player.id}
          className='flex items-center justify-between p-2 border-b border-gray-200'
        >
          {player.name}
          <Badge
            className='text-muted-foreground'
            variant='outline'
          >
            {player.team?.name || 'No Team'}
          </Badge>
        </div>
      ))}
    </div>
  );
}
