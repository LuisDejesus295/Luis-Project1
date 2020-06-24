// Sprite generator: http://gaurav.munjal.us/Universal-LPC-Spritesheet-Character-Generator/
/******************** Global Variables ********************/
const canvas = document.querySelector('#canvas')
const cxt = canvas.getContext('2d')
let sprite = new Image()
sprite.src = '../images/sprite.png'
let background = new Image()
background.src = '../images/landscape-at-morning-for-game-background-vector-14966453.jpeg'
let imageobj = new Image()
imageobj.src = `../images/game-object-removebg-preview.png`
let xPositionSprite = 0;
let yPositionSprite = canvas.height/2 + 130;
let imageX = 0
let imageY = 64*11
let animationID;
let obstacleX 
let obstacleY
let obstacles = [];
let canvasX = 0
let died = false;



const resetBtn = document.querySelector('#reset')
resetBtn.onclick = () => {location.reload()}



// test obstacle


/******************** Functions ********************/
function animationLoop() {
    animationID = window.requestAnimationFrame(animationLoop)
    cxt.clearRect(0, 0, canvas.width, canvas.height)
    cxt.drawImage(background, 0, 0, canvas.height, canvas.width)
    // imageX = (imageX + 64) % 576
    cxt.drawImage(sprite, imageX, imageY, 64, 64, xPositionSprite, yPositionSprite, 64, 64)
    cxt.drawImage(sprite, imageX, imageY, 64, 64, xPositionSprite, yPositionSprite, 64, 64)
    obstacles.forEach(function(obs) {
        // cxt.fillStyle = obs.color
        cxt.drawImage(imageobj,obs.x, obs.y, obs.height, obs.width)
        obs.x--;
        if((xPositionSprite + 25 < obs.x ||
            xPositionSprite > obs.x + obs.width ||
            yPositionSprite > obs.y + obs.height ||
            yPositionSprite + 25 < obs.y) === false ) {
                console.log('collision')
                window.location.replace("gameover.html")
            }
    })
    
    
    // (imageObj, imageX, imageY, imageWidth, imageHeight, xCanvas, yCanvas, widthCanvas, heightCanvas)
}


function playerMove(e) {
    if(e.key === 'ArrowRight') {
        imageY = 64*11
        xPositionSprite += 10
        imageX = (imageX + 64) % 576
        // if(imageX + 64 >= 64*9) {
        //     imageX = 0
        // } else {
        //     imageX += 64
        // }
    }
    if(e.key === 'ArrowLeft') {
        imageY = 64*9
        xPositionSprite -= 10
        if(imageX + 64 >= 64*9) {
            imageX = 0
        } else {
            imageX += 64
        }
    }
    // if(e.key === 'ArrowDown') {
    //     console.log('downnnnnnn')
    //     yPositionSprite += 5
    //     imageY = 64*10
    //     if(imageX + 64 >= 64*9) {
    //         imageX = 0
    //     } else {
    //         imageX += 64
    //     }
    // }
    if(e.key === 'ArrowUp') {
        yPositionSprite -= 10
        imageY = 64*15
        if(imageX + 64 >= 64*9) {
            imageX = 0
        } else {
            imageX += 64
        }
    }
}

function collisionDetection(obs) {
    if((xPositionSprite + 64 > obs.x ||
        xPositionSprite < obs.x + obs.width ||
        yPositionSprite > obs.y + obs.height ||
        yPositionSprite + 64 < obs.y
        ) === false) {
            console.log('collision')
        }
}

function addObstacle() {
    setTimeout(() => {
        let obs = {
            x: canvas.width-100,
            y: canvas.height/2 + 32 + 110,
            height: 50,
            width: 50,
            color: 'red'
        }
        obstacles.push(obs)
        addObstacle()
    }, 1000+Math.random()*2000);
}
addObstacle()
/******************** Script ********************/
document.onkeydown = playerMove
animationLoop()




document.onkeyup = jump
function jump(e){
    if(imageY.classList  != "animate"){
    imageY.classList.add("animate");
    
    }
    setTimeout (function() {
        imageY.classList.remove("animate");

    },500);
}

