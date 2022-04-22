import { StatusBar } from 'expo-status-bar'
import { Platform, StyleSheet } from 'react-native'
import { Button } from '../components/Button'

import EditScreenInfo from '../components/EditScreenInfo'
import { Text, View } from '../components/Themed'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useGameStore } from '../store/GameStore'

export default function ModalScreen() {
    const store = useGameStore()
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Modal</Text>
            <Button
                text="reset game"
                onPress={() => {
                    store.resetGame()
                }}
            />
            <View
                style={styles.separator}
                lightColor="#eee"
                darkColor="rgba(255,255,255,0.1)"
            />
            <EditScreenInfo path="/screens/ModalScreen.tsx" />

            {/* Use a light status bar on iOS to account for the black space above the modal */}
            <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    separator: {
        marginVertical: 30,
        height: 1,
        width: '80%',
    },
})
