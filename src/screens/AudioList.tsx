import { View, Text, StyleSheet, ScrollView, Dimensions } from 'react-native'
import React, {useContext, useState} from 'react'

import { AudioContext } from '../context/AudioProvider'
import {Audio, AVPlaybackStatus} from 'expo-av'

import { play, pause, resume, playNext } from '../misc/audioController'

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
  
  // const [playbackObj, setPlaybackObj] = useState<Audio.Sound>()
  // const [soundObj, setSoundObj] = useState<AVPlaybackStatus | null | undefined>(null)
  // const [currentAudio, setCurrentAudio] = useState<AssetIMedia | null>(null)

  const onPlayPress = () => {}
  const onPLayListPress = () => {}

  const onPlaybackStatusUpdate = (playbackStatus: AVPlaybackStatus) => {
    if(playbackStatus.isLoaded && playbackStatus.isPlaying){
      contextType.setPlaybackPossition(playbackStatus.positionMillis)
      contextType.setPlaybackDuration(playbackStatus.durationMillis)
    }
  }

  //Play music
  const handleAudioPress = async (audio: AssetIMedia, i: number) => {
    
    // Play Audio for the first time
    if(contextType.soundObj === null){
      const playbackObj = new Audio.Sound()
      const status = await play(playbackObj, audio.uri)
      
      contextType.setCurrentAudio(audio)
      contextType.setPlaybackObj(playbackObj)
      contextType.setSoundObj(status)
      contextType.setIsPlaying(true)
      contextType.setCurrentAudioId(audio.id)
      contextType.setCurrentAudioIndex(i)

      playbackObj.setOnPlaybackStatusUpdate(onPlaybackStatusUpdate)
    }

    // pause audio
    if(contextType.soundObj?.isLoaded && contextType.soundObj.isPlaying && contextType.currentAudio?.id == audio.id){
      const status = await pause(contextType.playbackObj)
      contextType.setSoundObj(status)
      contextType.setIsPlaying(false)
    }

    // resume audio
    if(contextType.soundObj?.isLoaded && !contextType.soundObj.isPlaying && contextType.currentAudio?.id == audio.id){
      const status = await resume(contextType.playbackObj)
      contextType.setSoundObj(status)
      contextType.setIsPlaying(true)
    }

    // select another audio
    if(contextType.soundObj?.isLoaded && contextType.currentAudio?.id !== audio.id){
      const status = await playNext(contextType.playbackObj, audio.uri)
     
      contextType.setCurrentAudio(audio)
      contextType.setSoundObj(status)
      contextType.setIsPlaying(true)
      contextType.setCurrentAudioId(audio.id)
      contextType.setCurrentAudioIndex(i)
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
              onAudioPress={() => handleAudioPress(item, i)}
              isPlaying={contextType.isPlaying}
              activeListItem={contextType.currentAudioId === item.id}
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