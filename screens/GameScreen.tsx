import { FontAwesome } from '@expo/vector-icons'
import {
    BottomTabScreenProps,
    createBottomTabNavigator,
} from '@react-navigation/bottom-tabs'
import {
    CompositeScreenProps,
    NavigationContainer,
    NavigatorScreenParams,
} from '@react-navigation/native'
import {
    createNativeStackNavigator,
    NativeStackScreenProps,
} from '@react-navigation/native-stack'
import React from 'react'
import { ColorSchemeName, Pressable } from 'react-native'
import Colors from '../constants/Colors'
import useColorScheme from '../hooks/useColorScheme'
import { ProductionScreen } from './game/ProductionScreen'
import { DefaultTheme, DarkTheme } from '@react-navigation/native'
import NotFoundScreen from './NotFoundScreen'
import ModalScreen from './ModalScreen'
import { StatsScreen } from './game/StatsScreen'
import { UpgradesScreen } from './game/UpgradesScreen'

export type RootStackParamList = {
    Root: NavigatorScreenParams<RootTabParamList> | undefined
    Modal: undefined
    NotFound: undefined
}

export type RootTabParamList = {
    ProductionTab: undefined
    UpgradesTab: undefined
    StatsTab: undefined
}

export type RootTabScreenProps<Screen extends keyof RootTabParamList> =
    CompositeScreenProps<
        BottomTabScreenProps<RootTabParamList, Screen>,
        NativeStackScreenProps<RootStackParamList>
    >

const BottomTabs = createBottomTabNavigator<RootTabParamList>()

function TabBarIcon(props: {
    name: React.ComponentProps<typeof FontAwesome>['name']
    color: string
}) {
    return <FontAwesome size={30} style={{ marginBottom: -3 }} {...props} />
}

const Stack = createNativeStackNavigator<RootStackParamList>()

function RootNavigator() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Root"
                component={BottomTabNavigator}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="Modal"
                component={ModalScreen}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="NotFound"
                component={NotFoundScreen}
                options={{ title: 'Oops!' }}
            />
        </Stack.Navigator>
    )
}

function BottomTabNavigator() {
    const colorScheme = useColorScheme()

    return (
        <BottomTabs.Navigator
            initialRouteName="ProductionTab"
            screenOptions={{
                tabBarActiveTintColor: Colors[colorScheme].tint,
            }}
        >
            <BottomTabs.Screen
                name="ProductionTab"
                component={ProductionScreen}
                options={({
                    navigation,
                }: RootTabScreenProps<'ProductionTab'>) => ({
                    title: 'Production',
                    tabBarIcon: ({ color }) => (
                        <TabBarIcon name="building" color={color} />
                    ),
                    headerRight: () => (
                        <Pressable
                            onPress={() => navigation.navigate('Modal')}
                            style={({ pressed }) => ({
                                opacity: pressed ? 0.5 : 1,
                            })}
                        >
                            <FontAwesome
                                name="building"
                                size={25}
                                color={Colors[colorScheme].text}
                                style={{ marginRight: 15 }}
                            />
                        </Pressable>
                    ),
                })}
            />
            <BottomTabs.Screen
                name="UpgradesTab"
                component={UpgradesScreen}
                options={{
                    title: 'Upgrades',
                    tabBarIcon: ({ color }) => (
                        <TabBarIcon name="star" color={color} />
                    ),
                }}
            />
            <BottomTabs.Screen
                name="StatsTab"
                component={StatsScreen}
                options={{
                    title: 'Stats',
                    tabBarIcon: ({ color }) => (
                        <TabBarIcon name="line-chart" color={color} />
                    ),
                }}
            />
        </BottomTabs.Navigator>
    )
}

export function GameScreen({ colorScheme }: { colorScheme: ColorSchemeName }) {
    return (
        <NavigationContainer
            theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}
        >
            <RootNavigator />
        </NavigationContainer>
    )
}
