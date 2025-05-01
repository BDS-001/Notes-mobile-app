import {View, Text, StyleSheet } from 'react-native'
import { Link } from 'expo-router'

const styles = StyleSheet.create({
    view: {
        flex: 1
    }
})

export default function Home() {
    return (
        <View style={styles.view}>
            <Text>Homepage</Text>
           <Link href={`/notes`}>View Notes</Link>
        </View>
    )
}