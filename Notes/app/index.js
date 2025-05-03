import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { Link } from 'expo-router';
import useNotes from './contexts/NotesContext';
import Header from './components/Header';
import styles from './styles/homeStyles'

export default function Home() {
  const { notes, loading, error, newNote } = useNotes();
  
  const renderNoteItem = ({ item }) => (
    <Link href={`/notes/${item.id}`} asChild>
      <TouchableOpacity style={styles.noteItem}>
        <Text style={styles.noteTitle}>{item.title || 'Untitled Note'}</Text>
        <Text style={styles.noteContent} numberOfLines={2}>
          {item.content?.substring(0, 150) || 'No content'}
        </Text>
        <Text style={styles.noteDate}>
          {new Date(item.updated_at).toLocaleString()}
        </Text>
      </TouchableOpacity>
    </Link>
  );

  const renderEmptyList = () => (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyText}>No notes yet. Create your first note!</Text>
    </View>
  );

  if (loading) {
    return (
      <View style={styles.view}>
        <Header />
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>Loading...</Text>
        </View>
      </View>
    );
  }
  
  if (error) {
    return (
      <View style={styles.view}>
        <Header />
        <View style={styles.emptyContainer}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.view}>
      <Header />
      <FlatList
        data={notes}
        renderItem={renderNoteItem}
        keyExtractor={item => item.id}
        ListEmptyComponent={renderEmptyList}
        contentContainerStyle={{ flexGrow: 1, paddingVertical: 8 }}
      />
      <Link href={`/notes/${newNote().id}`} asChild>
        <TouchableOpacity style={styles.newNoteButton}>
          <Text style={styles.newNoteText}>+ New Note</Text>
        </TouchableOpacity>
      </Link>
    </View>
  );
}