import { AnimatePresence, MotiView } from 'moti'
import React, { ReactNode, useState } from 'react'
import { Keyboard, KeyboardAvoidingView } from 'react-native'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler'
import { SafeAreaView } from 'react-native-safe-area-context'
import styled from 'styled-components/native'
import { Button } from '../components/Button'
import { ButtonStrip } from '../components/ButtonStrip'
import { TextInput } from '../components/TextInput'
import { Header1, Header2, Header3 } from '../components/Typography'
import { useGameStore } from '../store/GameStore'

const Slide = styled.View`
    padding: 16px;
    height: 100%;
    width: 100%;
    justify-content: center;
    align-items: center;
`

function AnimatedSlide({
    children,
    index,
}: {
    children: ReactNode
    index: number
}) {
    return (
        <MotiView
            key={index}
            from={{
                opacity: 0,
                translateX: 100,
            }}
            animate={{
                opacity: 1,
                translateX: 0,
            }}
            exit={{
                opacity: 0,
                translateX: -100,
            }}
        >
            {children}
        </MotiView>
    )
}

export function IntroScreen() {
    const [slide, setSlide] = useState(0)
    const [name, setName] = useState('')
    const startGame = useGameStore((state) => state.startGame)

    const advance = () => {
        setSlide(slide + 1)
    }

    const slides = [
        <>
            <Header1 center>Paperclips are great! 📎</Header1>
            <Button primary text={'Sure, I guess.'} onPress={() => advance()} />
        </>,
        <>
            <Header1>But what if there were more?</Header1>
            <Button primary text={'err... 🤔'} onPress={() => advance()} />
        </>,
        <>
            <Header1>🖇 So many more. And we sold them. 📎</Header1>
            <Button
                primary
                text={'I think I see where this is going 👀'}
                onPress={() => advance()}
            />
        </>,
        <>
            <Header1>Let's start making Paperclips!</Header1>
            <ButtonStrip>
                <Button
                    primary
                    text={'I prefer broccoli 🥦'}
                    onPress={() => advance()}
                />
                <Button
                    primary
                    text={"Let's go! 📎"}
                    onPress={() => setSlide(slides.length - 1)}
                />
            </ButtonStrip>
        </>,
        <>
            <Header1>
                Broccoli is objectively bad for mass production and storage.
            </Header1>
            <Button primary text={'I repent.'} onPress={() => setSlide(0)} />
        </>,
        <>
            <Header1>What shall we call your business?</Header1>
            <TextInput
                defaultValue=""
                onChangeText={(val) => setName(val)}
                label="Business Name"
                placeholder="Enter a name here"
            />
            {name.length > 3 && (
                <Button
                    primary
                    text={'Start 🏭'}
                    onPress={() => startGame(name)}
                />
            )}
        </>,
    ]

    return (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <SafeAreaView>
                <Slide>
                    <KeyboardAvoidingView behavior="position">
                        <AnimatedSlide index={slide} key={slide}>
                            {slides[slide]}
                        </AnimatedSlide>
                    </KeyboardAvoidingView>
                </Slide>
            </SafeAreaView>
        </TouchableWithoutFeedback>
    )
}
