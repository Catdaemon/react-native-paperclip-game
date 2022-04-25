export type upgradeType = 'autoClipper' | 'marketResearch' | 'wireBuyer'
export interface upgrade {
    label: string
    description: string
    price: number
}

interface upgradeList {
    [key: string]: upgrade
}

export const upgradeList: upgradeList = {
    marketResearch: {
        label: 'Market Analyser',
        description:
            'Lets you know how much demand there is for your products.',
        price: 50,
    },
    autoClipper: {
        label: 'Clip Machine',
        description: 'Automatically manufactures paperclips from wire.',
        price: 100,
    },
    wireBuyer: {
        label: 'Wire Buyer',
        description: 'Automatically buys wire when you run out.',
        price: 200,
    },
}
