import { LocalStorage } from '@/lib/local-storage';

export function useCurrentUser() {
  const userId = LocalStorage.get('userId');
  if (!userId) {
    throw new Error('User not authenticated');
  }
  return { userId };
}
