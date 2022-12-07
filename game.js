var userClickedPattern =[];
var gamePattern=[];
var buttonColours =['red','blue','green','yellow'];
var level=0;
var started = false;

// Step 7 - Start the Game
// deteching keyboard press
$(document).keypress(function(){
    if(!started){
    $('#level-title').text('level ' + level);
    nextSequence();
    started=true;
    }
});

//Step 4 - Check Which Button is Pressed
$('.btn').click(function(){
    var userChosenColour= $(this).attr('id');
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length-1);
});

// step 8 check answer
function checkAnswer(currentLevel){
    if(gamePattern[currentLevel] === userClickedPattern[currentLevel]){
        if(userClickedPattern.length === gamePattern.length){
            setTimeout(function(){
                nextSequence();
            },1000);
        }
    }else{
        //Step 9 - Game Over
        playSound('wrong');
        $('body').addClass('game-over');
        $('#level-title').text('Game Over, Press Any Key to Restart');  
        setTimeout (function(){
            $('body').removeClass('game-over');
            },200);
         
        startOver(); 
    }
}

// Step 2 - Create A New Pattern
function nextSequence(){
    userClickedPattern =[];
    level++;
    $('#level-title').text('level ' + level);
    var randomNumber=Math.floor(Math.random() * 4);
    var randomChosenColour=buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
//Step 3 - Show the Sequence to the User with Animations and Sounds
    $('#' + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
}

// Step 5 - Add Sounds to Button Clicks
function playSound(name){
    var audio =new Audio('sounds/'+ name+ '.mp3')
    audio.play();
}

// Step 6 - Add Animations to User Clicks
function animatePress(currentColor){
    //add the class to the clicked element
    $('#'+ currentColor).addClass('pressed');
    setTimeout (function(){
    $('#'+ currentColor).removeClass('pressed');
    },100);
}

// Step 10 - Restart the Game
function startOver(){
    level=0;
    gamePattern=[];
    started = false;
}
