import { canvas, ctx } from "../canvas"
import { GRAVITY } from "../constants"

class Particle{
    constructor({x, y, radius, color}){
        this.x = x 
        this.y = y
        this.velocity = {
            x: Math.random()*6-3,
            y: Math.random()*6-3
        }
        this.radius = radius
        this.color = color
    }

    draw(){
        ctx.beginPath()
        ctx.fillStyle = this.color
        ctx.arc(this.x, this.y, this.radius, 0 , 2*Math.PI)
        ctx.fill()
        ctx.closePath()
    }

    update(){
        if(this.x + this.radius >= canvas.width || this.x - this.radius <= 0) {
            this.velocity.x = -this.velocity.x
        }

        if(this.y + this.radius >= canvas.height || this.y - this.radius <= 0){
            this.velocity.y = -this.velocity.y
        }
        this.x += this.velocity.x
        this.y += this.velocity.y
        this.draw()
    }
}

export default Particle