import React, { useEffect, useRef } from 'react'
import { Easing, Animated, ViewStyle, View } from 'react-native'
import styled from 'styled-components/native'
import { BodyText } from '../../../components/Typography'
import { useGameStore } from '../../../store/GameStore'

const DemandRow = styled.View`
    flex-direction: row;
    overflow: hidden;
    align-items: center;
`

const BarContainer = styled.View`
    flex: 1;
    margin: 8px 0 8px 8px;
    background: white;
    border-radius: 4px;
    border: 2px solid black;
    height: 32px;
`

const DemandStyle: ViewStyle = {
    height: '100%',
    backgroundColor: 'green',
}

const Icon = styled.Text`
    margin: 8px 8px;
    font-size: 32px;
`

const DemandIndicator = () => {
    const demand = Math.max(
        0,
        useGameStore((state) => state.demand)
    )
    const widthAnim = useRef(new Animated.Value(0)).current

    useEffect(() => {
        Animated.timing(widthAnim, {
            toValue: demand,
            duration: 500,
            easing: Easing.ease,
            useNativeDriver: false,
        }).start()
    }, [demand])

    return (
        <View>
            <BodyText center>Consumer Demand</BodyText>
            <DemandRow>
                <Icon>🫤</Icon>
                <BarContainer>
                    <Animated.View
                        style={[
                            DemandStyle,
                            ,
                            {
                                width: widthAnim.interpolate({
                                    inputRange: [0, 1],
                                    outputRange: ['0%', '100%'],
                                }),
                            },
                        ]}
                    />
                </BarContainer>
                <Icon>🤑</Icon>
            </DemandRow>
        </View>
    )
}

export { DemandIndicator }
