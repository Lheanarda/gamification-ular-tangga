import { canvas, ctx } from "./canvas"
import Block from "./class/Block"
import Dice from "./class/Dice"
import Player from "./class/Player"
import { SIZE_DEFAULT, TOTAL_COLUMNS, TOTAL_ROWS } from "./constants"
import { getCenterXandY } from "./utils"

const {x,y} = getCenterXandY()

const startX = x - Math.floor(TOTAL_COLUMNS / 2) * SIZE_DEFAULT
const startY = y - Math.floor(TOTAL_ROWS / 2) * SIZE_DEFAULT - 75
// const startY = startX

const blocks = []
let number = TOTAL_ROWS * TOTAL_COLUMNS
let isDesc = true

for(let i = 0;i < TOTAL_ROWS; i++){
    for(let j=0; j< TOTAL_COLUMNS; j++){

        let direction = isDesc ? 'left' : "right"
        if(number % TOTAL_COLUMNS===0) direction  = "up"
        blocks.push(new Block({
            x:startX + (j*SIZE_DEFAULT),
            y:startY + (i*SIZE_DEFAULT),
            boardIndex: number,
            direction
        }))
        if(isDesc) number --
        else number++
    }
    if(isDesc) number -= TOTAL_COLUMNS - 1
    else number -= TOTAL_COLUMNS + 1
    isDesc =  !isDesc
    
}

const player = new Player({ blocks})

const dice = new Dice({x:startX, y:canvas.height - 100, player})



function animate(){
    requestAnimationFrame(animate)
    ctx.clearRect(0,0,canvas.width, canvas.height)
    blocks.forEach(b=>b.draw())
    player.update()
    dice.update()
}

animate()

