import styled from 'styled-components/native'

export interface TextProps {
    center?: boolean
}

export const Header1 = styled.Text<TextProps>`
    font-family: Helvetica;
    font-size: 64px;
    font-weight: 600;
    margin: 16px 0;
    text-align: ${(props) => (props.center ? 'center' : 'left')};
`
export const Header2 = styled(Header1)`
    font-size: 24px;
    font-weight: 600;
`

export const Header3 = styled(Header1)`
    font-size: 18px;
    font-weight: 400;
`

export const BodyText = styled.Text<TextProps>`
    font-family: Helvetica;
    font-size: 16px;
    text-align: ${(props) => (props.center ? 'center' : 'left')};
`

export const IconOverlayText = styled(BodyText)`
    font-size: 24px;
    text-align: center;
    color: white;
    text-shadow: 0px 0px 4px black;
`
