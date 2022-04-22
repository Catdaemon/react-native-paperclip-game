import { AnimatePresence, MotiView, useAnimationState } from 'moti'
import React, { useEffect, useState } from 'react'
import { LayoutAnimation, View } from 'react-native'
import styled from 'styled-components/native'
import { useGameStore } from '../../../store/GameStore'

const ConveyorRow = styled.View`
    flex-direction: row;
    overflow: hidden;
`

const ConveyorBelt = styled.View`
    flex-direction: row;
    flex: 8;
    background-color: black;
    padding: 8px;
    margin: 8px 0 8px 8px;
`

const ConveyorItem = styled.Text`
    margin: 0 8px;
    font-size: 32px;
`

interface ConveyorItem {
    id: number
}

const Conveyor = () => {
    let totalClips = useGameStore((state) => state.totalPaperclips)
    const [clips, setClips] = useState<ConveyorItem[]>([])

    useEffect(() => {
        const newClips = [
            {
                id: Date.now(),
            },
            ...clips,
        ]
        if (newClips.length > 8) {
            newClips.pop()
        }
        LayoutAnimation.configureNext(LayoutAnimation.Presets.spring)
        setClips(newClips)
    }, [totalClips])

    return (
        <View>
            <ConveyorRow>
                <ConveyorBelt>
                    <AnimatePresence>
                        {clips.map((clip) => (
                            <MotiView
                                key={clip.id}
                                from={{
                                    opacity: 0,
                                    scale: 2,
                                }}
                                animate={{
                                    opacity: 1,
                                    scale: 1,
                                }}
                                exit={{
                                    opacity: 0,
                                    scale: 0,
                                }}
                            >
                                <ConveyorItem>📎</ConveyorItem>
                            </MotiView>
                        ))}
                    </AnimatePresence>
                </ConveyorBelt>
            </ConveyorRow>
        </View>
    )
}

export { Conveyor }
