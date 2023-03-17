import { View, Text, StyleSheet, StatusBar } from 'react-native'
import React from 'react'
//import { StatusBar } from 'expo-status-bar'

interface ChildrenI {
    children: React.ReactNode
}

export default function Screen({children}: ChildrenI) {
  return (
    <View style={styles.container}>
      {children}
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingTop: StatusBar.currentHeight
    }
})