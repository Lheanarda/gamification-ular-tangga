import { ctx } from "../canvas"
import { SIZE_DEFAULT, TOTAL_COLUMNS, TOTAL_ROWS } from "../constants"

// const JUMP = -4 // -2.8
// const JUMP_UP = -7 // -6

const JUMP = -2.8 // -2.8
const JUMP_UP = -6 // -6
class Player{
    constructor({ blocks}){
        this.width = SIZE_DEFAULT * 1.2 // 0.8
        this.height = SIZE_DEFAULT * 1.2
        this.blocks = blocks
        const initialBlockIndex = TOTAL_COLUMNS*(TOTAL_ROWS - 1)

        const {x, y} = this.anchorCenterPositionInBlock(this.blocks[initialBlockIndex])
        this.x = x 
        this.y = y

        this.vx = 0
        this.vy = 0

        this.currentBottomCollision = y + this.height
        this.currentRightCollision = x + this.width
        this.currentLeftCollision = x  - SIZE_DEFAULT

        this.gravityX = 'right'

        this.debug = false

        //image player
        this.image = new Image()
        this.image.src = './images/mario.png'
        this.intervals = []

        window.addEventListener('keyup',(e)=>{
            if(e.key==='d')this.moveRight()
            if(e.key==='a')this.moveLeft()
            if(e.key==='w')this.moveUp()
            if(e.key==='s') this.moveDown()
            if(e.key==='z') this.debug = !this.debug
            if(e.key==='m') this.move(3)
        })
    }
    draw(){
        // ctx.fillStyle = '#f43f5e'
        // ctx.fillRect(this.x, this.y, this.width, this.height)
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height)

        if(this.debug){
            //debug 
            ctx.fillStyle = 'black'
            //left
            ctx.fillRect(this.currentLeftCollision, this.currentBottomCollision,4,4)
            //right 
            ctx.fillRect(this.currentRightCollision - 4, this.currentBottomCollision,4,4)
        }
    }


    update(){
        this.draw()
        
        if(this.gravityX==='right')this.vx += this.width * 0.012
        else if(this.gravityX==='left')this.vx -= this.width * 0.012

        this.vy += this.height * 0.01

        this.y += this.vy
        this.x += this.vx

        if(this.y + this.height >= this.currentBottomCollision && this.vy >= 0  ){
            this.y = this.currentBottomCollision - this.height
            this.vy = 0
        }

        if(this.x <= this.currentLeftCollision){
            this.x = this.currentLeftCollision
            this.vx = 0
        }

        if(this.x  > this.currentRightCollision - this.width){
            this.x = this.currentRightCollision - this.width
            this.vx = 0
        }
    }

    move(totalMove){
        //clear interval 
        for(let i = 0; i > this.intervals; i++){
            window.clearInterval(this.intervals[i])
        }
        
        //star interval
        let countTotalDiceMove = 0
        const interval = setInterval(()=>{
            if(countTotalDiceMove >= totalMove) return 
            const currentBlock = this.getCurrentBlock()
            if(currentBlock){
                if(currentBlock.direction === 'up') this.moveUp()
                else if (currentBlock.direction==='right') this.moveRight()
                else if (currentBlock.direction==='left') this.moveLeft()
                countTotalDiceMove++
            }
            
        },300)

        this.intervals.push(interval)
    }

    moveRight(){
        if(this.x !== this.currentLeftCollision){
            this.currentRightCollision = this.currentRightCollision + SIZE_DEFAULT
            this.currentLeftCollision = this.currentLeftCollision + SIZE_DEFAULT
        }
        this.vy = JUMP
        this.gravityX = 'right'
    }

    moveLeft(){
        if(this.x === this.currentLeftCollision){
            this.currentLeftCollision = this.currentLeftCollision - SIZE_DEFAULT
            this.currentRightCollision = this.currentRightCollision - SIZE_DEFAULT
        }
        this.gravityX = 'left'
        this.vy = JUMP
    }

    moveUp(){
        this.vy = JUMP_UP
        this.currentBottomCollision -= SIZE_DEFAULT
    }
    moveDown(){
        this.currentBottomCollision += SIZE_DEFAULT
    }

    anchorCenterPositionInBlock(block){
        const {x:newX, y:newY} = block.getCenter()
        return{
            x : newX - this.width /2,
            y : newY - this.height / 2
        }
    }

    getCurrentBlock(){
        let currentBlock
        for(let i = 0; i<this.blocks.length; i++){
            const {x, y} = this.anchorCenterPositionInBlock(this.blocks[i])
            if(this.x === x && this.y === y){
                currentBlock = this.blocks[i]
                break
            }
        }

        return currentBlock
    }

}

export default Player