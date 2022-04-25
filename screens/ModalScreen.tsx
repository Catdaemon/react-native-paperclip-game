import { SafeAreaView } from 'react-native-safe-area-context'
import { Button } from '../components/Button'
import { View } from '../components/Themed'
import { useGameStore } from '../store/GameStore'

export default function ModalScreen() {
    const store = useGameStore()
    return (
        <SafeAreaView>
            <Button
                text="reset game"
                onPress={() => {
                    store.resetGame()
                }}
            />
        </SafeAreaView>
    )
}
