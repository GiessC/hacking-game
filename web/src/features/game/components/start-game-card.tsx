import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { StartGameForm } from './start-game-form';

export function StartGameCard({ className }: { className?: string }) {
  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>Start Game</CardTitle>
        <CardDescription>
          Create a new game lobby by specifying the number of teams. A code will
          be generated for the lobby, which can be shared with other players to
          join the game.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <StartGameForm />
      </CardContent>
    </Card>
  );
}
