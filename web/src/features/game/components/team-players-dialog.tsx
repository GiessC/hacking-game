import { useFieldArray, type UseFormReturn } from 'react-hook-form';
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form } from '@/app/components/form';
import type { z } from 'zod';
import { Plus, Trash } from 'lucide-react';
import { useMobile } from '@/hooks/use-mobile';
import { playerSchema, type Player } from '@/types/player';
import { teamBaseSchema } from '@/types/team';

const teamPlayersSchema = teamBaseSchema
  .omit({
    id: true,
  })
  .extend({
    players: playerSchema
      .omit({ id: true })
      .array()
      .min(1, 'At least one player is required.'),
  });

export function TeamPlayersDialogTrigger({
  teamIndex,
  players,
  onChange,
}: {
  teamIndex: number;
  players?: Omit<Player, 'id'>[];
  onChange: (players: Omit<Player, 'id'>[]) => void;
}) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Edit Players</Button>
      </DialogTrigger>
      <DialogContent>
        <Form
          schema={teamPlayersSchema}
          defaultValues={{ name: '', players: players ?? [] }}
          onSubmit={(data) => {
            console.log(data);
            onChange(data.players);
          }}
        >
          {(form) => (
            <TeamPlayersDialogForm
              teamIndex={teamIndex}
              {...form}
            />
          )}
        </Form>
      </DialogContent>
    </Dialog>
  );
}

function TeamPlayersDialogForm({
  teamIndex,
  control,
  formState,
}: UseFormReturn<z.infer<typeof teamPlayersSchema>> & {
  teamIndex: number;
}) {
  const {
    fields: players,
    append,
    remove,
  } = useFieldArray({
    name: 'players',
    control,
  });

  return (
    <>
      <DialogHeader className='flex flex-row items-center'>
        <DialogTitle>Edit Players for Team {teamIndex + 1}</DialogTitle>
        <Button
          type='button'
          variant='outline'
          size='icon'
          onClick={() => {
            append({ name: '' });
          }}
        >
          <Plus />
        </Button>
      </DialogHeader>
      <div className='flex flex-col my-4 gap-4'>
        {players.map((field, index) => (
          <PlayerFields
            key={field.id}
            playerId={field.id}
            index={index}
            control={control}
            remove={remove}
          />
        ))}
      </div>
      <DialogClose asChild>
        <Button
          type='submit'
          variant='outline'
          disabled={!formState.isValid}
        >
          Save
        </Button>
      </DialogClose>
    </>
  );
}

function PlayerFields({
  playerId,
  index,
  control,
  remove,
}: {
  playerId: string;
  index: number;
  control: UseFormReturn<z.infer<typeof teamPlayersSchema>>['control'];
  remove: (index: number) => void;
}) {
  const isMobile = useMobile();

  return (
    <FormField
      key={playerId}
      control={control}
      name={`players.${index}.name`}
      render={({ field }) => (
        <FormItem>
          <FormLabel>Player {index + 1}</FormLabel>
          {!isMobile && (
            <div className='flex flex-row gap-2'>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <Button
                variant='destructive'
                onClick={() => {
                  remove(index);
                }}
              >
                <Trash />
              </Button>
            </div>
          )}
          <FormDescription>
            Enter the name of player {index + 1}.
          </FormDescription>
          <FormMessage />
          {isMobile && (
            <Button
              variant='destructive'
              onClick={() => {
                remove(index);
              }}
              className='mt-2'
            >
              <Trash />
            </Button>
          )}
        </FormItem>
      )}
    />
  );
}
