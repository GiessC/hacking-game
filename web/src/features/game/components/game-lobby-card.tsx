import Typography from '@/app/components/typography';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { useNavigate } from 'react-router';
import { useCurrentUser } from '@/hooks/use-current-user';
import type { Game } from '../types/game';
import { useStartGame } from '../api/game-api';
import { Separator } from '@/components/ui/separator';
import { AsyncPlayerList } from './async-player-list';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';

interface GameLobbyProps {
  className?: string;
  game: Game;
}

export function GameLobbyCard({ className, game }: GameLobbyProps) {
  const navigate = useNavigate();
  const { mutateAsync: startGameAsync } = useStartGame();
  const { userId } = useCurrentUser();

  async function startGame() {
    try {
      const startedGame = await startGameAsync(game.id);
      navigate(`/game/${startedGame.id}`);
    } catch (error) {
      console.error('Error starting game:', error);
      // Handle error appropriately, e.g., show a notification or alert
      // For now, we just log it to the console
      alert('Failed to start the game. Please try again later.');
    }
  }

  const notEnoughPlayers =
    !game.playersInLobby?.length ||
    game.playersInLobby.length < game.numberOfTeams;

  return (
    <Card className={cn('p-8 !gap-2 text-center', className)}>
      <CardHeader>
        <CardTitle>
          <Typography variant='h2'>Game Lobby</Typography>
        </CardTitle>
      </CardHeader>
      <CardDescription>
        <Typography
          variant='p'
          className='text-lg mb-4 max-w-96'
        >
          Join the game using the code below. Once everyone is ready, you can
          start the game.
        </Typography>
      </CardDescription>
      <CardContent>
        <Typography
          variant='h3'
          className='text-2xl font-bold mb-4'
        >
          Join Code: {formatCode(game.joinCode)}
        </Typography>
        <Separator />
        <AsyncPlayerList gameId={game.id} />
      </CardContent>
      <CardFooter>
        {game.ownerId === userId && (
          <CardAction className='flex w-full justify-center'>
            <Tooltip disableHoverableContent={!notEnoughPlayers}>
              <TooltipTrigger asChild>
                <span>
                  <Button
                    onClick={startGame}
                    disabled={notEnoughPlayers}
                  >
                    Start Game
                  </Button>
                </span>
              </TooltipTrigger>
              <TooltipContent side='bottom'>
                At least {game.numberOfTeams} players are required to start the
                game.
              </TooltipContent>
            </Tooltip>
          </CardAction>
        )}
      </CardFooter>
    </Card>
  );
}

function formatCode(code: string) {
  return code
    .toUpperCase()
    .replace(/(.{3})/g, '$1-')
    .trim()
    .slice(0, -1);
}
