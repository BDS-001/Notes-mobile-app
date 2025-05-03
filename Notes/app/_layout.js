import { Stack } from 'expo-router';
import { NotesProvider } from './contexts/NotesContext';

export default function Layout() {
  return (
    <NotesProvider>
      <Stack
        screenOptions={{
          headerShown: false
        }}
      />
    </NotesProvider>
  );
}