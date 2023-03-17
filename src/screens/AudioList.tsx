import { View, Text, StyleSheet, ScrollView, Dimensions } from 'react-native'
import React, {useContext} from 'react'

import { AudioContext } from '../context/AudioProvider'

import AudioFile from '../components/AudioFile'
import Screen from '../components/Screen'

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
//{/*<Text style={{padding: 10}} key={item.id}>{item.filename}</Text>*/}

export default function AudioList() {

  const contextType = useContext(AudioContext)


  return (
    <ScrollView style={styles.container}>
      <Screen>
        {
          contextType.audioFiles.map((item: AssetIMedia, i: number) => (
            <AudioFile 
              key={i} 
              title={item.filename}
              duration={item.duration}
              onOptionPress={() => {
                console.log('Hello World')
              }}
            />
          ))
        }
      </Screen>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignContent: 'center',
        paddingTop: 10,
        marginBottom: 5,
        backgroundColor: '#fff'
    }
})