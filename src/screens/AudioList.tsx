import { View, Text, StyleSheet, ScrollView, Dimensions } from 'react-native'
import React, {useContext, useState} from 'react'

import { AudioContext } from '../context/AudioProvider'

import AudioFile from '../components/AudioFile'
import Screen from '../components/Screen'
import OptionsModal from '../components/OptionsModal'

export interface AssetIMedia {
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
  const [modalVisible, setModalVisble] = useState(false)
  const [audioInfo, setAudioInfo] = useState<AssetIMedia | null>(null)

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
                setModalVisble(true)
                setAudioInfo(item)
              }}
            />
          ))
        }
        <OptionsModal currentItem={audioInfo} visible={modalVisible} onClose={() => setModalVisble(false)}/>
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