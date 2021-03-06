import { useEffect, useRef } from 'react'
import { useGameStore } from '../store/GameStore'
import shallow from 'zustand/shallow'

export function useGameTick() {
    const [
        addMoney,
        addPaperclips,
        recordSale,
        setWirePrice,
        addHistoryEvent,
        setDemand,
    ] = useGameStore(
        (state) => [
            state.addMoney,
            state.addPaperclips,
            state.recordSale,
            state.setWirePrice,
            state.addHistoryEvent,
            state.setDemand,
        ],
        shallow
    )

    const interval = useRef<ReturnType<typeof setInterval> | null>(null)
    const lastHistoryTime = useRef(0)
    const lastAutoWireTime = useRef(0)
    const lastWirePriceTick = useRef(0)

    // If the current demand is less than 1 unit, we should store the fractions up until one can be sold
    const pentDemand = useRef(0)

    // Sell one paperclip
    const sell = (price: number) => {
        addMoney(price)
        addPaperclips(-1)
        recordSale(1)
    }

    // Runs each "frame"
    const tick = () => {
        const state = useGameStore.getState()

        const currentPrice = state.price
        const popularity = 1 + state.popularity

        const popularityFactor = currentPrice / popularity // The higher the popularity, the lower the impact of price

        const demand = Math.round(100 - popularityFactor * 400) / 100 // Scale the demand based on popularity and price
        setDemand(demand)

        if (demand > 0) {
            pentDemand.current = pentDemand.current + demand
        }
        // Loop here so that high demand will be solved without requiring multiple ticks
        while (pentDemand.current > 1) {
            const currentClips = useGameStore.getState().paperclips
            pentDemand.current -= 1

            if (currentClips > 0) {
                sell(currentPrice)
            }
        }

        // Wire price
        const minWirePrice = 5
        const wirePrice = state.wirePrice
        if (wirePrice < minWirePrice) {
            setWirePrice(minWirePrice)
        }

        // Faster interval and decline when we're in a dead state
        const dead = state.wireLength == 0 && state.paperclips === 0
        const declineAmount = dead ? 0.05 : 0.01
        const wirePriceInterval = dead ? 0 : 500

        // Decrease wire price over time
        if (lastWirePriceTick.current + wirePriceInterval < Date.now()) {
            lastWirePriceTick.current = Date.now()
            if (wirePrice > minWirePrice) {
                setWirePrice(
                    Math.round((wirePrice - declineAmount) * 100) / 100
                )
            }
        }

        // History
        const historyInterval = 5000
        if (lastHistoryTime.current + historyInterval < Date.now()) {
            lastHistoryTime.current = Date.now()
            addHistoryEvent()
        }

        // Auto Clipper
        const autoInterval = 500 / state.autoClippers
        if (
            state.upgrades.includes('autoClipper') &&
            lastAutoWireTime.current + autoInterval < Date.now()
        ) {
            lastAutoWireTime.current = Date.now()
            state.makeClip()
        }

        // Auto buyer
        if (state.wireLength <= 0 && state.upgrades.includes('wireBuyer')) {
            if (state.wirePrice <= state.maxAutoBuyPrice) {
                state.buyWire()
            }
        }
    }

    useEffect(() => {
        interval.current = setInterval(tick, 100)

        return () =>
            interval.current ? clearInterval(interval.current) : undefined
    }, [])
}
