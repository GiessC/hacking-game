import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { JoinGameForm } from './join-game-form';

export function JoinGameCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Join Game</CardTitle>
        <CardDescription>
          Enter the join code provided by the game host to join an existing
          game.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <JoinGameForm />
      </CardContent>
    </Card>
  );
}
