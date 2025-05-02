import AsyncStorage from '@react-native-async-storage/async-storage'
import { useEffect, useState } from "react"

export default function useDatabase() {
    const [dbReady, setDbReady] = useState(false)
    useEffect(() => {
        const initializeDB = async () => {
            //check if db is setup
            const initialized = await AsyncStorage.getItem('NOTES_DB_INIT')

            //setup db to save notes
            if (!initialized) {
                await AsyncStorage.setItem('NOTES_DB_INIT', true)
                await AsyncStorage.setItem('NOTES_IDS', JSON.stringify([]))
            }

            setDbReady(true)
        }

        initializeDB()
    }, [])
}