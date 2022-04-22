// https://stackoverflow.com/questions/9461621/format-a-number-as-2-5k-if-a-thousand-or-more-otherwise-900
export function numberFormatter(num: number, digits: number) {
    const lookup = [
        { value: 1, symbol: '' },
        { value: 1e3, symbol: 'k' },
        { value: 1e6, symbol: 'M' },
        { value: 1e9, symbol: 'G' },
        { value: 1e12, symbol: 'T' },
        { value: 1e15, symbol: 'P' },
        { value: 1e18, symbol: 'E' },
    ]
    const rx = /\.0+$|(\.[0-9]*[1-9])0+$/
    var item = lookup
        .slice()
        .reverse()
        .find(function (item) {
            return num >= item.value
        })
    return item
        ? (num / item.value).toFixed(digits).replace(rx, '$1') + item.symbol
        : '0'
}

export function lengthFormatter(num: number, digits: number) {
    const lookup = [
        { value: 1, symbol: 'cm' },
        { value: 1e3, symbol: 'm' },
        { value: 1e6, symbol: 'km' },
        { value: 1e9, symbol: 'gm' },
        { value: 1e12, symbol: 'tm' },
        { value: 1e15, symbol: 'pm' },
        { value: 1e18, symbol: 'em' },
    ]
    const rx = /\.0+$|(\.[0-9]*[1-9])0+$/
    var item = lookup
        .slice()
        .reverse()
        .find(function (item) {
            return num >= item.value
        })
    return item
        ? (num / item.value).toFixed(digits).replace(rx, '$1') + item.symbol
        : '0'
}
