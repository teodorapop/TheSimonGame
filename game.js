
let buttonColours = ['red', 'yellow', 'green', 'blue'];
let gamePattern =[];
let userClickedPattern = [];
let gameStarted = false;
var level = 0;

function nextSequence(){

    userClickedPattern=[];
    level++;
    $(".level-title").text(`Level ${level}`);

    let randomNumber = Math.floor(Math.random() * 4);
    let randomChosenColour = buttonColours[randomNumber];

    gamePattern.push(randomChosenColour);

    // animate to se which button is selected
    $(`#${randomChosenColour}`).fadeOut(100).fadeIn(100);

    //play the specific audio for that button
    playSound(randomChosenColour);

}

$(".btn").click(function(){
    let userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);

    playSound(userChosenColour);
    animatePress(userChosenColour);

    checkAnswer(userClickedPattern.length-1);
    // console.log(userClickedPattern.length-1);
});

function playSound(name){
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColour){
    $(`#${currentColour}`).addClass("pressed");
    setTimeout(function () {
        $(`#${currentColour}`).removeClass("pressed");
    }, 100);
}

$(document).keypress(function () {
    if(gameStarted === false){
        $(".level-title").text("Level " + level);
        nextSequence();
        gameStarted = true;
    }
})

function checkAnswer(currentLevel) {

    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

        console.log("success");

        if (userClickedPattern.length === gamePattern.length){
            setTimeout(function () {
                nextSequence();
            }, 1000);
        }

    } else {

        console.log("wrong");

        playSound("wrong");

        $("body").addClass("game-over");
        setTimeout(function () {
            $("body").removeClass("game-over");
        }, 200);

        $("#level-title").text("Game Over, Press Any Key to Restart");
    }

}
