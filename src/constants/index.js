import { canvas } from "../canvas"

export const TOTAL_COLUMNS = 10
export const TOTAL_ROWS = 10
export const SIZE_DEFAULT = canvas.width / 10


export const BLOCK_ACTION = [
    {
        boardIndex:4,
        type:'up',
        boardIndexDestination:25
    },
    {
        boardIndex:27,
        type:'down',
        boardIndexDestination:5
    }
]