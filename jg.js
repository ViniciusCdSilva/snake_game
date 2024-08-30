const canvas = document.querySelector ("canvas")
const ctx = canvas.getContext ("2d")

const size = 30

const snake = [
      { x: 270, y: 240 },
     { x: 300, y: 240 },
      { x: 330, y: 240 }
   
    
]

const randomNumber = ( min, max) =>{
     return Math.random (Math.random() * (max - min) + min)


}

const randomPosition = () => {
     const number = randomNumber(0, canvas.width - size)
     return Match.round(number / 30) * 30
}

 const randomColor = () => {
     const red = randomNumber( 0, 255)
     const green = randomNumber( 0, 255)
     const blue = randomNumber( 0, 255)

     return 'Rgb(${red} ,${green}, ${blue})'
    
 }

const food = {
    x: randomPosition(),
    y: randomPosition(),
    color: randomColor() 
}
let direction , loopId

const drawFood =() => {

    const { x,y,color} = food

     ctx.shadowColor = color
     ctx.shadowBlur = 6
     ctx.fillStyle = color
     ctx.fillRect( x, y,size, size)

}



const drawSnake = () => {
    ctx.fillstyle="#ddd"

    snake.forEach((position , index)=>{
        if(index == snake.length -1){
            ctx.fillStyle = "white"
        }
        ctx.fillRect ( position.x,position.y , size,size)
    })
   

}

const moveSnake = () => {
    if(!direction) return

    const head = snake[snake.length -1]
    
    if(direction == "right"){
        snake.push({ x: head.x + size,y:head.y })
   }
   if(direction == "left"){
    snake.push({ x: head.x - size,y:head.y })
}
if(direction == "down"){
    snake.push({ x: head.x, y:head.y + size })}
   
    if(direction == "up"){
        snake.push({ x: head.x, y:head.y - size })}

    snake.shift()
}

const drawGrid = () => {
    ctx.lineWidth = 1
    ctx.strokeStyle = "#191919"

  for(let i = 30; i < canvas.width; i += 30 ){
    ctx.beginPath()
    ctx.lineTo(i,0)
    ctx.arc(i,600)
    ctx.stroke()

    ctx.beginPath()
    ctx.lineTo(0, i)
    ctx.arc(600 ,i)
    ctx.stroke()
  }
}

const cheackEat = () => {
    const head = snake[snake.length - 1]
    
    if(head.x == food.x && head.y == food.y){
        snake.push(head)

      let x =randomPosition()
       let y =randomPosition()
      
       while(snake.find((position)=>position.x == x && position.y == y)){
         x =randomPosition()
         y =randomPosition()

       }
       food.x = x 
       food.y = y
       food.color = randomColor()
        
    
    }
}

const checkCollision = () =>{
      const head = snake[ snake.length - 1]
      const canvasLimit = canvas.width - size
       const neckIndex = snake.length -2  
      const wallColision = head.x < 0 || head.x > canvasLimit|| head.y < 0 || head.y > canvasLimit

      const selfCollision = snake.find((position, index) => {
         return position.x == head.x && positioon.y == head.y

      })
         
      if(wallColision){
      alert(" Você perdeu ")}
      
}

const gameLoop = () => {
    clearInterval(loopId)

    ctx.clearRect(0,0,600,600)
    drawGrid()
    drawFood()
    moveSnake()
    drawSnake()
    cheackEat()
    checkCollision()


    loopId = setTimeout(() =>{
        gameLoop()
    },300)
}

gameLoop()

document.addEventListener("keydown",({key}) => {
    if( key == "ArrowRight" && direction != "left"){
        direction ="right"
    }
    if(key =="ArrowLeft" && direction != "right"){
        direction="left"
    }
    if( key == "ArrowDown" && direction != "up"){
        direction ="down"
    }
    if(key =="ArrowUp" && direction != "down"){
        direction="up"
    }
})
