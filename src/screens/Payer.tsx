import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

export default function Player() {

  return (
    <View style={styles.container}>
      <Text>Player</Text>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignContent: 'center',
        alignItems: 'center'
    }
})