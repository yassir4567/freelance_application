

export const trimText = (text) => {
    return text.trim()
}

export const emptyText = (text) => {
    return trimText(text) === '' ;
}

export const emptyArray = (array) => {
    return array.length === 0
}