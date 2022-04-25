import * as Haptics from 'expo-haptics'
import React from 'react'
import styled from 'styled-components/native'
import shallow from 'zustand/shallow'
import { Button } from '../../components/Button'
import { RangeInput } from '../../components/RangeInput'
import { BodyText } from '../../components/Typography'
import { useGameStore } from '../../store/GameStore'
import { ClipInventory } from './FactoryItems/ClipInventory'
import { Conveyor } from './FactoryItems/ConveyorBelt'
import { DemandIndicator } from './FactoryItems/DemandIndicator'
import { MoneyDisplay } from './FactoryItems/MoneyDisplay'
import { WireInventory } from './FactoryItems/WireInventory'

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
        upgrades,
        makeClip,
        buyWire,
        maxAutoBuyPrice,
        setMaxBuyPrice,
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
            state.upgrades,
            state.makeClip,
            state.buyWire,
            state.maxAutoBuyPrice,
            state.setMaxBuyPrice,
        ],
        shallow
    )

    const makeClipPressed = () => {
        if (makeClip()) {
            Haptics.impactAsync()
        } else {
            Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error)
        }
    }

    const buyWirePressed = () => {
        if (buyWire()) {
            Haptics.impactAsync()
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
                {upgrades.includes('marketResearch') && <DemandIndicator />}
            </GraphicContainer>
            <ControlsContainer>
                <Button
                    primary
                    text="Make paperclip"
                    onPress={() => makeClipPressed()}
                />
                <Button
                    primary
                    text={`Buy wire (1m for £${wirePrice.toFixed(2)})`}
                    onPress={() => buyWirePressed()}
                />
                <RangeInput
                    label={`Price: £${currentPrice.toFixed(2)}`}
                    min={0.01}
                    max={5}
                    onChange={(val) => setPrice(Math.round(val * 100) / 100)}
                    value={currentPrice}
                />
                {upgrades.includes('wireBuyer') && (
                    <RangeInput
                        label={`Max wire buy price: £${maxAutoBuyPrice}`}
                        min={1}
                        max={100}
                        onChange={(val) =>
                            setMaxBuyPrice(Math.round(val * 100) / 100)
                        }
                        value={currentPrice}
                    />
                )}
            </ControlsContainer>
        </LayoutContainer>
    )
}
