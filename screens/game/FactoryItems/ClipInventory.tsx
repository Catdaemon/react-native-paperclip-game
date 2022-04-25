import { AnimatePresence, MotiView } from 'moti'
import React, { ReactNode, useEffect, useState } from 'react'
import { View } from 'react-native'
import styled from 'styled-components/native'
import { IconOverlayText } from '../../../components/Typography'
import { numberFormatter } from '../../../lib/numberFormatter'
import { useGameStore } from '../../../store/GameStore'
import shallow from 'zustand/shallow'

const Box = styled.View`
    width: 96px;
    height: 64px;
`

const Text = styled(IconOverlayText)`
    position: absolute;
    top: 20px;
    left: 0;
    width: 96px;
`

const BoxText = styled.Text`
    position: absolute;
    top: 0;
    left: 0;
    font-size: 64px;
    width: 96px;
    text-align: center;
`

const Clip = styled.Text`
    position: absolute;
    top: 16px;
    left: 32px;
    font-size: 16px;
`

const ClipInventory = () => {
    const [sales, currentClips] = useGameStore(
        (state) => [state.paperclipsSold, state.paperclips],
        shallow
    )
    const [clips, setClips] = useState<number[]>([])

    useEffect(() => {
        const newClips = [Date.now(), ...clips]
        setClips(newClips)
    }, [sales])

    useEffect(() => {
        // Clean up old clip "particles"
        const interval = setInterval(() => {
            setClips((clips) => clips.filter((x) => Date.now() - x < 100))
        }, 300)
        return () => clearInterval(interval)
    }, [])

    return (
        <View>
            <Box>
                <BoxText>📦</BoxText>
                <AnimatePresence>
                    {clips.map((time) => (
                        <MotiView
                            key={time}
                            from={{
                                translateY: 0,
                            }}
                            animate={{
                                translateY: -100,
                            }}
                        >
                            <Clip>📎</Clip>
                        </MotiView>
                    ))}
                </AnimatePresence>
                <Text>{numberFormatter(currentClips, 1)}</Text>
            </Box>
        </View>
    )
}

export { ClipInventory }
