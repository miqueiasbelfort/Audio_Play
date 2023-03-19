import { View, Text, StyleSheet, Dimensions, TouchableWithoutFeedback } from 'react-native'
import React from 'react'
import {Entypo} from '@expo/vector-icons'

interface AudioListI {
  title: string,
  duration: number,
  onOptionPress: () => void,
  onAudioPress: () => Promise<void>,
  isPlaying: boolean,
  activeListItem: boolean
}

export default function AudioFile({title, duration, onOptionPress, onAudioPress, isPlaying, activeListItem}: AudioListI) {
  
  const getThumbnailText = (filename: string) => filename[0]

  const convertTime = (minutes: number) => {
    if(minutes){
      
      const hrs = minutes / 60
      const minute = hrs.toString().split('.')[0]
      const percent = parseInt(hrs.toString().split('.')[1].slice(0, 2))
      const sec = Math.ceil((60 * percent) / 100)

      if(parseInt(minute) < 10 && sec < 10){
        return `0${minute}:0${sec}`
      }

      if(parseInt(minute) < 10){
        return `0${minute}:${sec}`
      }

      if(sec < 10){
        return `${minute}:0${sec}`
      }

      return `${minute}:${sec}`

    }
  }

  const renderIcon = () => {
    if(isPlaying) return <Entypo name='controller-paus' size={20} color="#000"/>
    return <Entypo name='controller-play' size={20} color="#000"/>
  }

  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback onPress={onAudioPress}>
        <View style={styles.leftContainer}>
          <View style={styles.thumbnail}>
              <Text style={styles.thumbnailText}>
                {activeListItem ? renderIcon() : getThumbnailText(title)}
              </Text>
          </View>
          <View style={styles.titleContainer}>
              <Text numberOfLines={1} style={styles.title}>{title}</Text>
              <Text style={styles.timeText}>{convertTime(duration)}</Text>
          </View>
        </View>
      </TouchableWithoutFeedback>

      <View style={styles.rightContainer}>
        <Entypo
          onPress={onOptionPress} 
          name='dots-three-vertical' 
          size={20} 
          color="#000"
        />
      </View>

    </View>
  )
}

const {width} = Dimensions.get('window')
const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignSelf: 'center',
      width: width - 80,
      marginBottom: 10,
    },
    leftContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      flex: 1,
    },
    thumbnail: {
      height: 50,
      flexBasis: 50,
      backgroundColor: 'gray',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 25,
    },
    thumbnailText: {
      fontSize: 22,
      fontWeight: 'bold',
      color: 'black'
    },
    titleContainer: {
      width: width - 180,
      paddingLeft: 10,
    },
    title: {
      fontSize: 16,
      color: 'black'
    },
    timeText: {
      fontSize: 14,
      color: 'gray'
    },
    rightContainer: {
      flexBasis: 50,
      height: 50,
      alignItems: 'center',
      justifyContent: 'center',
    }
})