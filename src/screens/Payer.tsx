import { View, Text, StyleSheet, Dimensions } from 'react-native'
import React, {useContext} from 'react'
import Slider from '@react-native-community/slider'

import Screen from '../components/Screen'
import {MaterialCommunityIcons} from '@expo/vector-icons'
import PlayerButtom from '../components/PlayerButtom'
import { AudioContext } from '../context/AudioProvider'

const {width} = Dimensions.get('window')

export default function Player() {

  const {
    totalAudioCount, 
    currentAudioIndex,
    currentAudio,
    isPlaying,
    playbackPossition,
    playbackDuration
  } = useContext(AudioContext)

  const calculateSeebBar = () => {
    if(playbackPossition != 0 && playbackDuration != 0){
      return playbackPossition / playbackDuration
    }
    return 0
  }

  return (
    <Screen>
      <View style={styles.container}>
        <Text style={styles.audioCount}>{currentAudioIndex + 1} / {totalAudioCount}</Text>
        <View style={styles.midBannerContainer}>
          <MaterialCommunityIcons 
            name='music-circle' 
            size={300} 
            color={isPlaying ? '#1b39b1' : '#3b3b3b'}
          />
        </View>
        <View style={styles.audioPlayerContainer}>
            <Text numberOfLines={1} style={styles.audioTitle}>{currentAudio.filename}</Text>
            <Slider
              style={{width: width, height: 40}}
              minimumValue={0}
              maximumValue={1}
              value={calculateSeebBar()}
              minimumTrackTintColor="#ccc"
              maximumTrackTintColor="#1b39b1"
            />
            <View style={styles.audioControllers}>
              <PlayerButtom iconType='PREV' />
              <View style={{marginHorizontal: 25}}>
                <PlayerButtom 
                  onPress={() => console.log('Hello World')} 
                  iconType={isPlaying ? 'PLAY' : 'PAUSE'}
                />
              </View>
              <PlayerButtom iconType='NEXT'/>
            </View> 
        </View>
      </View>
    </Screen>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    audioCount: {
      textAlign: 'right',
      padding: 15,
      color: '#ccc',
      fontSize: 14
    },
    midBannerContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
    },
    audioPlayerContainer:{

    },
    audioTitle: {
      fontSize: 16,
      color: '#3d3d3d',
      padding: 15
    },
    audioControllers: {
      width,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      paddingBottom: 25
    }
})