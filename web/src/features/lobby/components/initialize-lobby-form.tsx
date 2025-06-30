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
import { Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router';
import { z } from 'zod';

const initializeLobbySchema = z.object({
  numberOfTeams: z.number().min(2, 'At least two teams are required.'),
});

type InitializeLobbyFormValues = z.infer<typeof initializeLobbySchema>;

export function InitializeLobbyForm() {
  const navigate = useNavigate();

  async function handleSubmit(data: InitializeLobbyFormValues) {
    try {
      navigate({
        pathname: '/lobby/new',
        search: `?teams=${data.numberOfTeams}`,
      });
    } catch (error) {
      console.error('Error creating lobby:', error);
    }
  }

  return (
    <Form
      schema={initializeLobbySchema}
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
          <Button type='submit'>Create Lobby</Button>
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
