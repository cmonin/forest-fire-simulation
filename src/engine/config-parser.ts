import type {ForestState} from "@/types/forest-state";
import type {TreeState} from "@/types/tree-state";

export function parseFile(text: string): {forestState: ForestState, burnProbability: number} {
    const textRows: string[] = text.split('\n')
    if (textRows[0].charAt(0) === '0') {
        return parseTextToForestState(textRows)
    }
    return parsePropertiesToForestState(textRows)
}
function parseTextToForestState(textRows: string[]): {forestState: ForestState, burnProbability: number} {
    const burnProbability: number = parseFloat(textRows.shift())
    const forestState: ForestState = [];
    textRows.forEach((textRow: string) => {
        const states: TreeState[] = textRow
            .replace(' ', '')
            .split('')
            .map((char: string) => parseInt(char))
        forestState.push(states);
    })
    return {forestState, burnProbability}
}

function parsePropertiesToForestState(propertiesRows: string[]): {forestState: ForestState, burnProbability: number} {
    const forestState: ForestState = []
    let burnProbability: number
    let width: number
    let height: number
    let burning: string[]

    propertiesRows.forEach((propertyRow: string) => {
        const [left, right] = propertyRow.replace(' ', '').split('=')
        switch (left) {
            case 'width':
                width = parseInt(right)
                break
            case 'height':
                height = parseInt(right)
                break
            case 'burning':
                burning = right.split(',')
                break
            case 'probability':
                burnProbability = parseFloat(right)
            default:
                break
        }
    })

    for (let i = 0; i < height; i++) {
        forestState.push([])
        for (let j = 0; j < width; j++) {
            forestState[i].push(0)
        }
    }
    burning.forEach((burningTree: string) => {
        const [xstr, ystr] = burningTree.split(';')
        const x: number = parseInt(xstr)
        const y: number = parseInt(ystr)
        forestState[x][y] = 1
    })

    return {forestState, burnProbability};
}