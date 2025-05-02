import {View, Text, StyleSheet, TextInput, Dimensions } from 'react-native'
import { useState, useEffect } from 'react'
import { useDatabase } from './hooks/useDatabase'
import { useParams } from 'react-router-native';

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
    // need to get id from param
    const {getNoteById} = useDatabase()
    const [note, setNote] = useState(null)

    useEffect(() => {
        const getNoteData = async () => {
            const note = await getNoteById(id)
            setNote(note)
        }
        getNoteData()
    }, [])
    
    return (
        <View style={styles.view}>
            <TextInput placeholder='Title...' style={styles.title} placeholderTextColor="#AAAAAA" value={note.title} />
            <TextInput
            style={styles.notes}
            multiline={true}
            placeholder='notes...'
            placeholderTextColor="#AAAAAA"
            value={note.content}
            />
        </View>
    )
}