import {View, Text, StyleSheet, TextInput, Dimensions } from 'react-native'
import { useState } from 'react'

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

export default function Home() {
    return (
        <View style={styles.view}>
            <TextInput placeholder='Title...' style={styles.title} placeholderTextColor="#AAAAAA" />
            <TextInput
            style={styles.notes}
            multiline={true}
            placeholder='notes...'
            placeholderTextColor="#AAAAAA"
            />
        </View>
    )
}