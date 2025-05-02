import { View, Text, StyleSheet, TextInput } from 'react-native'
import { useState, useEffect } from 'react'
import { useDatabase } from '../hooks/useDatabase'
import { useLocalSearchParams } from 'expo-router';

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
    }
})

export default function Notes() {
    const { id } = useLocalSearchParams();
    const { getNoteById } = useDatabase();
    const [note, setNote] = useState({ title: '', content: '' });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getNoteData = async () => {
            try {
                const noteData = await getNoteById(id);
                if (noteData) {
                    setNote(noteData);
                }
            } catch (error) {
                console.error('Error fetching note:', error);
            } finally {
                setLoading(false);
            }
        };
        
        if (id) {
            getNoteData();
        }
    }, [id]);
    
    if (loading) {
        return (
            <View style={styles.view}>
                <Text>Loading...</Text>
            </View>
        );
    }
    
    return (
        <View style={styles.view}>
            <TextInput 
                placeholder='Title...' 
                style={styles.title} 
                placeholderTextColor="#AAAAAA" 
                value={note.title || ''} 
            />
            <TextInput
                style={styles.notes}
                multiline={true}
                placeholder='notes...'
                placeholderTextColor="#AAAAAA"
                value={note.content || ''}
            />
        </View>
    );
}