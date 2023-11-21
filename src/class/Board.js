import { ctx } from "../canvas"

class Board{
    constructor({x, y, width, height}){
        this.imageSrc = '/images/board.jpg'
        this.image = new Image()
        this.image.src = this.imageSrc

        this.x = x 
        this.y = y 
        this.width = width
        this.height = height
    }

    draw(){
        ctx.drawImage(this.image,this.x, this.y, this.width, this.height)
    }
}

export default Board