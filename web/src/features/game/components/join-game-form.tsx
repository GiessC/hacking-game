import { Form } from '@/app/components/form';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from '@/components/ui/input-otp';
import { useNavigate } from 'react-router';
import { z } from 'zod';
import { joinGameSchema, useJoinGame } from '../api/game-api';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export function JoinGameForm() {
  const { mutateAsync: joinGameAsync } = useJoinGame();
  const navigate = useNavigate();

  async function joinGame(data: z.infer<typeof joinGameSchema>) {
    const game = await joinGameAsync(data);
    navigate(`/game/${game.id}/lobby`);
  }

  return (
    <Form
      schema={joinGameSchema}
      onSubmit={joinGame}
    >
      {({ control }) => (
        <div className='flex flex-col gap-4'>
          <FormField
            name='name'
            control={control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder='Enter your name'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name='code'
            control={control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Join Code</FormLabel>
                <FormControl>
                  <InputOTP
                    maxLength={6}
                    {...field}
                  >
                    <InputOTPGroup>
                      <InputOTPSlot index={0} />
                      <InputOTPSlot index={1} />
                      <InputOTPSlot index={2} />
                    </InputOTPGroup>
                    <InputOTPSeparator />
                    <InputOTPGroup>
                      <InputOTPSlot index={3} />
                      <InputOTPSlot index={4} />
                      <InputOTPSlot index={5} />
                    </InputOTPGroup>
                  </InputOTP>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type='submit'>Join Game</Button>
        </div>
      )}
    </Form>
  );
}
