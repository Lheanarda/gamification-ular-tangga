import { ctx } from "../canvas"
import { SIZE_DEFAULT } from "../constants"

class Block{
    constructor({x,y,size=SIZE_DEFAULT}){
        this.size = size
        this.x = x 
        this.y = y
    }

    draw(){
        ctx.fillStyle = '#fce7f3'
        ctx.strokeStyle = '#9f1239'
        ctx.fillRect(this.x, this.y, this.size, this.size)
        ctx.strokeRect(this.x, this.y, this.size, this.size)

        const {x,y} = this.getCenter()
        ctx.fillStyle = 'magenta'
        ctx.fillRect(x,y,1,1)
    }

    getCenter(){
        return{
            x:this.x + (this.size / 2),
            y:this.y + (this.size /2)
        }
    }
}

export default Block