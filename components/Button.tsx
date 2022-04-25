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
    success?: boolean
}

const ButtonBox = styled.View<ButtonStyleProps>`
    border-radius: 8px;
    border: 2px solid black;
    padding: 12px;
    background-color: ${(props) =>
        props.primary ? 'white' : props.success ? 'green' : 'transparent'};
    margin-bottom: 8px;
`

const ButtonText = styled(BodyText)<ButtonStyleProps>`
    color: ${(props) => (props.success ? 'white' : 'black')};
    text-align: center;
    font-size: 18px;
`

export function Button({
    onPress,
    text,
    ...props
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
            <ButtonBox {...props}>
                <ButtonText {...props}>{text}</ButtonText>
            </ButtonBox>
        </MotiPressable>
    )
}
