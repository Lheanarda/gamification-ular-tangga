import { canvas, ctx } from "./canvas"
import Block from "./class/Block"
import Board from "./class/Board"
import Dice from "./class/Dice"
import Player from "./class/Player"
import { BLOCK_ACTION, SIZE_DEFAULT, TOTAL_COLUMNS, TOTAL_ROWS } from "./constants"
import { getCenterXandY } from "./utils"

const {x,y} = getCenterXandY()

// const startX = x - Math.floor(TOTAL_COLUMNS / 2) * SIZE_DEFAULT
// const startY = y - Math.floor(TOTAL_ROWS / 2) * SIZE_DEFAULT - 75

const startX = 0
const startY = 0

// const startY = startX

const blocks = []
let number = TOTAL_ROWS * TOTAL_COLUMNS
let isDesc = true

for(let i = 0;i < TOTAL_ROWS; i++){
    for(let j=0; j< TOTAL_COLUMNS; j++){
        let direction = isDesc ? 'left' : "right"
        if(number % TOTAL_COLUMNS===0) direction  = "up"
        const foundSpecial = BLOCK_ACTION.find(b=>b.boardIndex===number)
        blocks.push(new Block({
            x:startX + (j*SIZE_DEFAULT),
            y:startY + (i*SIZE_DEFAULT),
            boardIndex: number,
            direction,
            action:foundSpecial
        }))
        if(isDesc) number --
        else number++
    }
    if(isDesc) number -= TOTAL_COLUMNS - 1
    else number -= TOTAL_COLUMNS + 1
    isDesc =  !isDesc
}

const player = new Player({ blocks})

const dice = new Dice({x:startX + 50, y:canvas.height - 100, player})


const board = new Board({
    x:startX,
    y:startY,
    height:canvas.width,
    width:canvas.width
})


var lastCalledTime, delta;
var fps;
const fpsEl = document.getElementById('fps')
const frameRate = 100
let calledFrame = 0

function animate(){
    requestAnimationFrame(animate)
    ctx.clearRect(0,0,canvas.width, canvas.height)
    board.draw()
    blocks.forEach(b=>b.draw())
    player.update()
    dice.update()

    //frame rate
    if(!lastCalledTime) {
        lastCalledTime = Date.now();
        fps = 0;
        return;
     }
     delta = (performance.now() - lastCalledTime)/1000;
     lastCalledTime = performance.now();
     fps = 1/delta;
   
    
     if(calledFrame % frameRate===0){
        if(fps > 0)  fpsEl.textContent = `${Math.floor(fps)} fps`
     } 
     calledFrame++ 
}

animate()

