var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var started = false;

function nextSequence() {
  level++;
  $("h1").text("Level " + level);
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  $("#" + randomChosenColour)
    .fadeOut(100)
    .fadeIn(100);
  playSound(randomChosenColour);
}

function handler(color) {
  var userChosenColor = color;
  userClickedPattern.push(userChosenColor);
  checkAnswer(userClickedPattern.length - 1);
}

function playSound(name) {
  var audio = new Audio("./public/sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColour) {
  $("." + currentColour).addClass("pressed");
  setTimeout(function () {
    $("." + currentColour).removeClass("pressed");
  }, 100);
}

function checkAnswer(currentLevel) {
  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function () {
        userClickedPattern = [];
        nextSequence();
      }, 1000);
    }
  } else {
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 100);
    $("h1")
      .html("Game Over, Press any key to Restart")
      .css("font-size", "1.4rem")
      .css("line-height", "1.5");
    startOver();
  }
}

function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
  userClickedPattern = [];
}

$(document).keypress(function () {
  if (!started) {
    started = true;
    $("#instructions").css("visibility", "hidden");
    nextSequence();
  }
});

$(".btn").click(function () {
  handler(this.id);
  playSound(this.id);
  animatePress(this.id);
});
