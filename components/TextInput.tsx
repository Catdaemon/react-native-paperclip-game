import React, { useMemo } from 'react'
import { MotiPressable } from 'moti/interactions'
import styled from 'styled-components/native'
import { BodyText } from './Typography'
import { TextInputProps } from 'react-native'

const Container = styled.View`
    width: 100%;
    flex-direction: column;
    padding: 16px 0;
`

const TextBox = styled.TextInput`
    border-radius: 8px;
    border: 2px solid black;
    padding: 18px;
    background-color: white;
    color: black;
    font-size: 18px;
`

const Label = styled(BodyText)`
    color: black;
    margin-bottom: 16px;
`

export function TextInput({
    label,
    ...props
}: TextInputProps & { label?: string }) {
    return (
        <Container>
            {label && <Label>{label}</Label>}
            <TextBox {...props} />
        </Container>
    )
}
