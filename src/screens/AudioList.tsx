import { View, Text, StyleSheet, ScrollView } from 'react-native'
import React, {useContext} from 'react'

import { AudioContext } from '../context/AudioProvider'

interface AssetIMedia {
  albumId:          string;
  creationTime:     number;
  duration:         number;
  filename:         string;
  height:           number;
  id:               string;
  mediaType:        string;
  modificationTime: number;
  uri:              string;
  width:            number;
}

export default function AudioList() {

  const contextType = useContext(AudioContext)

  return (
    <ScrollView style={styles.container}>
      {
        contextType.audioFiles.map((item: AssetIMedia) => (
          <Text style={{padding: 10, borderBottomColor: 'gray', borderBottomWidth: 1}} key={item.id}>
            {item.filename}
          </Text>
        ))
      }
    </ScrollView>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignContent: 'center',
    }
})