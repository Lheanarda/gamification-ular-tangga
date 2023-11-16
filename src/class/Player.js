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

        this.vx = 0
        this.vy = 0

        this.currentBottomCollision = y + this.height
        this.currentRightCollision = x + this.width
        this.currentLeftCollision = x  - SIZE_DEFAULT

        this.gravityX = 'right'

        this.debug = false

        //image player
        this.image = new Image()
        this.image.src = './images/cetdoggo.webp'
        
        window.addEventListener('keyup',(e)=>{
            if(e.key==='d')this.moveRight()
            if(e.key==='a')this.moveLeft()
            if(e.key==='w')this.moveUp()
            if(e.key==='s') this.moveDown()
            if(e.key==='z') this.debug = !this.debug
        })

        this.intervals = []
        this.totalMoved = 1
        window.addEventListener('click',()=>{
            const random = Math.floor(Math.random() * 3+1)
            // const random = 1
            
            console.log("=========> roll dice", random)
            //clear interval 
            for(let i = 0; i > this.intervals; i++){
                window.clearInterval(this.intervals[i])
            }
            
            //star interval
            let countTotalDiceMove = 0
            const interval = setInterval(()=>{
                if(countTotalDiceMove >= random) return 

                if(this.totalMoved % TOTAL_COLUMNS === 0 ) this.moveUp()
                else if (this.totalMoved > TOTAL_COLUMNS ) this.moveLeft()
                else this.moveRight()

                this.totalMoved++
                countTotalDiceMove ++
            },300)

            this.intervals.push(interval)
        })
    }
    draw(){
        ctx.fillStyle = '#f43f5e'
        ctx.fillRect(this.x, this.y, this.width, this.height)
        // ctx.drawImage(this.image, this.x, this.y, this.width, this.height)

        if(this.debug){
            //debug 
            ctx.fillStyle = 'black'
            //left
            ctx.fillRect(this.currentLeftCollision, this.currentBottomCollision,4,4)
            //right 
            ctx.fillRect(this.currentRightCollision, this.currentBottomCollision,4,4)
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

    moveRight(){
        if(this.x !== this.currentLeftCollision){
            this.currentRightCollision = this.currentRightCollision + SIZE_DEFAULT
            this.currentLeftCollision = this.currentLeftCollision + SIZE_DEFAULT
        }
        this.vy = -2.8
        this.gravityX = 'right'
    }

    moveLeft(){
        if(this.x === this.currentLeftCollision){
            this.currentLeftCollision = this.currentLeftCollision - SIZE_DEFAULT
            this.currentRightCollision = this.currentRightCollision - SIZE_DEFAULT
        }
        this.gravityX = 'left'
        this.vy = -2.8
    }

    moveUp(){
        this.vy = -6
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

}

export default Player