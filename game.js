buttonColours=["red","blue","green","yellow"]
gamePattern=[]
userClickedPattern=[]
level=0

function nextSequence(){
    updateLevel()
    randomNumber=Math.floor(Math.random()*4);
    randomChosenColour=buttonColours[randomNumber]
    gamePattern.push(randomChosenColour)
    $("#"+randomChosenColour).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour)
}
$(document).keydown(function(){
    if(level==0)
        nextSequence()
})

$(".btn").click(function(){
    if(level!=0){
        var userChosenColour=this.id
        userClickedPattern.push(userChosenColour)
        console.log(userClickedPattern)
        playSound(userChosenColour)
        animatePress(userChosenColour)
        checkAnswer()
    }
})

function playSound(name){
    new Audio("sounds/"+name+".mp3").play()
}

function animatePress(currentColour){
    $("#"+currentColour).toggleClass("pressed")
    setTimeout(function(){
        $("#"+currentColour).toggleClass("pressed")
    },100)
}

function updateLevel(){
    level=level+1
    $("h1").text("Level "+level)
}

function checkAnswer(){
    if(gamePattern.length===userClickedPattern.length){
        if(equalArrays(gamePattern,userClickedPattern)){
            setTimeout(function(){
                nextSequence()
                userClickedPattern=[]
            },500)
        }
        else
            playGameOver()
    }
    else if(!(userInRightDirection(gamePattern,userClickedPattern)))
        playGameOver()
}

function playGameOver(){
    new Audio("sounds/wrong.mp3").play()
    $("h1").text("Game Over, Press Any Key to Restart")
    $("body").toggleClass("game-over")
    setTimeout(function(){
        $("body").toggleClass("game-over")
    },200)
    gamePattern=[]
    userClickedPattern=[]
    level=0
}

function userInRightDirection(a,b){
    i=0;
    while(i<b.length){
        if(b[i]!==a[i])
            return false
        i++
    }
    return true
}

function equalArrays(a,b){
    for (var i = 0; i < a.length; ++i){
        if (a[i] !== b[i]) return false;
    }
    return true;
}
