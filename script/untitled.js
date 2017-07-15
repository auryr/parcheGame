var diceImages=[];
var $arrayPositions;
var currentPlayer=1;
var $score;
var $turn;
var dicePoints = 0;
var anotherChance=false;
var $dice1;
var $dice2;
var arrayGameInfo=[];
var $myModal;
var $homeClastle;
var $infoPositions;
var $winner;



function createBoard(){
    let index=0;
    let $element  =$("#mainDiv");

    //left bar
    const $scoreBar=createElement($element,"div","scoreBar","scoreBar","");
    $myModal=createElement($element,"div","myModal","myModal","");
    $winner=createElement($myModal,"div","h1","winner","");
    let $ele=createElement($scoreBar,"div","diceContainer","diceContainer","");
    $dice1=createElement($ele,"div","dice","dice1","");
    $dice1.css("background-image",`url('images/side1.jpg`);

    $dice2=createElement($ele,"div","dice","dice2","");
    $dice2.css("background-image",`url('images/side1.jpg`);
    createElement($scoreBar,"button","myButton","rollDices","ROLL DICES");
    createElement($scoreBar,"h1","h1","score","00");
    createElement($scoreBar,"h1","h1","turn","Player turn");

    //MAIN CONTAINER
    const $containerDiv=createElement($element,"div","containerDiv","containerDiv","");

    //SMALL CONTAINER TOP (
    let $middle=createElement($containerDiv,"div","middleContDiv","middleContDiv1","");
    $element=createElement($middle,"div","playerSquare playerYel","playerSquareYel","");
    createElement($element,"div","player","playerYel","");

    let $posSquare1=createElement($middle,"div","posSquare","posSquare1","");
    $element=createElement($middle,"div","playerSquare playerBlu","playerSquareBlu","");
    createElement($element,"div","player","playerBlu","");

    //SMALL CONTAINER CENTER
    $middle=createElement($containerDiv,"div","middleContDiv","middleContDiv2","");
    let $posSquare2=createElement($middle,"div","posSquare posSquareCol","posSquare2","");
    $homeClastle=createElement($middle,"div","posSquare posSquareCol","posSquare3","");
    let $posSquare4=createElement($middle,"div","posSquare posSquareCol","posSquare4","");

    //SMALL CONTAINER BOTTOM
    $middle=createElement($containerDiv,"div","middleContDiv","middleContDiv3","");
    $element=createElement($middle,"div","playerSquare  playerGre","playerSquareGre","");
    createElement($element,"div","player","playerGre","");
    let $posSquare5=createElement($middle,"div","posSquare","posSquare5","");
    $element=createElement($middle,"div","playerSquare playerRed","playerSquareRed","");
    createElement($element,"div","player","playerRed","");

    //POSITIONS CONTAINERs
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
        createElement($("#line3"),"div","position position2 playerBlu","position"+format(index+8,"0",3),"");
    }

    createElement($("#line12"),"div","position","position"+format(68,"0",3),"");
    createElement($("#line3"),"div","position position2","position"+format(17,"0",3),"");

    for (index = 84; index <=90; index++) {
        createElement($("#line6"),"div","position playerYel","position"+format(index,"0",3),"");
        createElement($("#line9"),"div","position position2 playerGre","position"+format(index+8,"0",3),"");
    }

    $("#position039").css("background-image","url('images/troll.jpg')");
    $("#position022").css("background-image","url('images/troll.jpg')");
    $("#position056").css("background-image","url('images/troll.jpg')");
    $("#position005").css("background-image","url('images/troll.jpg')");

    $("#position039").css("background-color","yellow");
    $("#position022").css("background-color","blue");
    $("#position056").css("background-color","green");
    $("#position005").css("background-color","red");


    $("#position075").css("background-image","url('images/bridge.jpg')");
    $("#position075").data({'troll':"troll"})
    $("#position083").css("background-image","url('images/bridge.jpg')");
    $("#position083").data({'troll':"troll"})
    $("#position090").css("background-image","url('images/bridge.jpg')");
    $("#position090").data({'troll':"troll"})
    $("#position098").css("background-image","url('images/bridge.jpg')");
    $("#position098").data({'troll':"troll"})

}


