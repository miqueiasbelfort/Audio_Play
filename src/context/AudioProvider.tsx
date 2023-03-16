import { View, Text, Alert } from 'react-native'
import React, {useEffect, createContext, useState} from 'react'
import * as MediaLibrary from 'expo-media-library'

type Children = {
  children: React.ReactNode
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

    setAudioFiles(media.assets)
    //console.log(media.assets.length)
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
    
      value={{audioFiles, permissionError}}

    >
      {children}
    </AudioContext.Provider>
  )
}