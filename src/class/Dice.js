import { ctx } from "../canvas"
import { SIZE_DEFAULT } from "../constants"

class Dice{
    constructor({x, y}){
        this.x = x 
        this.y = y
        this.size = 1.5*SIZE_DEFAULT
        this.rotation =1
    }

    draw(){
        ctx.fillStyle = 'blue'
        ctx.fillRect(this.x, this.y, this.size, this.size)
    }

    update(){
        ctx.save()
        this.draw()
        ctx.rotate(this.rotation)
        this.rotation += 10
        ctx.restore()
    }
}

export default Dice