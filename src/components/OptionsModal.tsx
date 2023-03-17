import { View, Text, Modal, StyleSheet, StatusBar, TouchableWithoutFeedback, TouchableOpacity } from 'react-native'
import React from 'react'

import { AssetIMedia } from '../screens/AudioList'

interface ModalI {
    visible: boolean,
    onClose: () => void,
    currentItem: AssetIMedia | null,
    onPlayPress: () => void,
    onPlayListPress: () => void,
}

export default function OptionsModal({visible, onClose, currentItem, onPlayPress, onPlayListPress}: ModalI) {
    
    return (
    <>
        <StatusBar hidden/>
        <Modal animationType='slide' visible={visible} transparent={true}>
            <View style={styles.modal}>
                <Text style={styles.title} numberOfLines={2}>{currentItem?.filename}</Text>
                <View style={styles.optionsContainer}>
                    <TouchableOpacity onPress={onPlayPress}>
                        <Text style={styles.option}>Play</Text>
                    </TouchableOpacity>
                    
                    <TouchableOpacity onPress={onPlayListPress}>
                        <Text style={styles.option}>Add to Playlist</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <TouchableWithoutFeedback onPress={onClose}>
                <View style={styles.modalBG}></View>
            </TouchableWithoutFeedback>  
        </Modal>
    
    </>
  )
}

const styles = StyleSheet.create({
    modal: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        left: 0,
        backgroundColor: '#fff',
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20,
        zIndex: 1000,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        padding: 20,
        paddingBottom: 0,
        color: 'black'
    },
    optionsContainer: {
        padding: 20,
    },
    option: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'black',
        paddingVertical: 10,
        letterSpacing: 1
    },
    modalBG: {
        position: 'absolute',
        top: 0,
        right: 0,
        left: 0,
        bottom: 0,
        backgroundColor: '#00000033'
    }
})