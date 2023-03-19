import { View, Text, StyleSheet, Dimensions } from 'react-native'
import React from 'react'
import Slider from '@react-native-community/slider'

import Screen from '../components/Screen'
import {MaterialCommunityIcons} from '@expo/vector-icons'
import PlayerButtom from '../components/PlayerButtom'

const {width} = Dimensions.get('window')

export default function Player() {

  return (
    <Screen>
      <View style={styles.container}>
        <Text style={styles.audioCount}>1 / 99</Text>
        <View style={styles.midBannerContainer}>
          <MaterialCommunityIcons 
            name='music-circle' 
            size={300} 
            color='#1b39b1'
          />
        </View>
        <View style={styles.audioPlayerContainer}>
            <Text numberOfLines={1} style={styles.audioTitle}>Audio File Name</Text>
            <Slider
              style={{width: width, height: 40}}
              minimumValue={0}
              maximumValue={1}
              minimumTrackTintColor="#ccc"
              maximumTrackTintColor="#1b39b1"
            />
            <View style={styles.audioControllers}>
              <PlayerButtom iconType='PREV' />
              <PlayerButtom onPress={() => console.log('Hello World')} iconType='PLAY'/>
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
      paddingBottom: 10
    }
})