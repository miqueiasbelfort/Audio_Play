import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import {AntDesign} from '@expo/vector-icons'

interface Button {
    iconType: string,
    color?: string,
    size?: number,
    onPress?: () => void,
    otherProps?: any
}

export default function PlayerButtom(props: Button) {
  
    const {iconType, size = 40, color = 'black', onPress, otherProps} = props

    const getIconName = (type: string) => {
        switch(type){
            case 'PlAY':
                return "pausecircle"
            case 'PAUSE':
                return "playcircleo"
            case 'NEXT':
                return "forward"
            case 'PREV':
                return "banckward"
        }
    }
  
    return (
    <AntDesign {...props} onPress={onPress} size={size} color={color} name={getIconName(iconType)}/>
  )
}

const styles = StyleSheet.create({
    container: {

    }
})