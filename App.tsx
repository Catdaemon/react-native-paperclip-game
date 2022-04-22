import { StatusBar } from 'expo-status-bar'
import { SafeAreaProvider } from 'react-native-safe-area-context'

import useCachedResources from './hooks/useCachedResources'
import useColorScheme from './hooks/useColorScheme'
import { useGameTick } from './lib/useGameTick'
import { GameScreen } from './screens/GameScreen'
import { IntroScreen } from './screens/IntroScreen'
import { useGameStore } from './store/GameStore'

export default function App() {
    const isLoadingComplete = useCachedResources()
    const colorScheme = useColorScheme()
    const gameStarted = useGameStore((state) => state.skipIntro)
    useGameTick()

    if (!isLoadingComplete) {
        return null
    } else {
        return (
            <SafeAreaProvider>
                {!gameStarted ? (
                    <IntroScreen />
                ) : (
                    <GameScreen colorScheme={colorScheme} />
                )}
                <StatusBar />
            </SafeAreaProvider>
        )
    }
}
