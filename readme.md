# Aur-Cheesi


![Wire frame](./scr/game.jpg)
![Wire frame](./scr/win.jpg)
![Wire frame](./scr/bomb.jpg)

## What is Aur-Cheesi?

> Brief discussion of what the game is and why you chose to make it

## Technical Discussion

For my game I used

HTML      (Basic board)
CSS       (Styling and animation) 
JavaScript(Main functionality(complemented with JQ)  
JQuery    (Create the board and DOM manipulation)

### Notes on Game Structure

###Code samples
###T
function retreatPieces(player,$position,$movingPiece){
    let $elementsInthePosition=$("> div",$position);
    let currentPiece= $movingPiece.data('piece');

    let otherPlayer;
    let audio = new Audio('media/retreat.mp3');
    let movedPlayer=false;
    console.log(player,$position.id,$movingPiece.id);
    for(let index=0; index < $elementsInthePosition.length; index++){
        otherPlayer=$(`#${$elementsInthePosition[index].id}`).data("player");
        if  (otherPlayer != player){
            let playerIndex=getIndexById(otherPlayer);
            $(`#${otherPlayer}`).append($elementsInthePosition[index]);
            movedPlayer=true;
            arrayGameInfo[playerIndex].currentPos[currentPiece]=arrayGameInfo[playerIndex].statingPosition;
            alert(`${arrayGameInfo[playerIndex].playerName} has retreated`);
        }
    }
    if (movedPlayer){
        audio.play()
    }
}

 description of challenges you overcame, etc.


###Challenges
My biggest challenge  was the images. I had a hard time and wasted a lot of time finding images. Those that i found were not labeled for reuse, so It was really hard. I wasted hours and  hours and hours on it. I have to find better resources for that.
Another thing is setting priorities, most the of the time I was spending to much time in things that werent as important as others.

## The Making of Aur-cheesi
Making this game was amazing , the ideas came one after another, and at some point I had so many thing in my head that I was overwhelmed. But I will have the time to put those ideas in the game later.


## Opportunities for Future Growth
While I Was working on my project I had so many ideas, that couldn't focus on one thing at a time. So I decided to make a list of the things that I would do in the refactoring phase to make my game better.
Here they are:
* Make the game 3d
* Use better images and sounds.
* Be played from remote computers.
* Add more characters and features
