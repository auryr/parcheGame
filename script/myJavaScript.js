var diceImages=[];
var $arrayPositions;
var currentPlayer=Math.floor(Math.random()*4);
var $score;
var $turn;
var dicePoints = 0;
var anotherChance=false;
var $dice1;
var $dice2;
var arrayGameInfo=[];
var $myModal;
var $protector;
var $homeClastle;
var $winner;
var arrayClass=["Yel","Blu","Gre","Red"];
var arrayCharacter=["King","Archer","Viking","Horseman"];
//refact var playerCount=2;

var $statusYel;
var $statusBlu;
var $statusGre;
var $statusRed;

// prototype information about the players and game status
function gameStatus(id,name,startPos,jumpPos,breakPos,entracePos,endPos){
        this.playerId=id;
        this.playerName=name;
        this.statingPosition= startPos;
        this.jumpPosition=jumpPos;
        this.breakPosition=breakPos;
        this.entrancePosition=entracePos;
        this.endPosition= endPos;
        //testingthis.currentPos=[38,38,38,38]
        this.currentPos=[startPos,startPos,startPos,startPos]
}

// creating players objects
var yellowPlayer= new gameStatus('playerYel','Yellow',38,68,34,84,88);
var bluePlayer=   new gameStatus('playerBlu','Blue'  ,21,68,17,77,81);
var greenPlayer=  new gameStatus('playerGre','Green' ,55,68,51,92,95);
var redPlayer=    new gameStatus('playerRed','Red'   ,04,-1,68,69,74);

arrayGameInfo.push(yellowPlayer,bluePlayer,greenPlayer,redPlayer);

function getIndexById(prayerId){
    let index=0;
    for (let i=0 ;i < arrayGameInfo.length; i++){
        if (arrayGameInfo[i].playerId===prayerId){
            index=i;
            break;
        }
    }
    return index
}

//reset game
function setGameValues(){
    // choosing first player
    currentPlayer=Math.floor(Math.random()*4);
    dicePoints = 0;
    anotherChance=false;

    arrayGameInfo[0].currentPos=[38,68,34,84,88];
    arrayGameInfo[1].currentPos=[21,68,17,77,81];
    arrayGameInfo[2].currentPos=[55,68,51,92,95];
    arrayGameInfo[3].currentPos=[04,-1,68,69,74];

    presentGameStatus();

    let $arrayPlayer=$(".player");
    let k=0;

    // pieces back to the kingdom
    for (let $element of $arrayPlayer){
        let $arrayPieces=$(`> .player${arrayClass[k]}`,$homeClastle);
        for (let $elementPieces of $arrayPieces){
            $($element).append($elementPieces);
        }
        k++;
    }
}

//  creates element
function createElement($parent,elementType,elementClass,elementId,content){
    let $createdElement = $(`<${elementType}>`,{id:elementId, class:elementClass,text:content});
    $($parent).append($createdElement);
    return $createdElement;
}

// creating 4 pieces for each player
function createPieces(){
    let $arrayPlayer=$(".player");
    let k=0;
    for (let $element of $arrayPlayer){
        for (let i=1; i <= 4 ; i++){
            let $piece =createElement($($element),"div",`pieces player${arrayClass[k]}`, `piece${arrayClass[k]}`+i);
            $piece.css("background-image",`url('images/piece${arrayClass[k]}${i}.jpg')`);
            $piece.data({'player': $element.id ,"piece":i-1});

        }
        k++;
    }
}

// getting the values for the movement of the piece
function rollDices(){
    $($protector).css("display" , "block")
    anotherChance=false;
    if (dicePoints>0) {
        alert("You already rolled the dice. Move the  warrior");
        $($protector).css("display" , "none")
        return;
    }

    let audio = new Audio('media/rolling.mp3');
    audio.play();
    let id = setInterval(getValue, 110);
    let times=0;

    function getValue(){
        let valueDice1= Math.floor(Math.random()*6)+1;
        let valueDice2= Math.floor(Math.random()*6)+1;

        if(times<=15/* testing Math.floor(Math.random()*15)+1*/){
            times=times+1;
            $dice1.css("background-image",`url('${diceImages[valueDice1-1]}')`);
            $dice2.css("background-image",`url('${diceImages[valueDice2-1]}')`);
            (valueDice1===valueDice2) ? anotherChance =true : anotherChance =false;
            dicePoints=valueDice1+valueDice2;
            $score.text(`Move ${dicePoints} positions`);
        }else{
            // if the player get the same number in the dices then gets another turn
            if (anotherChance){
                alert("DOUBLES!!! \nThe kingdom gets an extra turn");
            }
            clearInterval(id);
            $($protector).css("display" , "none");
        }
    }
}

