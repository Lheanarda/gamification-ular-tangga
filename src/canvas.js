export const canvas = document.getElementById('canvas')

export const ctx = canvas.getContext('2d')



if(window.innerWidth >= 600){
    //settings
    canvas.width = 450
    canvas.height = window.innerHeight
}
else{
    //settings
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
}
