import { AnimatePresence, MotiView, useAnimationState } from 'moti'
import React, { useEffect, useState } from 'react'
import { LayoutAnimation, View } from 'react-native'
import styled from 'styled-components/native'
import { Button } from '../../components/Button'
import { useGameStore } from '../../store/GameStore'
import { ClipInventory } from './FactoryItems/ClipInventory'
import { Conveyor } from './FactoryItems/ConveyorBelt'
import { WireInventory } from './FactoryItems/WireInventory'
import * as Haptics from 'expo-haptics'
import { MoneyDisplay } from './FactoryItems/MoneyDisplay'
import { RangeInput } from '../../components/RangeInput'
import shallow from 'zustand/shallow'
import { DemandIndicator } from './FactoryItems/DemandIndicator'
import { BodyText } from '../../components/Typography'

const LayoutContainer = styled.View`
    width: 100%;
    flex-direction: column;
`

const GraphicContainer = styled.View`
    height: 40%;
    background-color: red;
    padding: 8px 0 0;
`

const ControlsContainer = styled.ScrollView`
    height: 60%;
    background-color: blue;
    padding: 32px;
`

const Row = styled.View`
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-evenly;
    margin: 16px 0;
`

export function ProductionScreen() {
    const [
        addClips,
        addWire,
        setPrice,
        setWirePrice,
        addMoney,
        currentPrice,
        currentWire,
        wirePrice,
        money,
    ] = useGameStore(
        (state) => [
            state.addPaperclips,
            state.addWire,
            state.setPrice,
            state.setWirePrice,
            state.addMoney,
            state.price,
            state.wireLength,
            state.wirePrice,
            state.money,
        ],
        shallow
    )

    const makeClip = () => {
        if (currentWire >= 1) {
            addWire(-1)
            addClips(1)
            Haptics.selectionAsync()
        } else {
            Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error)
        }
    }

    const buyWire = () => {
        if (money >= wirePrice) {
            addWire(100)
            addMoney(wirePrice * -1)
            setWirePrice(wirePrice * 1.5)
            Haptics.selectionAsync()
        } else {
            Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error)
        }
    }

    return (
        <LayoutContainer>
            <GraphicContainer>
                <BodyText center>Assets</BodyText>
                <Row>
                    <ClipInventory />
                    <WireInventory />
                    <MoneyDisplay />
                </Row>
                <Conveyor />
                <DemandIndicator />
            </GraphicContainer>
            <ControlsContainer>
                <Button
                    primary
                    text="Make paperclip"
                    onPress={() => makeClip()}
                />
                <Button
                    primary
                    text={`Buy wire (1m for £${wirePrice})`}
                    onPress={() => buyWire()}
                />
                <RangeInput
                    label={`Price: £${currentPrice}`}
                    min={0.01}
                    max={5}
                    onChange={(val) => setPrice(Math.round(val * 100) / 100)}
                    value={currentPrice}
                />
            </ControlsContainer>
        </LayoutContainer>
    )
}
