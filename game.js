
let buttonColours = ["red", "blue", "green", "yellow"];

let gamePattern = [];
let userClickedPattern = [];

let gameStarted = false;
let level = 0;

function nextSequence(){

    // array should be empty for the next level
    userClickedPattern = [];
    level++;
    $(".level-title").text("Level " + level);

    var randomNumber = Math.floor(Math.random() * 4);

    let randomChosenColor = buttonColours[randomNumber];
    gamePattern.push(randomChosenColor);

    $(`#${randomChosenColor}`).fadeOut(100).fadeIn(100);

    playSound(randomChosenColor);
}

function playSound(color){
    var audio = new Audio(`sounds/${color}.mp3`);
    audio.play();
}

$(".btn").click(function(){

    let userChosenColor = $(this).attr("id");
    userClickedPattern.push(userChosenColor);

    playSound(userChosenColor);
    animatePress(userChosenColor);

    // check answer after user has clicked a color
    // passing the last position
    checkAnswer(userClickedPattern.length-1);
})

function animatePress(currentColour){
    // $("#" + currentColor).addClass("pressed");
    $(`#${currentColour}`).addClass("pressed");
    setTimeout(() => {
        $(`#${currentColour}`).removeClass("pressed");
    }, 200)
}

$(document).keypress(function(event){
    if(gameStarted === false){
        $("#level-title").text("Level " + level);
        gameStarted = true;
        nextSequence();
    }
})

function checkAnswer(currentLevel) {

    //check the current position
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

        // check if we reach the end of array
        if (userClickedPattern.length === gamePattern.length){

            setTimeout(function () {
                nextSequence();
            }, 1000);

        }

        // good answer, but it's not the last position -> do nothing, wait for click

    } else {

        playSound("wrong");
        $("body").addClass("game-over")

        setTimeout(function () {
            $("body").removeClass("game-over");
        }, 300);

        $(".level-title").html("Game Over<br>Press Any Key to Restart");

        startOver();
    }
}

function startOver() {
    level = 0;
    gamePattern = [];
    gameStarted = false;
}

