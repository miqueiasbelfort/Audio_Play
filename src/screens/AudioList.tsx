import { View, Text, StyleSheet, ScrollView, Dimensions } from 'react-native'
import React, {useContext, useState} from 'react'

import { AudioContext } from '../context/AudioProvider'
import {Audio, AVPlaybackStatus} from 'expo-av'

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

// interface PlaybackObjI {
//   androidImplementation:        string;
//   audioPan:                     number;
//   didJustFinish:                boolean;
//   durationMillis:               number;
//   isBuffering:                  boolean;
//   isLoaded:                     boolean;
//   isLooping:                    boolean;
//   isMuted:                      boolean;
//   isPlaying:                    boolean;
//   playableDurationMillis:       number;
//   positionMillis:               number;
//   progressUpdateIntervalMillis: number;
//   rate:                         number;
//   shouldCorrectPitch:           boolean;
//   shouldPlay:                   boolean;
//   uri:                          string;
//   volume:                       number;
// }

export default function AudioList() {

  const contextType = useContext(AudioContext)
  const [modalVisible, setModalVisble] = useState(false)
  const [audioInfo, setAudioInfo] = useState<AssetIMedia | null>(null)
  
  const [playbackObj, setPlaybackObj] = useState<Audio.Sound | null>(null)
  const [soundObj, setSoundObj] = useState<AVPlaybackStatus | null | undefined>(null)
  const [currentAudio, setCurrentAudio] = useState<AssetIMedia | null>(null)

  const onPlayPress = () => {}
  const onPLayListPress = () => {}

  //Play music
  const handleAudioPress = async (audio: AssetIMedia) => {
    
    // Play Audio for the first time
    if(soundObj === null){
      const playbackObj = new Audio.Sound()
      const status = await playbackObj.loadAsync({uri: audio.uri}, {shouldPlay: true})

      setCurrentAudio(audio)
      setPlaybackObj(playbackObj)
      setSoundObj(status)
    }

    // pause audio
    if(soundObj?.isLoaded && soundObj.isPlaying){
      const status = await playbackObj?.setStatusAsync({shouldPlay: false})
      setSoundObj(status)
    }

    // resume audio
    if(soundObj?.isLoaded && !soundObj.isPlaying && currentAudio?.id == audio.id){
      const status = await playbackObj?.playAsync()
      setSoundObj(status)
    }

  }

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
              onAudioPress={() => handleAudioPress(item)}
            />
          ))
        }
        <OptionsModal 
          currentItem={audioInfo} 
          visible={modalVisible} 
          onClose={() => setModalVisble(false)}
          onPlayPress={onPlayPress}
          onPlayListPress={onPLayListPress}
        />
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