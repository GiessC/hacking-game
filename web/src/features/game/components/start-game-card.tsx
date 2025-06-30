import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/components/ui/card';
import { StartGameForm } from './start-game-form';
import { cn } from '@/lib/utils';

export function StartGameCard({ className }: { className?: string }) {
  return (
    <Card className={cn('w-full', className)}>
      <CardHeader>
        <CardTitle>Create Lobby</CardTitle>
        <CardDescription>
          Create a new lobby to start playing with friends.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <StartGameForm />
      </CardContent>
    </Card>
  );
}
