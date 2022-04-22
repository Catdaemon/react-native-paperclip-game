import create from 'zustand'
import { persist } from 'zustand/middleware'
import AsyncStorage from '@react-native-async-storage/async-storage'

export interface HistorySnapshot {
    time: Date
    money: number
    paperclips: number
    price: number
    wirePrice: number
}

export interface GameState {
    paperclips: number
    totalPaperclips: number
    paperclipsSold: number
    money: number
    price: number
    demand: number
    wireLength: number
    history: HistorySnapshot[]
    skipIntro: boolean
    businessName: string
    wirePrice: number
    addPaperclips: (number: number) => void
    addMoney: (amount: number) => void
    addHistoryEvent: () => void
    addWire: (length: number) => void
    setWirePrice: (amount: number) => void
    setPrice: (newPrice: number) => void
    setDemand: (newDemand: number) => void
    startGame: (businessName: string) => void
    recordSale: (number: number) => void
    resetGame: () => void
}

export const defaultState = {
    skipIntro: false,
    businessName: '',
    paperclips: 0,
    totalPaperclips: 0,
    paperclipsSold: 0,
    wireLength: 1000,
    money: 0,
    price: 0.05,
    history: [],
    wirePrice: 10,
    demand: 0,
}

export const useGameStore = create(
    persist<GameState>(
        (set, get) => ({
            ...defaultState,

            resetGame: () => set(defaultState),

            addPaperclips: (number: number) => {
                if (number > 0) {
                    set({ totalPaperclips: get().totalPaperclips + number })
                }
                set({ paperclips: get().paperclips + number })
            },
            recordSale: (number) =>
                set({ paperclipsSold: get().paperclipsSold + number }),
            addMoney: (amount) => set({ money: get().money + amount }),
            setPrice: (newPrice) => set({ price: newPrice }),
            setWirePrice: (newPrice) => set({ wirePrice: newPrice }),
            setDemand: (newDemand) => set({ demand: newDemand }),
            addWire: (amount) => set({ wireLength: get().wireLength + amount }),
            addHistoryEvent: () => {
                const current = get()
                const newEvent = {
                    money: current.money,
                    paperclips: current.paperclips,
                    price: current.price,
                    wirePrice: current.wirePrice,
                    time: new Date(),
                } as HistorySnapshot
                const history = current.history
                history.push(newEvent)
                if (history.length > 100) {
                    // Limit history to 100 items
                    history.shift()
                }
                set({ history: history })
            },
            startGame: (businessName) => {
                set({ skipIntro: true, businessName: businessName })
            },
        }),
        {
            name: 'game-store',
            getStorage: () => AsyncStorage,
        }
    )
)
