import { View, Text, Alert } from 'react-native'
import React, {useEffect, createContext, useState} from 'react'
import * as MediaLibrary from 'expo-media-library'
import {Audio, AVPlaybackStatus} from 'expo-av'

type Children = {
  children: React.ReactNode
}
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

  // {
  //   "canAskAgain": true, 
  //   "expires": "never", 
  //   "granted": false, 
  //   "status": "undetermined"
  // }

// interface Media {
//   assets:      AssetIMedia[];
//   endCursor:   string;
//   hasNextPage: boolean;
//   totalCount:  number;
// }
// interface AssetIMedia {
//   albumId:          string;
//   creationTime:     number;
//   duration:         number;
//   filename:         string;
//   height:           number;
//   id:               string;
//   mediaType:        string;
//   modificationTime: number;
//   uri:              string;
//   width:            number;
// }


export const AudioContext = createContext<any>({})
export function AudioProvider({children}: Children) {

  const [audioFiles, setAudioFiles] = useState<MediaLibrary.Asset[]>([])
  const [permissionError, setPermissionError] = useState(false)
 
  const [playbackObj, setPlaybackObj] = useState<Audio.Sound>()
  const [soundObj, setSoundObj] = useState<AVPlaybackStatus | null | undefined>(null)
  const [currentAudio, setCurrentAudio] = useState<AssetIMedia | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentAudioId, setCurrentAudioId] = useState<any>()
  const [totalAudioCount, setTotalAudioCount] = useState(0)
  const [currentAudioIndex, setCurrentAudioIndex] = useState()
  
  const [playbackPossition, setPlaybackPossition] = useState()
  const [playbackDuration, setPlaybackDuration] = useState()

  const permissionAlert = () => {
    Alert.alert(
      "Requer Permisão",
      'para porder escultar suas musicas permita a leitura de arquivos',
      [
        {
          text: 'Aceito',
          onPress: () => getPermission()
        },
        {
          text: 'Não aceito',
          onPress: () => permissionAlert()
        }
      ]
    )
  }

  const getAudioFiles = async() => {

    let media = await MediaLibrary.getAssetsAsync({
      mediaType: 'audio'
    })
    media = await MediaLibrary.getAssetsAsync({
      mediaType: 'audio',
      first: media.totalCount,
    })

    setTotalAudioCount(media.totalCount)
    setAudioFiles(media.assets)
    //console.log(media.assets)
  }

  const getPermission = async () => {
    const permission = await MediaLibrary.getPermissionsAsync()
    if(permission.granted){
      // Pegar todos os arquivos de audio
      getAudioFiles()
    }

    if(!permission.canAskAgain && !permission.granted){
      setPermissionError(true)
    }

    if(!permission.granted && permission.canAskAgain){
      
      const {status, canAskAgain} = await MediaLibrary.requestPermissionsAsync()
    
      if(status === 'denied' && canAskAgain){
        // Vamos lancar um alerta para dizer que é preciso permitir
        permissionAlert()
      }

      if(status === 'granted'){
        // Vamos pegar todos os todos os aquivos de audio
        getAudioFiles()
      }

      if(status === 'denied' && !canAskAgain){
        // vamos lancar um erro para o usuario
        setPermissionError(true)
      }

    }
  }

  useEffect(() => {
    getPermission()
  }, [])

  return (
    <AudioContext.Provider
    
      value={{
        audioFiles, 
        permissionError,
        playbackObj,
        setPlaybackObj,
        soundObj,
        setSoundObj,
        currentAudio,
        setCurrentAudio,
        isPlaying,
        setIsPlaying,
        setCurrentAudioId,
        currentAudioId,
        totalAudioCount,
        currentAudioIndex,
        setCurrentAudioIndex,
        playbackPossition,
        setPlaybackPossition,
        playbackDuration,
        setPlaybackDuration
      }}

    >
      {children}
    </AudioContext.Provider>
  )
}