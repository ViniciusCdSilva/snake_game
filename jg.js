const canvas = document.querySelector("canvas")
const ctx = canvas.getContext ("2d")
const score = document.querySelector(".score--value")
const finalScore= document.querySelector(".final-score > span")
const menu = document.querySelector(".menu-screen")
const buttonPlay = document.querySelector(".btn-play")
const size = 30

const initialPosition = {x: 270 , y:240 }

let snake = [initialPosition]

const incrementScore = () =>{
    score.innerText = parseInt(score.innerText) + 10
}

const randomNumber = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min
}


const randomPosition = () => {
    const number = randomNumber(0, canvas.width - size)
    return Math.round(number / size) * size
}


const randomColor = () => {
    const red = randomNumber(0, 255)
    const green = randomNumber(0, 255)
    const blue = randomNumber(0, 255)
    return `rgb(${red}, ${green}, ${blue})`
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
    ctx.fillStyle = "#ddd"

    snake.forEach((position, index) => {
        if (index === snake.length - 1) {
            ctx.fillStyle = "white"
        }
        ctx.fillRect(position.x, position.y, size, size)
    })
}


const moveSnake = () => {
    if (!direction) return

    const head = snake[snake.length - 1]
    let newHead

    if (direction === "right") newHead = { x: head.x + size, y: head.y }
    if (direction === "left") newHead = { x: head.x - size, y: head.y }
    if (direction === "down") newHead = { x: head.x, y: head.y + size }
    if (direction === "up") newHead = { x: head.x, y: head.y - size }

    snake.push(newHead)

    // Verifica se comeu a fruta
    const ateFood = newHead.x === food.x && newHead.y === food.y

    if (!ateFood) {
        // Se não comeu, remove a cauda
        snake.shift()
    } else {
        // Se comeu, atualiza a fruta
        incrementScore()
        let x = randomPosition()
        let y = randomPosition()

        while (snake.find((position) => position.x === x && position.y === y)) {
            x = randomPosition()
            y = randomPosition()
        }

        food.x = x
        food.y = y
        food.color = randomColor()
    }
}


const drawGrid = () => {
    ctx.lineWidth = 1
    ctx.strokeStyle = "#ccc"

    for (let i = size; i < canvas.width; i += size) {
        ctx.beginPath()
        ctx.moveTo(i, 0)
        ctx.lineTo(i, canvas.height)
        ctx.stroke()

        ctx.beginPath()
        ctx.moveTo(0, i)
        ctx.lineTo(canvas.width, i)
        ctx.stroke()
    }
}


const cheackEat = () => {
    const head = snake[snake.length - 1]
    
    if (head.x === food.x && head.y === food.y) {
        incrementScore()

        // NÃO faz snake.push(head) aqui
        // Apenas não remove a cauda na próxima movimentação

        let x = randomPosition()
        let y = randomPosition()

        while (snake.find((position) => position.x === x && position.y === y)) {
            x = randomPosition()
            y = randomPosition()
        }

        food.x = x
        food.y = y
        food.color = randomColor()
    }
}


const checkCollision = () => {
    const head = snake[snake.length - 1]
    const canvasLimit = canvas.width - size
    const wallColision = head.x < 0 || head.x > canvasLimit || head.y < 0 || head.y > canvasLimit

    const selfCollision = snake.some((position, index) => {
        return index < snake.length - 1 && position.x === head.x && position.y === head.y
    })

    if (wallColision || selfCollision) {
        gameOver()
    }
}


const gameOver = () => {
    direction = undefined

    menu.style.display = "flex"
    finalScore.innerText = score.innerText
    canvas.style.filter = "blur(2px)"
}

const gameLoop = () => {
    clearTimeout(loopId)

    ctx.clearRect(0, 0, canvas.width, canvas.height)
    drawGrid()
    drawFood()
    moveSnake()
    drawSnake()
    cheackEat()
    checkCollision()

    loopId = setTimeout(() => {
        gameLoop()
    }, 300)
}


gameLoop()

document.addEventListener("keydown", ({key}) => {
    const head = snake[snake.length - 1]
    const neck = snake[snake.length - 2]

    if (key === "ArrowRight" && direction !== "left") {
        // impede ir para a direita se o pescoço já está lá
        if (!neck || head.x + size !== neck.x || head.y !== neck.y) {
            direction = "right"
        }
    }
    if (key === "ArrowLeft" && direction !== "right") {
        if (!neck || head.x - size !== neck.x || head.y !== neck.y) {
            direction = "left"
        }
    }
    if (key === "ArrowDown" && direction !== "up") {
        if (!neck || head.y + size !== neck.y || head.x !== neck.x) {
            direction = "down"
        }
    }
    if (key === "ArrowUp" && direction !== "down") {
        if (!neck || head.y - size !== neck.y || head.x !== neck.x) {
            direction = "up"
        }
    }
})


buttonPlay.addEventListener("click",() => {
  score.innerText ="00"
  menu.style.display ="none"
  canvas.style.filter ="none"

  snake =[initialPosition]
})