// formar a string depending of the size passed as a parameter
function format(value,myChar,size){
    let myValue=value.toString();
    let k=myValue.length;
    while (k< size ){
        myValue=myChar+ myValue;
        k=myValue.length ;
    }
    return myValue;
}

//validation before moving the pieces
function checkMovement($element){
    let myPlayer= $element.data('player');
    let currentPiece= $element.data('piece');

    // verifying the player only moves their own pieces
    if (myPlayer!=arrayGameInfo[currentPlayer].playerId){
        alert(`The kingdoms are only allowed to move their own warriors. \nThis is not your  warrior`);
        return;
    }

    if (dicePoints==0){
        alert("You must roll the dices first");
        return;
    }

    movePieces(dicePoints,$element);
}

function playerStatus(status,$playerSta){
    let labelText="";
    for(let i=0;i<status.currentPos.length;i++){
        labelText+=`\n${arrayCharacter[i]} ${status.currentPos[i]-status.statingPosition}`;
    }
    $playerSta.text(`${status.playerName} position ${labelText}`);
}

function presentGameStatus(){
    playerStatus(arrayGameInfo[0],$statusYel);
    playerStatus(arrayGameInfo[1],$statusBlu);
    playerStatus(arrayGameInfo[2],$statusGre);
    playerStatus(arrayGameInfo[3],$statusRed);
}

//moving the pieces
function movePieces(steps,$movingPiece){
    let currentPiece= $movingPiece.data('piece');
    let timer=380;
    let winningGame=false;
    let remaingSteps=0;

    let currentPos=arrayGameInfo[currentPlayer].currentPos[currentPiece];

    let pos=0;
    let id = setInterval(nextPos, timer);
    //testing  currentPos=38;steps=73;

    function nextPos(){
        let audio = new Audio('media/marching.mp3');
        audio.play()

        $($protector).css("display" , "block")
        let homePosition =false;
        currentPos++;
        pos++;
        remaingSteps=steps-pos;
        // check jumpins position
        if (currentPos-1 === arrayGameInfo[currentPlayer].jumpPosition){
            currentPos=1;
        }

        // check entrance position
        if (currentPos-1 ===arrayGameInfo[currentPlayer].breakPosition){
            currentPos=arrayGameInfo[currentPlayer].entrancePosition;
        }

        let $newParent=$("#position" +format(currentPos,"0",3));
        let $child=$movingPiece;

        // check end position.
        if (currentPos-1 >arrayGameInfo[currentPlayer].endPosition){
            //moving to castle(home)
            homePosition=true;
            pos=steps;
            $newParent=$homeClastle;
            setTimeout(function(){winningGame=checkWinner($movingPiece.data('player'))},20)
        }

        $newParent.append($child);
        //reasingning values
        if (winningGame){
            dicePoints-=pos;
            steps=pos;
        }
        //last move
        if(pos===steps){
            arrayGameInfo[currentPlayer].currentPos[currentPiece]=currentPos;
            clearInterval(id);

            if (!homePosition) {
                retreatPieces($movingPiece.data('player'),$newParent,$movingPiece);// cheking if there are other pieces in that position
                traps($movingPiece.data('player'),$newParent,$movingPiece); //checking if the actual position is a trap
            }
            $($protector).css("display" , "none");
            presentGameStatus();

        }
    }

    //making sure this part doesn't execute until the piece is moved
    setTimeout( function(){
        //testing
        if(!anotherChance && remaingSteps<=0){
          currentPlayer===3 ? currentPlayer=0 : currentPlayer++;
        }
        $turn.text(`Player turn : ${arrayGameInfo[currentPlayer].playerName}`);
        dicePoints=remaingSteps;
    },  steps*(timer+5));

}

