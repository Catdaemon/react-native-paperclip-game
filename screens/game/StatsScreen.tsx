import React from 'react'
import styled from 'styled-components/native'
import { VictoryChart, VictoryGroup, VictoryLine } from 'victory-native'
import shallow from 'zustand/shallow'
import { useGameStore } from '../../store/GameStore'

const LayoutContainer = styled.View`
    width: 100%;
    flex-direction: column;
`

export function StatsScreen() {
    const [history] = useGameStore((state) => [state.history])

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
            <VictoryChart domain={{ y: [0, 1] }} height={600}>
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
