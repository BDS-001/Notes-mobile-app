import AsyncStorage from '@react-native-async-storage/async-storage'
import { useEffect, useState } from "react"
import { v4 as uuid } from 'uuid'

export default function useDatabase() {
    const [dbReady, setDbReady] = useState(false)
    useEffect(() => {
        const initializeDB = async () => {
            //check if db is setup
            const initialized = await AsyncStorage.getItem('NOTES_DB_INIT')

            //setup db to save notes
            if (!initialized) {
                await AsyncStorage.setItem('NOTES_DB_INIT', true)
                await AsyncStorage.setItem('NOTES_IDS', JSON.stringify(new Set()))
            }

            setDbReady(true)
        }

        initializeDB()
    }, [])

    const saveNote = async (id, title, content) => {
        if (!dbReady) return Promise.reject('Database not ready');
        if (!id || !title || !content) return Promise.reject('Missing note data');
        try {
            //save note
            const note = {id, title, content}
            await AsyncStorage.setItem(`NOTE_${id}`, JSON.stringify(note))

            //get ids and add note if it is not already listed
            const idsData = await AsyncStorage.getItem('NOTES_IDS')
            const ids = idsData ? new Set(JSON.parse(idsData)) : new Set()
            if (!ids.has(id)) {
                ids.add(id)
                await AsyncStorage.setItem('NOTES_IDS', JSON.stringify(Array.from(ids)))
            }
            return note
        } catch (error) {
            console.log('error saving note', error)
            return Promise.reject('error saving note');
        }
    }
}