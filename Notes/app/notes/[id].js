import { View, Text, TextInput } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import Header from '../components/Header';
import styles from '../styles/notesStyles'
import useAutosave from '../hooks/useAutosave'
export default function Notes() {
  const { id } = useLocalSearchParams();
  const {handleNoteChange, note, loading, error, contextError, contextLoading} = useAutosave(id)

  if (loading || contextLoading) {
    return (
      <View style={styles.view}>
        <Header />
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }
  
  if (error || contextError) {
    return (
      <View style={styles.view}>
        <Header />
        <Text style={styles.errorText}>{error || contextError}</Text>
      </View>
    );handleTitleChange
  }
  
  return (
    <View style={styles.view}>
      <Header />
      <TextInput 
        placeholder='Title...' 
        style={styles.title} 
        placeholderTextColor="#6C6C7E" 
        value={note.title || ''} 
        onChangeText={(text) => handleNoteChange(text, 'title')}
      />
      <TextInput
        style={styles.notes}
        multiline={true}
        placeholder='Write your note here...'
        placeholderTextColor="#6C6C7E"
        value={note.content || ''}
        onChangeText={(text) => handleNoteChange(text, 'content')}
      />
    </View>
  );
}