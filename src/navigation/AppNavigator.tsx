import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import {MaterialIcons, FontAwesome5 } from '@expo/vector-icons'

import AudioList from '../screens/AudioList'
import Player from '../screens/Payer'
import PlayList from '../screens/PlayList'

const Tab = createBottomTabNavigator()

export default function AppNavigator() {
  return (
    <Tab.Navigator screenOptions={{headerShown: false}}>
        <Tab.Screen 
            name="AudioList" 
            component={AudioList}
            options={{
                tabBarIcon: ({color, size}) => {
                    return <MaterialIcons name='headset' size={size} color={color}/>
                }
            }}
        />
        <Tab.Screen 
            name="Player" 
            component={Player}
            options={{
                tabBarIcon: ({color, size}) => {
                    return <FontAwesome5 name="compact-disc" size={size} color={color} />
                }
            }}
            
        />
        <Tab.Screen 
            name="PlayList" 
            component={PlayList}
            options={{
                tabBarIcon: ({color, size}) => {
                    return <MaterialIcons name='library-music' size={size} color={color}/>
                }
            }}
        />
    </Tab.Navigator>
  )
}