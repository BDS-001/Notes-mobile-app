import {View, Text, StyleSheet } from 'react-native'
import { Link } from 'expo-router'
import { useDatabase } from './hooks/useDatabase'
import { useEffect, useState, useRef } from 'react'

const styles = StyleSheet.create({
    view: {
        flex: 1
    }
})

export default function Home() {
    const { getAllNotes } = useDatabase()
    const [loading, setLoading] = useState(true)
    const notes = useRef(null)
    
    useEffect(() => {
        const loadData = async () => {
            notes.current = await getAllNotes()
            setLoading(false)
        }
        loadData()
    }, []);

    if (loading) {
        return (
            <View style={styles.view}>
                <Text>Loading...</Text>
            </View>
        )
    }

    return (
        <View style={styles.view}>
            <Text>Homepage</Text>
        </View>
    )
}