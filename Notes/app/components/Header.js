import { View, Text, TouchableOpacity } from 'react-native';
import { usePathname, Link } from 'expo-router';
import styles from '../styles/headerStyles'
import { useLocalSearchParams } from 'expo-router';
import useNotes from '../contexts/NotesContext';
import { useRouter } from 'expo-router';

export default function Header() {
  const pathname = usePathname();
  const isNotesPage = pathname.includes('/notes/');
  const param = useLocalSearchParams();
  const noteId = param.id
  const {deleteNote} = useNotes()
  const router = useRouter();

  const handleDelete = () => {
    deleteNote(noteId)
    router.replace('/')
  }
  return (
    <View style={styles.header}>
      <Text style={styles.title}>Notes</Text>
      
      <View style={styles.headerContent}>
        {isNotesPage ? (
          <Link href="/" style={styles.backLink}>
            <Text style={styles.backText}>← Back</Text>
          </Link>
        ) : (
          <View style={styles.placeholder} />
        )}
        
        {isNotesPage && noteId ? (
          <TouchableOpacity onPress={handleDelete} style={styles.deleteButton}>
            <Text style={styles.deleteText}>Delete</Text>
          </TouchableOpacity>
        ) : (
          <View style={styles.placeholder} />
        )}
      </View>
    </View>
  );
}