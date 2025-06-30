import { Form } from '@/app/components/form';
import { Button } from '@/components/ui/button';
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useFieldArray, type UseFormReturn } from 'react-hook-form';
import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Trash } from 'lucide-react';
import { TeamPlayersDialogTrigger } from './team-players-dialog';
import { useNavigate } from 'react-router';
import {
  startGameSchema,
  useStartGame,
  type StartGameRequest,
} from '../api/game-api';

export function StartGameForm() {
  const { mutateAsync: startGameAsync } = useStartGame();
  const navigate = useNavigate();

  async function handleSubmit(data: StartGameRequest) {
    const game = await startGameAsync(data);
    console.log('Game started:', game);
    navigate(`/game/${game.id}`);
  }

  return (
    <Form<typeof startGameSchema, StartGameRequest, unknown, StartGameRequest>
      schema={startGameSchema}
      defaultValues={{
        teams: new Array(2).fill({ name: '', players: [] }),
      }}
      onSubmit={handleSubmit}
    >
      {(form) => <StartGameFormFields {...form} />}
    </Form>
  );
}

function StartGameFormFields({ control }: UseFormReturn<StartGameRequest>) {
  const { fields: teams, remove: removeTeam } = useFieldArray({
    name: 'teams',
    control,
  });

  return (
    <div className='flex flex-col gap-4'>
      <div className={'gap-4 grid md:grid-cols-2'}>
        {teams.map((field, teamIndex) => (
          <Card key={`team-${field.id}`}>
            <CardHeader className='flex items-center justify-between'>
              <CardTitle>Team {teamIndex + 1}</CardTitle>
              <CardAction>
                <Button
                  variant='outline'
                  size='icon'
                  className='cursor-pointer border-red-600 hover:border-red-500'
                  onClick={() => removeTeam(teamIndex)}
                >
                  <Trash className='text-red-500' />
                </Button>
              </CardAction>
            </CardHeader>
            <CardContent className='grid gap-4'>
              <FormField
                control={control}
                name={`teams.${teamIndex}.name`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Team Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder='Ex. LeBron is the 🐐'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={control}
                name={`teams.${teamIndex}.players`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Players</FormLabel>
                    <FormControl>
                      <TeamPlayersDialogTrigger
                        teamIndex={teamIndex}
                        players={field.value}
                        onChange={(players) => {
                          field.onChange(players);
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>
        ))}
      </div>
      <Button type='submit'>Create Lobby</Button>
    </div>
  );
}
