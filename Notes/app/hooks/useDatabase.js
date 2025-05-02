import AsyncStorage from '@react-native-async-storage/async-storage'
import { useEffect, useState, useCallback } from "react"
import { v4 as uuid } from 'uuid'

export default function useDatabase() {
    const [dbReady, setDbReady] = useState(false)

    useEffect(() => {
        const initializeDB = async () => {
            const initialized = await AsyncStorage.getItem('NOTES_DB_INIT')
            if (!initialized) {
                await AsyncStorage.setItem('NOTES_DB_INIT', "true")
                await AsyncStorage.setItem('NOTES_IDS', JSON.stringify([]))
            }
            setDbReady(true)
        }
        initializeDB()
    }, [])

    const saveNote = useCallback(async (id, title, content) => {
        if (!dbReady) return Promise.reject('Database not ready')
        if (!id || !title || !content) return Promise.reject('Missing note data')

        try {
            const note = { id, title, content, updated_at: Date.now() }
            await AsyncStorage.setItem(`NOTE_${id}`, JSON.stringify(note))

            const idsData = await AsyncStorage.getItem('NOTES_IDS')
            const ids = new Set(idsData ? JSON.parse(idsData) : [])

            if (!ids.has(id)) {
                ids.add(id)
                await AsyncStorage.setItem('NOTES_IDS', JSON.stringify(Array.from(ids)))
            }

            return true
        } catch (error) {
            console.error('Error saving note:', error)
            return Promise.reject('Error saving note')
        }
    }, [dbReady])

    const deleteNote = useCallback(async (id) => {
        if (!dbReady) return Promise.reject('Database not ready')
        if (!id) return Promise.reject('Missing note ID')

        try {
            await AsyncStorage.removeItem(`NOTE_${id}`)

            const idsData = await AsyncStorage.getItem('NOTES_IDS')
            const ids = new Set(idsData ? JSON.parse(idsData) : [])

            if (ids.has(id)) {
                ids.delete(id)
                await AsyncStorage.setItem('NOTES_IDS', JSON.stringify([...ids]))
            }

            return true
        } catch (error) {
            console.error('Error deleting note:', error)
            return Promise.reject('Error deleting note')
        }
    }, [dbReady])

    const newNote = useCallback(() => {
        return {
            id: uuid(),
            title: '',
            content: '',
            updated_at: Date.now()
        }
    }, [])

    const getAllNotes = useCallback(async () => {
        if (!dbReady) return Promise.reject('Database not ready')

        try {
            const idsJson = await AsyncStorage.getItem('NOTES_IDS')
            const ids = idsJson ? JSON.parse(idsJson) : []

            const notesPromises = ids.map(id =>
                AsyncStorage.getItem(`NOTE_${id}`).then(json => json ? JSON.parse(json) : null)
            )

            const notes = await Promise.all(notesPromises)

            return notes
                .filter(note => note !== null)
                .sort((a, b) => b.updated_at - a.updated_at)
        } catch (err) {
            console.error('Error getting all notes:', err)
            return Promise.reject(err)
        }
    }, [dbReady])

    const getNoteById = async (id) => {
        if (!id) return Promise.reject('Missing note ID')
        return AsyncStorage.getItem(id)
    }

    return { saveNote, deleteNote, newNote, getAllNotes }
}
