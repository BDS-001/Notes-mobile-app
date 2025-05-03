import { View, Text, StyleSheet, TextInput } from 'react-native';
import { useState, useEffect } from 'react';
import { useLocalSearchParams } from 'expo-router';
import useNotes from '../contexts/NotesContext';
import Header from '../components/Header';

const styles = StyleSheet.create({
    notes: {
        padding: 20,
        flex: 1,
        outlineStyle: 'none',
    },
    title: {
        fontSize: 40,
        margin: 20,
        borderBottomColor: '#999999',
        borderBottomWidth: 5,
        outlineStyle: 'none',
    },
    view: {
        flex: 1
    },
    loadingText: {
        padding: 20,
        fontSize: 16,
        textAlign: 'center',
    },
    errorText: {
        padding: 20,
        fontSize: 16,
        color: '#FF3B30',
        textAlign: 'center',
    }
})

export default function Notes() {
  const { id } = useLocalSearchParams();
  const { getNoteById, saveNote, loading: contextLoading, error: contextError } = useNotes();
  const [note, setNote] = useState({ title: '', content: '' });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const noteData = getNoteById(id);
    if (noteData) {
      setNote(noteData);
    }
    setLoading(false);
  }, [id, getNoteById]);

  const handleTitleChange = (text) => {
    setNote(prev => {
      const updated = { ...prev, title: text };
      saveNote(id, updated.title, updated.content)
        .catch(err => {
          console.error('Error saving title:', err);
        });
      return updated;
    });
  };

  const handleContentChange = (text) => {
    setNote(prev => {
      const updated = { ...prev, content: text };
      saveNote(id, updated.title, updated.content)
        .catch(err => {
          console.error('Error saving content:', err);
        });
      return updated;
    });
  };
  
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
    );
  }
  
  return (
    <View style={styles.view}>
      <Header />
      <TextInput 
        placeholder='Title...' 
        style={styles.title} 
        placeholderTextColor="#AAAAAA" 
        value={note.title || ''} 
        onChangeText={handleTitleChange}
      />
      <TextInput
        style={styles.notes}
        multiline={true}
        placeholder='notes...'
        placeholderTextColor="#AAAAAA"
        value={note.content || ''}
        onChangeText={handleContentChange}
      />
    </View>
  );
}