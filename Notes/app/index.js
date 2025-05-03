import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native'
import { Link } from 'expo-router'
import useDatabase from './hooks/useDatabase'
import { useEffect, useState, useRef } from 'react'
import Header from './components/Header'

const styles = StyleSheet.create({
    view: {
        flex: 1
    },
    noteItem: {
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#EEEEEE',
    },
    noteTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    noteDate: {
        fontSize: 12,
        color: '#999',
    },
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    emptyText: {
        fontSize: 16,
        color: '#999',
        textAlign: 'center',
        marginBottom: 20,
    },
    errorText: {
        fontSize: 16,
        color: '#FF3B30',
        textAlign: 'center',
        marginBottom: 20,
    },
    newNoteButton: {
        backgroundColor: '#007AFF',
        padding: 16,
        borderRadius: 8,
        alignItems: 'center',
        marginHorizontal: 20,
        marginBottom: 20,
    },
    newNoteText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16,
    }
})

export default function Home() {
    const { getAllNotes, newNote, dbReady } = useDatabase()
    const [loading, setLoading] = useState(true)
    const [notes, setNotes] = useState([])
    const [error, setError] = useState(null)
    
    useEffect(() => {
        if (!dbReady) return;
        
        const loadData = async () => {
            try {
                const allNotes = await getAllNotes()
                setNotes(allNotes)
            } catch (err) {
                console.error('Error loading notes:', err)
                setError('Could not load notes. Please try again.')
            } finally {
                setLoading(false)
            }
        }
        loadData()
    }, [dbReady]);

    const renderNoteItem = ({ item }) => (
        <Link href={`/notes/${item.id}`} asChild>
            <TouchableOpacity style={styles.noteItem}>
                <Text style={styles.noteTitle}>{item.title || 'Untitled Note'}</Text>
                <Text numberOfLines={1}>{item.content?.substring(0, 100) || 'No content'}</Text>
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
        )
    }
    
    if (error) {
        return (
            <View style={styles.view}>
                <Header />
                <View style={styles.emptyContainer}>
                    <Text style={styles.errorText}>{error}</Text>
                </View>
            </View>
        )
    }

    return (
        <View style={styles.view}>
            <Header />
            <FlatList
                data={notes}
                renderItem={renderNoteItem}
                keyExtractor={item => item.id}
                ListEmptyComponent={renderEmptyList}
                contentContainerStyle={{ flexGrow: 1 }}
            />
            <Link href={`/notes/${newNote().id}`} asChild>
                <TouchableOpacity style={styles.newNoteButton}>
                    <Text style={styles.newNoteText}>+ New Note</Text>
                </TouchableOpacity>
            </Link>
        </View>
    )
}