function assignPlayers(id,name,startPos,jumpPos,breakPos,entracePos,endPos){
    var player={
        playerId:id,
        playerName:name,
        statingPosition: startPos,
        jumpPosition:jumpPos,
        breakPosition:breakPos,
        entrancePosition:entracePos,
        endPosition: endPos, //entracePos+6,
        currentPos:[startPos,startPos,startPos,startPos]
//        currentPos:[38,38,38,38]
    }
    arrayGameInfo.push(player);
}

assignPlayers('playerYel','Yellow',38,68,34,84,90);
assignPlayers('playerBlu','Blue'  ,21,68,17,77,83);
assignPlayers('playerGre','Green' ,55,68,51,92,98);
assignPlayers('playerRed','Red'   ,04,-1,68,69,75);


function createElement($parent,elementType,elementClass,elementId,content){
    let $createdElement = $(`<${elementType}>`,{id:elementId, class:elementClass,text:content});
    $($parent).append($createdElement);
    return $createdElement;
}

function createPieces(){
    let $arrayPlayer=$(".player");
    let arrayClass=["Yel","Blu","Gre","Red"];
    let k=0;
    for (let $element of $arrayPlayer){
        for (let i=1; i <= 4 ; i++){
            let $piece =createElement($($element),"div",`pieces player${arrayClass[k]}`, `piece${arrayClass[k]}`+i);
            $piece.data({'player': $element.id ,"piece":i-1});
        }
        k++;
    }
}

function rollDices(){
    anotherChance=false;
    if (dicePoints>0) {
        alert("You already rolled the dice. Move the piece");
        return;
    }
    var audio = new Audio('media/rolling.mp3');
    //audio.play()
    let id = setInterval(getValue, 120);
    let times=0;

    function getValue(){
        let valueDice1= Math.floor(Math.random()*6)+1;
        let valueDice2= Math.floor(Math.random()*6)+1;

        if(times<= Math.floor(Math.random()*15)+1){
            times=times+1;
            $dice1.css("background-image",`url('${diceImages[valueDice1-1]}')`);
            $dice2.css("background-image",`url('${diceImages[valueDice2-1]}')`);
            (valueDice1===valueDice2) ? anotherChance =true : anotherChance =false;
            dicePoints=valueDice1+valueDice2;
            $score.text(`Move ${dicePoints} positions`);
        }
        else{
            if (anotherChance){
                alert("DOUBLES!!! \nThe player gets an extra turn ")
            };
            clearInterval(id);
        }
    }
}

function format(value,myChar,size){
    var myValue=value.toString();
    var k=myValue.length;
    while (k< size ){
        myValue=myChar+ myValue;
        k=myValue.length ;
    }
    return myValue;
}

function checkMovement($element){
    let myPlayer= $element.data('player');
    let currentPiece= $element.data('piece');

    if (myPlayer!=arrayGameInfo[currentPlayer].playerId){
        alert(`The players are only allowed to move thir own pieces.\n This is not your piece`);
        return;
    }

    if (dicePoints==0){
        alert("You must roll the dices first");
        return;
    }

    movePieces(dicePoints,$element);

}

