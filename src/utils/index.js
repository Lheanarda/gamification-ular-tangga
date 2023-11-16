import { canvas } from "../canvas"

export function getRandomValueFromArray(array){
    const random = Math.floor(Math.random()*array.length)
    return array[random]
}
export function randomIntFromInterval(min, max) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min)
}

export function getCenterXandY(){
    return{
        x:canvas.width/2,
        y:canvas.height/2
    }
}