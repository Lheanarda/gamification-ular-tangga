import { canvas, ctx } from "./canvas"
import Block from "./class/Block"
import Player from "./class/Player"
import { SIZE_DEFAULT, TOTAL_COLUMNS, TOTAL_ROWS } from "./constants"
import { getCenterXandY } from "./utils"



const {x,y} = getCenterXandY()

const startX = x - Math.floor(TOTAL_ROWS / 2) * SIZE_DEFAULT
const startY = y - Math.floor(TOTAL_COLUMNS / 2) * SIZE_DEFAULT

const blocks = []

for(let i = 0;i < TOTAL_ROWS; i++){
    for(let j=0; j< TOTAL_COLUMNS; j++){
        blocks.push(new Block({
            x:startX + (j*SIZE_DEFAULT),
            y:startY + (i*SIZE_DEFAULT)
        }))
    }
}

const player = new Player({ blocks})



function animate(){
    requestAnimationFrame(animate)
    ctx.clearRect(0,0,canvas.width, canvas.height)
    blocks.forEach(b=>b.draw())
    player.update()
}

animate()

