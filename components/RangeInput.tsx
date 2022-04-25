import Slider from '@react-native-community/slider'
import React from 'react'
import styled from 'styled-components/native'
import { BodyText } from './Typography'

export interface RangeInputProps {
    onChange: (newValue: number) => void
    value: number
    label: string
    min: number
    max: number
}

const Container = styled.View`
    padding: 12px;
    background-color: white;
    border-radius: 4px;
    margin-bottom: 8px;
`

const Label = styled(BodyText)`
    color: black;
    text-align: center;
    font-size: 18px;
`

export function RangeInput({
    value,
    onChange,
    label,
    min,
    max,
}: RangeInputProps) {
    return (
        <Container>
            <Label>{label}</Label>
            <Slider
                value={value}
                minimumValue={min}
                maximumValue={max}
                onValueChange={(val) => onChange(val)}
            />
        </Container>
    )
}
