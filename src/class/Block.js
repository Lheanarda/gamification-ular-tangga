import { ctx } from "../canvas"
import { SIZE_DEFAULT } from "../constants"

class Block{
    constructor({x,y,size=SIZE_DEFAULT, boardIndex, direction}){
        this.size = size
        this.x = x 
        this.y = y
        this.boardIndex = boardIndex
        this.direction = direction
    }

    draw(){
        ctx.lineWidth = 1
        ctx.fillStyle = 'transparent'
        ctx.fillRect(this.x, this.y, this.size, this.size)

        const {x,y} = this.getCenter()

        ctx.font = '14px Permanent Marker'
        ctx.fillStyle = '#991b1b'
        ctx.textAlign = 'center'
        ctx.textBaseline = 'middle'
        // ctx.fillText(this.boardIndex,x, y)
    }

    getCenter(){
        return{
            x:this.x + (this.size / 2),
            y:this.y + (this.size /2)
        }
    }
}

export default Block