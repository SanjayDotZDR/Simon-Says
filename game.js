//variables etc
buttonColors = ["red", "blue", "green", "yellow"];
gamePattern = [];
userPattern = [];
level = 0;
correct = 0;
started = false;
attempt = 0;

//randomly generate next in simon sequence and call display
function nextSequence(){
    level++;
    $('#level-title').text("Level:" + level)

    randomNum = Math.floor(Math.random() * 4);
    
    randomColor = buttonColors[randomNum];
    gamePattern.push(randomColor);

    display();
    
}

//self explanatory
function playSound(name){
    var audio = new Audio("sounds/" + name +".mp3");
    audio.play();
}

//animate the button presses
function animatePress(name){
    $("#" + name).addClass("pressed");
    
    setTimeout(function() {
        $("#" + name).removeClass('pressed');
    }, 100);
}

//play each simon sequence including the new one
async function display(){
    for (i = 0; i < gamePattern.length; i++){
        await new Promise(resolve => setTimeout(resolve, 500));
        $("#" + gamePattern[i]).fadeOut(100).fadeIn(100);
        var audio = new Audio("./sounds/" + gamePattern[i] +".mp3");
        audio.play();
    }
}

//verify the button press is the correct one in sequence
function checkAnswer(index){

    if (userPattern[index] == gamePattern[index]){
        return true;
    }
    else{
        return false;
    }

}

//reset variables on game over
function gameOver(){
    
    console.log("game over.");

    var audio = new Audio("sounds/wrong.mp3");
    audio.play();
    $("body").addClass("game-over");

    setTimeout(function() {
        $("body").removeClass('game-over');
    }, 200);

    $('#level-title').text("Game Over! Click here to retry!");
    $("#red, #blue, #green, #yellow").removeClass("active");
    started = false;
    gamePattern = [];
    userPattern = [];
    level = 0;
    correct = 0;
}

//turns on buttons for game after play button clicked, continues to check button presses through this
function buttonsOn(){
    
    $(".active").on("click",function () {
       
        userPattern.push(this.id);
        playSound(this.id);
        console.log("help me")
        animatePress(this.id);
        if (checkAnswer(correct) == false){
            gameOver();
        }
        else{
            
            if (correct == (gamePattern.length - 1)){ //full sequence correct
                userPattern = []
                correct = 0;
                setTimeout(function() {
                    nextSequence();
                }, 1000);
            }
            else{
                
                correct++;
            }

        }
        
    });
    
}


//start button / title
$('#level-title').click(function(){
    console.log("clicked.")
    if (!started){
        $("#red, #blue, #green, #yellow").addClass("active");

        if (attempt == 0){
            buttonsOn();
        }
        
        attempt++;
        $('#attempt').text("Attempt: " + attempt);
        nextSequence();
        started = true;
        x = true;
    }

    
});

