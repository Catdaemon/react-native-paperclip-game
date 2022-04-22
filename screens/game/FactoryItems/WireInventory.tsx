import React from 'react'
import { View } from 'react-native'
import styled from 'styled-components/native'
import { IconOverlayText } from '../../../components/Typography'
import { lengthFormatter } from '../../../lib/numberFormatter'
import { useGameStore } from '../../../store/GameStore'

const Spool = styled.View`
    width: 96px;
    height: 64px;
`

const Text = styled(IconOverlayText)`
    position: absolute;
    top: 20px;
    left: 0;
    width: 96px;
`

const SpoolText = styled.Text`
    position: absolute;
    top: 0;
    left: 0;
    font-size: 64px;
    width: 96px;
    text-align: center;
`

const WireInventory = () => {
    let currentWire = useGameStore((state) => state.wireLength)

    return (
        <View>
            <Spool>
                <SpoolText>🧵</SpoolText>
                <Text>{lengthFormatter(currentWire, 1)}</Text>
            </Spool>
        </View>
    )
}

export { WireInventory }
