import { View, Text, StyleSheet, ScrollView, Dimensions } from 'react-native'
import React, {useContext} from 'react'

import { AudioContext } from '../context/AudioProvider'

import AudioFile from '../components/AudioFile'

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
    <ScrollView>
      {
        contextType.audioFiles.map((item: AssetIMedia) => (
          <AudioFile/>
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