window.onload = function() {
    createBoard();
    createPieces();

    let audio = new Audio('media/entranceSound.mp3');
    audio.play()

    let i=0;
    //array with the images
    while (i<6){
        diceImages[i]="images/side"+(i+1) +".jpg";
        i++;
    }
    // getting players name
    for (i=1; i<=4; i++){
        arrayGameInfo[i-1].playerName=((prompt(`Player ${i} name`, `Player ${i}`)) + "'s KINGDOM").toUpperCase();
    }

    presentGameStatus();
    // adding the events
    $("#rollDices").on("click", function(){
        rollDices();
    });

    let $arrayPieces=$(".pieces");
    for (let $pieceIndex of $arrayPieces){
        $($pieceIndex).on("click", function(){
            checkMovement($($pieceIndex))  ;
        });
    }

    $($myModal).on("click", function(){
        $($myModal).css("display" , "none");
        setGameValues();
    })

    $($protector).on("dblclick", function(){
        $($protector).css("display" , "none")
    })

    //presenting info
    $score=$("#score");
    $turn = $("#turn");
    $turn.text(`Player's turn : ${arrayGameInfo[currentPlayer].playerName}`);

    $arrayPositions=$(".position");
    for (let $position of $arrayPositions){
        //$($position).css("background-image","url('images/road2.jpg')")
        //testing presenting the pos number
        //$($position).text(($($position).attr("id")).substring(8,11));
    }

    //refact
    $("#position039").css("background-image","url('images/troll1.jpg')");
    $("#position022").css("background-image","url('images/troll2.jpg')");
    $("#position056").css("background-image","url('images/troll3.jpg')");
    $("#position005").css("background-image","url('images/troll4.jpg')");

    $("#position039").data({'trap':"troll"});
    $("#position022").data({'trap':"troll"});
    $("#position056").data({'trap':"troll"});
    $("#position005").data({'trap':"troll"});

    $("#position075").css("background-image","url('images/bridge2.jpg')");
    $("#position082").css("background-image","url('images/bridge.jpg')");
    $("#position089").css("background-image","url('images/bridge2.jpg')");
    $("#position096").css("background-image","url('images/bridge.jpg')");

    $("#hPlayerYel").text(arrayGameInfo[0].playerName);
    $("#hPlayerBlu").text(arrayGameInfo[1].playerName);
    $("#hPlayerGre").text(arrayGameInfo[2].playerName);
    $("#hPlayerRed").text(arrayGameInfo[3].playerName);
}

function checkWinner(player){
    let $piecesInCastle=$(`#posSquare3 > .${player}`);
    if ($piecesInCastle.length===4){
        celebration();
        return true
    }
}

function celebration(){
    $($myModal).css("background-image" , `url('images/celebrate.gif`);
    $($myModal).css("display" , "block");
    $($winner).text(`${arrayGameInfo[currentPlayer].playerName} IS THE WINNER`);
    setGameValues();
    let audio = new Audio('media/winningsound.mp3');
    audio.play();
}

function traps(player,$position,$movingPiece){
    //refact
    let playerIndex=getIndexById(player);
    let movedPlayer=false;
    let currentPiece= $movingPiece.data('piece');
    let otherPlayer=$position.data("player");

    if ($position.data("trap")==="troll" && player != otherPlayer){
        let audio = new Audio('media/troll.mp3');
        audio.play();
        $position.css("animation","shake 2s");
        setTimeout(function(){$(`#${player}`).append($movingPiece)},2000);
        arrayGameInfo[playerIndex].currentPos[currentPiece]=arrayGameInfo[playerIndex].statingPosition;
        console.log(player + " has steped with a troll")
    }

    if ($position.data("trap")==="bomb" /*&& player != otherPlayer*/){
        let audio = new Audio('media/bomb.mp3');
        audio.play();
        $position.data("trap","");
        $position.css("animation","shake 2s");
        $position.css("background-image","url('images/bomb.jpg')");
        setTimeout(function(){$(`#${player}`).append($movingPiece)},2000);
        arrayGameInfo[playerIndex].currentPos[currentPiece]=arrayGameInfo[playerIndex].statingPosition;
        console.log(player + " has steped into a bomb")
    }
}

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

