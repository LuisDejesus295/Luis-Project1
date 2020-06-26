// Sprite generator: http://gaurav.munjal.us/Universal-LPC-Spritesheet-Character-Generator/
/******************** Global Variables ********************/
const canvas = document.querySelector('#canvas')

function play() {
    let audio = new Audio(`../U Can't Touch This- Instrumental.mp3`);
    audio.onload = audio.play;
};

const startBtn = document.querySelector(`#start`)
if(startBtn) startBtn.onclick = () => {play()}
if (canvas){const cxt = canvas.getContext('2d')
let sprite = new Image()
sprite.src = '../images/sprite.png'
let background = new Image()
background.src = '../images/landscape-at-morning-for-game-background-vector-14966453.jpeg'
let imageobj = new Image()
imageobj.src = `../images/game-object-removebg-preview.png`
let xPositionSprite = 0;
let yPositionSprite = 430;
let imageX = 0
let imageY = 64*11
let animationID;
let obstacleX 
let obstacleY
let obstacles = [];
let canvasX = 0
let died = false;
let score = 0;

let jumpValue = 0

const resetBtn = document.querySelector('#reset')
resetBtn.onclick = () => {location.reload()}

// let audio = new Audio
// audio.src = "../U Can't Touch This- Instrumental.mp3"






// function play() {
//     audioTag.
// }


// test obstacle


/******************** Functions ********************/
function animationLoop() {
    animationID = window.requestAnimationFrame(animationLoop)
    cxt.clearRect(0, 0, canvas.width, canvas.height)
    cxt.drawImage(background, 0, 0, canvas.height, canvas.width)
    jumpCheck()
    cxt.drawImage(sprite, imageX, imageY, 64, 64, xPositionSprite, yPositionSprite += jumpValue,64,64)
    obstacles.forEach(function(obs) {
        cxt.drawImage(imageobj,obs.x, obs.y, obs.height, obs.width)
        obs.x--;
        if((xPositionSprite + 20 < obs.x ||
            xPositionSprite > obs.x + obs.width -20 ||
            yPositionSprite > obs.y + obs.height -20 ||
            yPositionSprite + 20 < obs.y) === false ) {
                console.log('collision')
                window.location.replace("gameover.html")
            }
    })
    if(score > 10 && xPositionSprite > canvas.width - 50){
        window.location.replace("youwin.html")
    }
    else if(score > 50 || xPositionSprite > canvas.width - 50){
        window.location.replace("gotonext.html")
        // { break; }
    }
    drawScore()





    
    // (imageObj, imageX, imageY, imageWidth, imageHeight, xCanvas, yCanvas, widthCanvas, heightCanvas)
}
setInterval ( () => {
    score ++;
}, 500)
function drawScore(){
    // cxt.fillStyle = `white`;
    // cxt.fillRect(500,10,150,50)
    cxt.font =`30px arial`;
    cxt.fillStyle = `white`;
    cxt.fillText(`score: ${score}` , 400, 50);
}

function jumpCheck(){
    if(yPositionSprite <= 360){
        jumpValue += 3
    }
    if(yPositionSprite > 430){
        jumpValue = 0
        yPositionSprite = 430
    }
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
        // yPositionSprite -= 10
        // imageY = 64*15
        // if(imageX + 64 >= 64*9) {
        //     imageX = 0
        // } else {
        //     imageX += 64
        // }
        jumpValue = -2
    }
    boundaries()
}


function boundaries() {
    if(xPositionSprite < canvas.width- 600){
    xPositionSprite = 0
    }
}

function addObstacle() {
    setTimeout(() => {
        let obs = {
            x: canvas.width-100,
            y: canvas.height/2 + 32 + 110,
            height: 50,
            width: 50,
        }
        obstacles.push(obs)
        addObstacle()
    }, 1500+Math.random()*2000);
}

addObstacle()
/******************** Script ********************/
document.onkeydown = playerMove
animationLoop()


}