function movePieces(steps,$movingPiece){
    let currentPiece= $movingPiece.data('piece');
    let timer=250;
    var winningGame=false;


    let currentPos=arrayGameInfo[currentPlayer].currentPos[currentPiece];

    let pos=0;
    let id = setInterval(nextPos, timer);

    steps=73;
    //currentPos=37;
    function nextPos(){
        let homePosition =false;
        currentPos++;
        pos++;

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
            alert(arrayGameInfo[currentPlayer].endPosition);
            homePosition=true;
            $newParent=$homeClastle;
            setTimeout(function(){winningGame=checkWinner($movingPiece.data('player'))},20)
        }

        $newParent.append($child);

        //reasingning values
        if (winningGame){
            dicePoints-=pos;
            steps=pos;
        }
        //
        if(pos===steps){
            arrayGameInfo[currentPlayer].currentPos[currentPiece]=currentPos;
            clearInterval(id);
            if (!homePosition) {
                retreatPieces($movingPiece.data('player'),$newParent,$movingPiece);
            }
            //$("#rollDices").prop("disabled", false);;
        }
    }

    //making sure this part doesn't execute until the piece is moved
    setTimeout( function(){
        if(!anotherChance){
           currentPlayer===3 ? currentPlayer=0 : currentPlayer++;
        }
        $turn.text(`Player turn : ${arrayGameInfo[currentPlayer].playerName}`);
        dicePoints=0;
    },  steps*(timer+20));

}

window.onload = function() {
    createBoard();
    createPieces();

    var audio = new Audio('media/entranceSound.mp3');
    //audio.play()

    let i=0;
    //array with the images
    while (i<6){
        diceImages[i]="images/side"+(i+1) +".jpg";
        i++;
    }
    // getting players name
    for (i=1; i<=4; i++){
        //arrayGameInfo[i-1].playerName=prompt(`Player ${i} name`, `Player ${i}`);
    }

    // adding the events
    $("#rollDices").on("click", function(){
       //$("#rollDices").prop("disabled", true);;
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

    })

    $score=$("#score");
    $turn = $("#turn");
    $turn.text(`Player's turn ${arrayGameInfo[currentPlayer].playerName}`);
    //presenting the pos number
    $arrayPositions=$(".position");
    for (let $position of $arrayPositions){
        $($position).text(($($position).attr("id")).substring(8,11));
    }
}


function assignAttribute($element, attribute, value){
    $($element).css(attribute,value);
}

function checkWinner(player){
    let $piecesInCastle=$(`#posSquare3 > .${player}`);
    console.log($piecesInCastle.length);
    if ($piecesInCastle.length===4){
        celebration();
        return true
    }
}

function celebration(){
    alert("${arrayGameInfo[currentPlayer].playerName} IS THE WINNER");
    $($myModal).css("background-image" , `url('images/castle.gif`)
    $($myModal).css("display" , "block")
    $($winner).text("${arrayGameInfo[currentPlayer].playerName} IS THE WINNER");

    var audio = new Audio('media/winningsound.mp3');
    //audio.play()

}

function traps(player,$position,$movingPiece){
    let $elementsInthePosition=$("> div",$position);
    let otherPlayer;
    var audio = new Audio('media/reteat.mp3');
    var movedPlayer=false;

    for(let index=0; index < $elementsInthePosition.length; index++){
        otherPlayer=$(`#${$elementsInthePosition[index].id}`).data("player");
        if  (otherPlayer != player){

            $(`#${otherPlayer}`).append($elementsInthePosition[index]);
            console.log( "Clid", $("#"+$elementsInthePosition[index].id).data("player"), "current", player)
        }
    }
}

function retreatPieces(player,$position,$movingPiece){
    let $elementsInthePosition=$("> div",$position);
    let otherPlayer;
    var audio = new Audio('media/reteat.mp3');
    var movedPlayer=false;

    for(let index=0; index < $elementsInthePosition.length; index++){
        otherPlayer=$(`#${$elementsInthePosition[index].id}`).data("player");
        if  (otherPlayer != player){
            $(`#${otherPlayer}`).append($elementsInthePosition[index]);
            movedPlayer=true;
            console.log( "Clid", $("#"+$elementsInthePosition[index].id).data("player"), "current", player)
        }
    }
    if (movedPlayer){
        //audio.play()

    }
}


function resetGame(){

}





