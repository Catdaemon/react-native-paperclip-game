import React, { useMemo } from 'react'
import { MotiPressable } from 'moti/interactions'
import styled from 'styled-components/native'
import { BodyText } from './Typography'

export interface ButtonProps {
    onPress: () => void
    text: string
}

export interface ButtonStyleProps {
    primary?: boolean
}

const ButtonBox = styled.View<ButtonStyleProps>`
    border-radius: 8px;
    border: 2px solid black;
    padding: 12px;
    background-color: ${(props) => (props.primary ? 'white' : 'transparent')};
    margin-bottom: 8px;
`

const ButtonText = styled(BodyText)`
    color: black;
    text-align: center;
    font-size: 18px;
`

export function Button({
    onPress,
    text,
    primary,
}: ButtonProps & ButtonStyleProps) {
    return (
        <MotiPressable
            onPress={onPress}
            animate={useMemo(
                () =>
                    ({ hovered, pressed }) => {
                        'worklet'

                        return {
                            opacity: hovered || pressed ? 0.5 : 1,
                        }
                    },
                []
            )}
        >
            <ButtonBox primary={primary}>
                <ButtonText>{text}</ButtonText>
            </ButtonBox>
        </MotiPressable>
    )
}
