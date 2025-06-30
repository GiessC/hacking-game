import { Form } from '@/app/components/form';
import { Button } from '@/components/ui/button';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  startGameSchema,
  useNewGame,
  type StartGameRequest,
} from '../api/game-api';
import Typography from '@/app/components/typography';
import { useNavigate } from 'react-router';

export function StartGameForm() {
  const { mutateAsync: createGameAsync, data } = useNewGame();
  const navigate = useNavigate();

  async function handleSubmit(data: StartGameRequest) {
    try {
      const game = await createGameAsync(data);
      navigate(`/game/${game.id}/lobby`);
    } catch (error) {
      console.error('Error creating lobby:', error);
    }
  }

  return (
    <Form
      schema={startGameSchema}
      defaultValues={{
        ownerName: '',
        numberOfTeams: 2,
      }}
      onSubmit={handleSubmit}
    >
      {({ control }) => (
        <div className={'flex flex-col gap-4'}>
          <FormField
            control={control}
            name='ownerName'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Player Name</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name='numberOfTeams'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Number of Teams</FormLabel>
                <FormControl>
                  <Input
                    inputMode='numeric'
                    {...field}
                    onChange={(event) => {
                      const value = event.target.value;
                      if (isNaN(Number(value))) {
                        return;
                      }
                      const numberValue = Number(value);
                      field.onChange(numberValue);
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {data ? (
            <div className='flex flex-row items-center gap-2'>
              <Typography variant='h3'>
                Invite code: {formatCode(data.joinCode)}
              </Typography>
            </div>
          ) : (
            <>
              <Button type='submit'>Create Lobby</Button>
              <Button
                type='button'
                variant='outline'
                onClick={() => navigate('/game/join')}
              >
                Join Game
              </Button>
            </>
          )}
        </div>
      )}
    </Form>
  );
}

function formatCode(code: string) {
  return code
    .replace(/(.{3})/g, '$1-')
    .trim()
    .slice(0, -1);
}
