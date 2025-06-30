import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { InitializeLobbyForm } from './initialize-lobby-form';

export function InitializeLobbyCard({ className }: { className?: string }) {
  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>Create Lobby</CardTitle>
        <CardDescription>
          Create a new lobby to start playing with friends.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <InitializeLobbyForm />
      </CardContent>
    </Card>
  );
}
