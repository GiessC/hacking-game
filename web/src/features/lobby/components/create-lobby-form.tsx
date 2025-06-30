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
  createLobbySchema,
  useCreateLobby,
  type CreateLobbyRequest,
} from '../api/lobby-api';
import { Loader2 } from 'lucide-react';

export function CreateLobbyForm() {
  const { mutateAsync: createLobbyAsync, isPending } = useCreateLobby();

  async function handleSubmit(data: CreateLobbyRequest) {
    try {
      await createLobbyAsync(data);
    } catch (error) {
      console.error('Error creating lobby:', error);
    }
  }

  return (
    <Form
      schema={createLobbySchema}
      defaultValues={{
        numberOfTeams: 2,
      }}
      onSubmit={handleSubmit}
    >
      {({ control }) => (
        <div className={'flex flex-col gap-4'}>
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
          {isPending ? (
            <LoadingButton />
          ) : (
            <Button type='submit'>Create Lobby</Button>
          )}
        </div>
      )}
    </Form>
  );
}

export function LoadingButton() {
  return (
    <Button disabled>
      <Loader2 className='animate-spin' />
      Please wait
    </Button>
  );
}
