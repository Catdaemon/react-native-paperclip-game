import React from 'react'
import { View } from 'react-native'
import styled from 'styled-components/native'
import { IconOverlayText } from '../../../components/Typography'
import { numberFormatter } from '../../../lib/numberFormatter'
import { useGameStore } from '../../../store/GameStore'

const Money = styled.View`
    width: 96px;
    height: 64px;
`

const Text = styled(IconOverlayText)`
    position: absolute;
    top: 20px;
    left: 0;
    width: 96px;
`

const MoneyText = styled.Text`
    position: absolute;
    top: 0;
    left: 0;
    font-size: 64px;
    width: 96px;
    text-align: center;
`

const MoneyDisplay = () => {
    let money = useGameStore((state) => state.money)

    return (
        <View>
            <Money>
                <MoneyText>💷</MoneyText>
                <Text>£{numberFormatter(money, 1)}</Text>
            </Money>
        </View>
    )
}

export { MoneyDisplay }
