import { View, Text, StyleSheet, TextInput } from 'react-native'
import { useState, useEffect } from 'react'
import useDatabase from '../hooks/useDatabase'
import { useLocalSearchParams } from 'expo-router';
import Header from '../components/Header'

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
    const { getNoteById, saveNote, dbReady } = useDatabase();
    const [note, setNote] = useState({ title: '', content: '' });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!dbReady) return;
        
        const getNoteData = async () => {
            try {
                const noteData = await getNoteById(id);
                if (noteData) {
                    setNote(noteData);
                }
            } catch (error) {
                console.error('Error fetching note:', error);
                setError('Could not load note. Please try again.');
            } finally {
                setLoading(false);
            }
        };
        
        if (id) {
            getNoteData();
        }
    }, [id, dbReady]);

    const handleTitleChange = (text) => {
        setNote(prev => {
            const updated = { ...prev, title: text };
            // We're not awaiting the promise to avoid blocking the UI
            saveNote(id, updated.title, updated.content)
                .catch(err => {
                    console.error('Error saving title:', err);
                    // We could show a toast notification here if we had a toast library
                });
            return updated;
        });
    };

    const handleContentChange = (text) => {
        setNote(prev => {
            const updated = { ...prev, content: text };
            // We're not awaiting the promise to avoid blocking the UI
            saveNote(id, updated.title, updated.content)
                .catch(err => {
                    console.error('Error saving content:', err);
                    // We could show a toast notification here if we had a toast library
                });
            return updated;
        });
    };
    
    if (loading) {
        return (
            <View style={styles.view}>
                <Header />
                <Text style={styles.loadingText}>Loading...</Text>
            </View>
        );
    }
    
    if (error) {
        return (
            <View style={styles.view}>
                <Header />
                <Text style={styles.errorText}>{error}</Text>
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