import React from 'react'
import styled from 'styled-components/native'
import { Button } from '../../components/Button'
import { BodyText, Header2, Header3 } from '../../components/Typography'
import { upgrade, upgradeList, upgradeType } from '../../lib/game/upgrades'
import { useGameStore } from '../../store/GameStore'
import * as Haptics from 'expo-haptics'
import { MoneyDisplay } from './FactoryItems/MoneyDisplay'

const LayoutContainer = styled.View`
    width: 100%;
    flex-direction: column;
    padding: 16px;
`

const Row = styled.View`
    flex-direction: row;
    padding: 8px;
`

const MoneyRow = styled(Row)`
    justify-content: space-between;
`

const DescriptionColumn = styled.View`
    flex: 2;
    align-items: flex-start;
    flex-direction: column;
`

const PriceColumn = styled.View`
    flex: 1;
    justify-content: center;
`

const BoughtUpgrade = styled.Text`
    font-size: 32px;
`

export function UpgradesScreen() {
    const [
        upgrades,
        money,
        addMoney,
        addUpgrade,
        autoClipperQty,
        addClipper,
        addPopularity,
        popularity,
    ] = useGameStore((state) => [
        state.upgrades,
        state.money,
        state.addMoney,
        state.addUpgrade,
        state.autoClippers,
        state.addAutoClipper,
        state.addPopularity,
        state.popularity,
    ])
    const potentialUpgrades = Object.keys(upgradeList) as upgradeType[]
    const clipperPrice = 100 * autoClipperQty
    const marketingPrice = 100 * popularity

    const buy = (type: upgradeType) => {
        const upgrade = upgradeList[type]

        if (money >= upgrade.price) {
            addMoney(upgrade.price * -1)
            addUpgrade(type)
            Haptics.selectionAsync()
        } else {
            Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error)
        }
    }

    const buyClipper = () => {
        if (money >= clipperPrice) {
            Haptics.selectionAsync()
            addMoney(clipperPrice * -1)
            addClipper()
        } else {
            Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error)
        }
    }

    const buyMarketing = () => {
        if (money >= marketingPrice) {
            Haptics.selectionAsync()
            addMoney(marketingPrice * -1)
            addPopularity(1)
        } else {
            Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error)
        }
    }

    return (
        <LayoutContainer>
            <MoneyRow>
                <Header2>Money</Header2>
                <MoneyDisplay />
            </MoneyRow>
            {potentialUpgrades.map((key) => {
                const hasUpgrade = upgrades.includes(key)
                const upgrade = upgradeList[key]
                return (
                    <Row key={key}>
                        <DescriptionColumn>
                            <Header3>{upgrade.label}</Header3>
                            <BodyText>{upgrade.description}</BodyText>
                        </DescriptionColumn>
                        <PriceColumn>
                            {hasUpgrade ? (
                                <BoughtUpgrade>★</BoughtUpgrade>
                            ) : (
                                <Button
                                    success
                                    text={`£${upgrade.price}`}
                                    onPress={() => buy(key)}
                                />
                            )}
                        </PriceColumn>
                    </Row>
                )
            })}
            {upgrades.includes('autoClipper') && (
                <Row>
                    <DescriptionColumn>
                        <Header3>Additional Clip Machine</Header3>
                        <BodyText>
                            Buy more machines! You currently have{' '}
                            {autoClipperQty}.
                        </BodyText>
                    </DescriptionColumn>
                    <PriceColumn>
                        <Button
                            success
                            text={`£${clipperPrice}`}
                            onPress={() => buyClipper()}
                        />
                    </PriceColumn>
                </Row>
            )}
            <Row>
                <DescriptionColumn>
                    <Header3>Marketing</Header3>
                    <BodyText>
                        Let people know the benefits of your paperclips. Current
                        popularity level is {popularity}.
                    </BodyText>
                </DescriptionColumn>
                <PriceColumn>
                    <Button
                        success
                        text={`£${marketingPrice}`}
                        onPress={() => buyMarketing()}
                    />
                </PriceColumn>
            </Row>
        </LayoutContainer>
    )
}
