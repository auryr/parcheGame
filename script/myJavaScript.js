var diceImages=[];
var $arrayElements;
var currentPLayer=0;
var $score;
var $turn;
var dicePoints = 0;
var anotherChance=false;
var $dice1;
var $dice2;

var arrayGameInfo=[];
function assingPlayers(id,name,start,jump,entrace,end){
    var player={
        playerId:id,
        playerName:name,
        statingPosition: start,
        endPosition:end,
        jumpPosition:jump,
        entrancePosition:jump,
        currentPos:[start, start, start, start],
    }
    arrayGameInfo.push(player);
}

assingPlayers('playerYel','Yellow',38,68,34,90);
assingPlayers('playerBlu','Blue',21,68, 17, 98);
assingPlayers('playerGre','Green',55,68,92 ,83);
assingPlayers('playerRed','Red',4, -1,75);


function createElement($parent,elementType,elementClass,elementId,content){
    let $createdElement = $(`<${elementType}>`,{id:elementId, class:elementClass,text:content});
    $($parent).append($createdElement);
    return $createdElement;
}

function createPieces(){
    let $arrayPlayer=$(".player");
    let arrayClass=["Yel","Blu","Gre","Red"];
    k=0;
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

    let id = setInterval(getValue, 120);
    let times=0;
    function getValue(){
        let valueDice1= Math.floor(Math.random()*6)+1;
        let valueDice2= Math.floor(Math.random()*6)+1;
        (valueDice1===valueDice2) ? anotherChance =true : anotherChance =false;
        if(times<=15){
            times=times+1;
            $dice1.css("background-image",`url('${diceImages[valueDice1-1]}')`);
            $dice2.css("background-image",`url('${diceImages[valueDice2-1]}')`);
            dicePoints=17;//valueDice1+valueDice2;
            $score.text(`Move ${dicePoints} positions`);
        }
        else{
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

function movePieces(steps,$movingPiece){
    let myPlayer= $movingPiece.data('player');
    let currentPiece= $movingPiece.data('piece');
    let timer=200;
    if (myPlayer!=arrayGameInfo[currentPLayer].playerId){
        alert(`This is not your piece`);
        return;
    }

    if (steps==0){
        alert("You must roll the dices");
        return;
    }

    let currentPos=arrayGameInfo[currentPLayer].currentPos[currentPiece];

    let pos=0;
    let id = setInterval(nextPos, timer);
    function nextPos(){
        currentPos++;
        pos++;
        if (currentPos===68){
            alert(arrayGameInfo[currentPLayer].jumpPosition);
        }
        if (currentPos-1 === arrayGameInfo[currentPLayer].jumpPosition){
            currentPos=1;
        }
        let $Newparent=$("#position" +format(currentPos,"0",3));
        let $child=$movingPiece;
        $Newparent.append($child);

        if(pos===steps){
            arrayGameInfo[currentPLayer].currentPos[currentPiece]=currentPos;
            clearInterval(id)
        }

    }

    setTimeout( function(){
        if(!anotherChance){
           currentPLayer===3 ? currentPLayer=0 : currentPLayer++;
        }
        $turn.text(`Player turn : ${arrayGameInfo[currentPLayer].playerName}`);
        dicePoints=0;
        alert("anoter player");
    },  steps*(timer+20));



}

function checkMovement($element){

    movePieces(dicePoints,$element);


}

window.onload = function() {
    createBoard();
    createPieces();

    let i=0;
    //array with the images
    while (i<6){
        diceImages[i]="images/side"+(i+1) +".jpg";
        i++;
    }

    for (i=1; i<=4; i++){
        //arrayGameInfo[i-1].playerName=prompt(`Player ${i} name`, `Player ${i}`);
    }

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
    $score=$("#score");
    $turn = $("#turn");
    $turn.text(`Current player ${arrayGameInfo[currentPLayer].playerName}`);

    $arrayElements=$(".position");
    for (let $position of $arrayElements){
        $($position).text(($($position).attr("id")).substring(9,11));
    }



}

function createBoard(){
    let index=0;
    let $element  =$("#mainDiv");

    //left bar
    const $scoreBar=createElement($element,"div","scoreBar","scoreBar","");
    let $ele=createElement($scoreBar,"div","diceContainer","diceContainer","");
    $dice1=createElement($ele,"div","dice","dice1","");
    $dice1.css("background-image",`url('images/side1.jpg`);

    $dice2=createElement($ele,"div","dice","dice2","");
    $dice2.css("background-image",`url('images/side1.jpg`);
    createElement($scoreBar,"button","myButton","rollDices","Roll dices");
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
    createElement($middle,"div","posSquare posSquareCol","posSquare3","");
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

    $("#position039").css("background-color","yellow");
    $("#position022").css("background-color","blue");
    $("#position056").css("background-color","green");
    $("#position005").css("background-color","red");


}
