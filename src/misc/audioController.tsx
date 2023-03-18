import {Audio, AVPlaybackStatus} from 'expo-av'

// Play Audio
export const play = async (playbackObj: Audio.Sound, uri: string) => {
    try {
        return await playbackObj.loadAsync(
            {uri},
            {shouldPlay: true}
        )
    } catch (error) {
        console.log(error)
    }
}

// Pause Audio
export const pause = async (playbackObj: Audio.Sound | undefined) => {
    try {
        return await playbackObj?.setStatusAsync({shouldPlay: false})
    } catch (error) {
        console.log(error)
    }
}

// Resume Audio
export const resume = async (playbackObj: Audio.Sound | undefined) => {
    try {
        return await playbackObj?.playAsync()
    } catch (error) {
        console.log(error)
    }
}

// Select Another Audio
export const playNext = async (playbackObj: Audio.Sound, uri: string) => {
    try {
        await playbackObj.stopAsync()
        await playbackObj.unloadAsync()
        return await play(playbackObj, uri)
    } catch (error) {
        console.log(error)
    }
}