////refactcreating elements for the board
function createBoard(){
    let index=0;
    let $element=$("#mainDiv");
    let $playerImg;

    //left bar
    $element.css({    "background-color": 'green'});
    $element.css("background-image",`url('images/forest2.jpg`);
    const $leftBar=createElement($element,"div","Bar","leftBar","");
    $myModal=createElement($element,"div","myModal","myModal","");
    $protector=createElement($element,"div","myModal protector","myModal","");
    $winner=createElement($myModal,"h1","hmain","winner","");

    let $ele=createElement($leftBar,"div","diceContainer","diceContainer","");
    $ele.css({"display": 'flex',"justify-content": 'space-around'});
    $dice1=createElement($ele,"div","dice","dice1","");
    $dice1.css("background-image",`url('images/side1.jpg`);

    $dice2=createElement($ele,"div","dice","dice2","");
    $dice2.css("background-image",`url('images/side1.jpg`);
    createElement($leftBar,"button","myButton","rollDices","ROLL DICES");
    createElement($leftBar,"h1","h1","score","00");
    createElement($leftBar,"h1","h1","turn","");

    //MAIN CONTAINER
    const $containerDiv=createElement($element,"div","containerDiv","containerDiv","");
    //right bar
    const $rightBar=createElement($element,"div","Bar","rightBar","");
    $statusYel =  createElement($rightBar,"h2","h2 playerYel","statusYel","");
    $statusBlu =  createElement($rightBar,"h2","h2 playerBlu","statusBlu","");
    $statusGre =  createElement($rightBar,"h2","h2 playerGre","statusGre","");
    $statusRed =  createElement($rightBar,"h2","h2 playerRed","statusRed","");

    //SMALL CONTAINER TOP (
    let $middle=createElement($containerDiv,"div","middleContDiv","middleContDiv1","");
    $element=createElement($middle,"div","playerSquare playerYel","playerSquareYel","");
    $element.css("background-image","url('images/forest.jpg')");

    createElement($element,"h2","h2","hPlayerYel","");
    $playerImg=createElement($element,"div","player","playerYel","");
    $playerImg.css("background-image","url('images/kingdomYel.jpg')");

    let $posSquare1=createElement($middle,"div","posSquare","posSquare1","");
    $element=createElement($middle,"div","playerSquare playerBlu","playerSquareBlu","");
    $element.css("background-image","url('images/forest.jpg')");
    createElement($element,"h2","h2","hPlayerBlu","");
    $playerImg=createElement($element,"div","player","playerBlu","");
    $playerImg.css("background-image","url('images/kingdomBlu.jpg')");

    //SMALL CONTAINER CENTER
    $middle=createElement($containerDiv,"div","middleContDiv","middleContDiv2","");
    let $posSquare2=createElement($middle,"div","posSquare posSquareCol","posSquare2","");
    $homeClastle=createElement($middle,"div","posSquare posSquareCol","posSquare3","");
    $homeClastle.css("flex-wrap","wrap");
    $homeClastle.css("flex-direction","row");
    $homeClastle.css("background-image","url('images/kingdomHome.jpg')");

    let $posSquare4=createElement($middle,"div","posSquare posSquareCol","posSquare4","");

    //SMALL CONTAINER BOTTOM
    $middle=createElement($containerDiv,"div","middleContDiv","middleContDiv3","");
    $element=createElement($middle,"div","playerSquare  playerGre","playerSquareGre","");
    $element.css("background-image","url('images/forest.jpg')");
    createElement($element,"h2","h2","hPlayerGre","");
    $playerImg=createElement($element,"div","player","playerGre","");
    $playerImg.css("background-image","url('images/kingdomGre.jpg')");

    let $posSquare5=createElement($middle,"div","posSquare","posSquare5","");
    $element=createElement($middle,"div","playerSquare playerRed","playerSquareRed","");
    $element.css("background-image","url('images/forest.jpg')");
    createElement($element,"h2","h2","hPlayerRed","");
    $playerImg=createElement($element,"div","player","playerRed","");
    $playerImg.css("background-image","url('images/kingdomRed.jpg')");

    //POSITIONS CONTAINERS
    for (index = 4; index >=2; index--) {
        createElement($posSquare4,"div","posSquare  posSquareR posSquareCol posSquareRow","line"+(index),"");
        createElement($posSquare1,"div","posSquare posSquareCol ","line"+(index+3),"");
    }

    //POSITIONS CONTAINERs
    for (index = 8; index <=10; index++) {
        createElement($posSquare2,"div","posSquare  posSquareR posSquareCol posSquareRow","line"+(index),"");
        if (index<10){
            createElement($posSquare5,"div","posSquare posSquareCol ","line"+(index+3),"");
        }
    }
    createElement($posSquare5,"div","posSquare posSquareCol ","line"+1,"");

    //positions for ascending positions
    for (index = 8; index >=1; index--) {
        createElement($("#line1"),"div","position","position"+format(index,"0",3),"");
        createElement($("#line4"),"div","position position2" ,"position"+format(index+17,"0",3),"");
        createElement($("#line5"),"div","position","position"+format(index+25,"0",3),"");
        createElement($("#line8"),"div","position position2","position"+format(index+42,"0",3),"");

    }
    createElement($("#line6"),"div","position","position"+format(34,"0",3),"");
    createElement($("#line9"),"div","position position2","position"+51,"" );

    //positions for decrecing positions

    for (index = 9; index <=16; index++) {
        createElement($("#line2"),"div","position position2","position"+format(index,"0",3),"");
        createElement($("#line7"),"div","position","position"+format(index+26,"0",3),"");
        createElement($("#line10"),"div","position position2","position"+format(index+43,"0",3),"");
        createElement($("#line11"),"div","position","position"+format(index+51,"0",3),"");
    }

    for (index = 75; index >=69; index--) {
        createElement($("#line12"),"div","position  playerRed","position"+format(index,"0",3),"");
        createElement($("#line3"),"div","position position2 playerBlu","position"+format(index+7,"0",3),"");
    }

    createElement($("#line12"),"div","position","position"+format(68,"0",3),"");
    createElement($("#line3"),"div","position position2","position"+format(17,"0",3),"");

    for (index = 83; index <=89; index++) {
        createElement($("#line6"),"div","position playerYel","position"+format(index,"0",3),"");
        createElement($("#line9"),"div","position position2 playerGre","position"+format(index+7,"0",3),"");
    }
    //testing
    for (index =1 ; index < 20; index++){
        let trapPosition=Math.floor(Math.random()*96)+1;
        $(`#position0${trapPosition}`).data({'trap':"bomb"});
   }
}


