import { ctx } from "../canvas"
import { SIZE_DEFAULT, TOTAL_COLUMNS, TOTAL_ROWS } from "../constants"

class Player{
    constructor({ blocks}){
        this.width = 25 
        this.height = 25 
        this.blocks = blocks
        const initialBlockIndex = TOTAL_COLUMNS*(TOTAL_ROWS - 1)

        const {x, y} = this.anchorCenterPositionInBlock(this.blocks[initialBlockIndex])
        this.x = x 
        this.y = y

        this.vx = 1
        this.vy = 1

        this.currentBottomCollision = y
        this.currentRightCollision = x 
        this.currentLeftCollision = x - SIZE_DEFAULT 
        

        window.addEventListener('click',()=>{
            this.currentRightCollision = this.currentRightCollision + SIZE_DEFAULT
            this.currentLeftCollision = this.currentLeftCollision + SIZE_DEFAULT
            this.vy = -2.8
        })
    }
    draw(){
        ctx.fillStyle = '#f43f5e'
        ctx.fillRect(this.x, this.y, this.width, this.height)
    }
    
    update(){
        this.draw()
        this.vx += this.width * 0.012
        this.vy += this.height * 0.01

        this.y += this.vy
        this.x += this.vx

        if(this.y >= this.currentBottomCollision){
            this.y = this.currentBottomCollision
            this.vy = 0
        }

        if(this.x >= this.currentRightCollision){
            this.x = this.currentRightCollision
            this.vx = 0
        }

        if(this.x <= this.currentLeftCollision){
            this.x = this.currentLeftCollision
            this.vx = 0
        }
      
    }

    anchorCenterPositionInBlock(block){
        const {x:newX, y:newY} = block.getCenter()
        return{
            x : newX - this.width /2,
            y : newY - this.height / 2
        }
    }

}

export default Player