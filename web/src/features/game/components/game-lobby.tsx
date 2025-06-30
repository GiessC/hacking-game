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
import { useStartGame } from '../api/game-api';

interface GameLobbyProps {
  className?: string;
  code: string;
}

export function GameLobbyCard({ className, code }: GameLobbyProps) {
  const navigate = useNavigate();
  const { mutateAsync: startGameAsync } = useStartGame();

  async function startGame() {
    const game = await startGameAsync(code);
    navigate(`/game/${game.id}`);
  }

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
        <Typography variant='p'>{formatCode(code)}</Typography>
      </CardContent>
      <CardFooter>
        <CardAction className='flex w-full justify-center'>
          <Button onClick={startGame}>Start Game</Button>
        </CardAction>
      </CardFooter>
    </Card>
  );
}

function formatCode(code: string) {
  return code
    .replace(/(.{3})/g, '$1-')
    .trim()
    .slice(0, -1);
}
