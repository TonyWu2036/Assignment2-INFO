const pingpongBoard = document.querySelector("#pingpongBoard");
const ctx = pingpongBoard.getContext("2d");
const scoreTxt = document.querySelector("#scoreTxt");
const restartBot = document.querySelector("#restartBot");
const pingpongHeight = pingpongBoard.height;
const pingpongWidth = pingpongBoard.width;
const pingpongBackground = "Gray";
const paddle1Color = "SlateBlue";
const paddle2Color = "MediumSeaGreen";
const paddleBorder = "black";
const ballColor = "Orange";
const ballBorderColor = "black";
const ballRadius = 12.5 ;
const paddleSpeed = 60;
const net = {
    x: pingpongWidth/2 - 2/2,
    y: 0, 
    width: 2,
    height: 10,
    color: "WHITE"
}
let ballSpeed = 1;
let ballX = pingpongWidth / 2;
let ballY = pingpongHeight / 2;
let ballXDirection = 0;
let ballYDirection = 0;
let intervalID;
let playerScore = 0;
let AIScore = 0;
let topScore = 20;
let paddle1= {
    height: 100,
    width: 20,
    x: 0,
    y: pingpongHeight/2 - 100/2
};
let paddle2= {
    height: 100,
    width: 20,
    x: pingpongWidth - 20,
    y: pingpongHeight/2 - 100/2
};

window.addEventListener("keydown", changeDirection);
restartBot.addEventListener("click", restartGame);

pingpongStart();
drawPlayer();


function pingpongStart(){
    Ballcreate();
    nextTick();
};
function nextTick(){
    intervalID = setTimeout(() => {
        clearBoard();
        drawPlayer();
        ballMoving();
        drawBall(ballX, ballY);
        ballCollision();
        nextTick();
    }, 10)
};
function drawPlayer(){
    ctx.strokeStyle = paddleBorder;
    ctx.fillStyle = paddle1Color;
    ctx.fillRect(paddle1.x, paddle1.y, paddle1.width, paddle1.height);
    ctx.strokeRect(paddle1.x, paddle1.y, paddle1.width, paddle1.height);

    ctx.fillStyle = paddle2Color;
    ctx.fillRect(paddle2.x, paddle2.y, paddle2.width, paddle2.height);
    ctx.strokeRect(paddle2.x, paddle2.y, paddle2.width, paddle2.height);
};
function clearBoard(){
    ctx.fillStyle = pingpongBackground;
    ctx.fillRect(0, 0, pingpongWidth, pingpongHeight);
};
function Ballcreate(){
    ballSpeed = 1;
    if(Math.round(Math.random()) == 1){
        ballXDirection = 1;
    }else{
        ballXDirection = -1;
    }
    if(Math.round(Math.random()) == 1){
        ballYDirection = 1;
    }else{
        ballYDirection = -1;
    }
    ballX = pingpongWidth / 2;
    ballY = pingpongHeight / 2;
    drawBall(ballX, ballY)
};
function ballMoving(){
    ballX += (ballSpeed * ballXDirection);
    ballY += (ballSpeed * ballYDirection);
};
function drawBall(ballX, ballY){
    ctx.fillStyle = ballColor;
    ctx.strokeStyle = ballBorderColor;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(ballX, ballY, ballRadius, 0,  Math.PI * 2);
    ctx.stroke();
    ctx.fill();
};
function ballCollision(){
    if(ballY <= 0 + ballRadius){
        ballYDirection *= -1;
    }
    if(ballY >= pingpongHeight - ballRadius){
        ballYDirection *= -1;
    }
    if(ballX <= 0){
        AIScore += 1;
        updateScore();
        Ballcreate();
        return;
    }
    if(ballX >= pingpongWidth){
        playerScore += 1;
        updateScore();
        Ballcreate();
        return;
    }
    if(ballX <= (paddle1.x + paddle1.width + ballRadius)){
        if(ballY > paddle1.y && ballY < paddle1.y + paddle1.height){
            ballX = (paddle1.x + paddle1.width) + ballRadius;
            ballXDirection *=-1;
            ballSpeed += 1;
        }
    }
    if(ballX >= (paddle2.x - ballRadius)){
        if(ballY > paddle2.y && ballY < paddle2.y + paddle2.height){
            ballX = (paddle1.x + paddle1.width) + ballRadius;
            ballXDirection *=-1;
            ballSpeed += 1;
        }
    }
};
function changeDirection(event){
    const keyPressed = event.keyCode;
    const paddle1Up = 87;
    const paddle1Down = 83;
    const AIUp = 38;
    const AIDown = 40;

    switch(keyPressed){
        case(paddle1Up):
            if(paddle1.y > 0){
                paddle1.y -= paddleSpeed;
            }
            break;
        case(paddle1Down):
            if(paddle1.y < pingpongHeight - paddle1.height){
                paddle1.y += paddleSpeed;
            }
            break;
        case(AIUp):
            if(paddle2.y > 0){
                paddle2.y -= paddleSpeed;
            }
            break;
        case(AIDown):
            if(paddle2.y < pingpongHeight - paddle2.height){
                paddle2.y += paddleSpeed;
            }
            break;
    }
};
function updateScore(){
    scoreTxt.textContent = `${playerScore} : ${AIScore}`;
    gameOver()
};
function restartGame(){
    playerScore = 0;
    AIScore = 0;
    paddle1= {
        height: 100,
        width: 20,
        x: 0,
        y: 0
    };
    paddle2= {
        height: 100,
        width: 20,
        x: pingpongWidth - 20,
        y: pingpongHeight - 100
    };
    ballX = 0;
    ballY = 0;
    ballXDirection = 0;
    ballYDirection = 0;
    updateScore();
    clearInterval(intervalID);
    pingpongStart();
};
function gameOver(){
    if(playerScore === topScore){
    console.log('User Wins')
    sessionStorage.setItem("winner", "User");
    window.location.href = "UserWinner.html";
    restartGame()
}else if(AIScore === topScore){
    console.log('AI Wins')
    sessionStorage.setItem("winner", "AI");
    window.location.href = "ComputerWinner.html";
    restartGame()
}
}























