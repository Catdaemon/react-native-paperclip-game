import React from 'react'
import { Header } from 'react-native/Libraries/NewAppScreen'
import styled from 'styled-components/native'
import {
    VictoryChart,
    VictoryGroup,
    VictoryLegend,
    VictoryLine,
} from 'victory-native'
import shallow from 'zustand/shallow'
import { Header1, Header2 } from '../../components/Typography'
import { useGameStore } from '../../store/GameStore'

const LayoutContainer = styled.View`
    width: 100%;
    flex-direction: column;
`

export function StatsScreen() {
    const [history, name] = useGameStore((state) => [
        state.history,
        state.businessName,
    ])

    const filtered = history.slice(-10)

    const priceLine = filtered.map((x) => ({
        x: x.time,
        y: x.price,
    }))
    const clipsLine = filtered.map((x) => ({
        x: x.time,
        y: x.paperclips,
    }))
    const wireLine = filtered.map((x) => ({
        x: x.time,
        y: x.wirePrice,
    }))
    const moneyLine = filtered.map((x) => ({
        x: x.time,
        y: x.money,
    }))

    return (
        <LayoutContainer>
            <Header2 center>{name} performance</Header2>
            <VictoryChart domain={{ y: [0, 100] }} height={600}>
                <VictoryGroup
                    offset={0}
                    colorScale={'qualitative'}
                    animate={{
                        duration: 200,
                        onLoad: { duration: 200 },
                    }}
                >
                    <VictoryLine data={priceLine} />
                    <VictoryLine data={clipsLine} />
                    <VictoryLine data={wireLine} />
                    <VictoryLine data={moneyLine} />
                </VictoryGroup>
            </VictoryChart>
        </LayoutContainer>
    )
}
