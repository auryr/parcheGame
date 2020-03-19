var currentPlayer;

var diceImages=[];
var $arrayPositions;
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
var $statusL=[];
var $statusYel;
var $statusBlu;
var $statusGre;
var $statusRed;

// prototype information about the players and game status
function gameStatus(id,name,startPos,jumpPos,breakPos,entracePos,endPos,is_used,is_host){
    this.playerId=id;
    this.playerName=name;
    this.statingPosition= startPos;
    this.jumpPosition=jumpPos;
    this.breakPosition=breakPos;
    this.entrancePosition=entracePos;
    this.endPosition= endPos;
    this.currentPos=[startPos,startPos,startPos,startPos];
    this.inUse=is_used;
    this.isHost=is_host;
}

createPlayerOnj();
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

function createPlayerOnj(){
    var yellowPlayer= new gameStatus('playerYel','Yellow',38,68,34,84,88,false,false);
    var bluePlayer=   new gameStatus('playerBlu','Blue'  ,21,68,17,77,81,false,false);
    var greenPlayer=  new gameStatus('playerGre','Green' ,55,68,51,92,95,false,false);
    var redPlayer=    new gameStatus('playerRed','Red'   ,04,-1,68,69,74,false,false);
    arrayGameInfo.push(yellowPlayer,bluePlayer,greenPlayer,redPlayer);
}

//reset game
function setGameValues(){
    // choosing first player
    currentPlayer=Math.floor(Math.random()*4);
    dicePoints = 0;
    anotherChance=false;
    let pos=0;
    pos=arrayGameInfo[0].statingPosition;arrayGameInfo[0].currentPos=[pos,pos,pos,pos];
    pos=arrayGameInfo[1].statingPosition;arrayGameInfo[1].currentPos=[pos,pos,pos,pos];
    pos=arrayGameInfo[2].statingPosition;arrayGameInfo[2].currentPos=[pos,pos,pos,pos];
    pos=arrayGameInfo[3].statingPosition;arrayGameInfo[3].currentPos=[pos,pos,pos,pos];

    presentGameStatus();
    $turn.text(`Player's turn : ${arrayGameInfo[currentPlayer].playerName}`);

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
function rollDices(valueDice1, valueDice2){
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
        // let valueDice1= Math.floor(Math.random()*6)+1;
        // let valueDice2= Math.floor(Math.random()*6)+1;

        if(times<=15/* testing Math.floor(Math.random()*15)+1*/){
            times=times+1;
            $dice1.css("background-image",`url('${diceImages[valueDice1-1]}')`);
            $dice2.css("background-image",`url('${diceImages[valueDice2-1]}')`);
            (valueDice1===valueDice2) ? anotherChance =true : anotherChance =false;
            dicePoints=valueDice1+valueDice2;
            $score.text(`Move ${dicePoints} positions`);
        }else{
            if (anotherChance){// if the player get the same number in the dices then gets another turn
                let dblAudio = new Audio('media/double.mp3');
                dblAudio.play()
                alert("DOUBLES!!! \nThe kingdom gets an extra turn");
            }
            clearInterval(id);
            $($protector).css("display" , "none");
        }
    }
}

function format(value,myChar,size){
    let myValue=value.toString();
    let k=myValue.length;
    while (k< size ){
        myValue=myChar+ myValue;
        k=myValue.length ;
    }
    return myValue;// formar a string depending of the size passed as a parameter
}


function checkMovement($element){//validation before moving the pieces
    let myPlayer= $element.data('player');
    let currentPiece= $element.data('piece');


    if (myPlayer!=arrayGameInfo[currentPlayer].playerId){// verifying the player only moves their own pieces
        alert(`The kingdoms are only allowed to move their own warriors. \nThis is not your  warrior`);
        return;
    }

    if (dicePoints==0){
        alert("You must roll the dices first");
        return;
    }
    const piece_pkg = {
        el_id: $element.context.id,
        player: myPlayer,
        piece: currentPiece
    }
    // movePieces(dicePoints,$element);
    // console.log(piece_pkg)
    socket.emit('move piece', dicePoints, piece_pkg);
}

function playerStatus(status,$playerSta){
    let labelText="";
    for(let i=0;i<status.currentPos.length;i++){
        labelText+=`[${arrayCharacter[i]} ${status.currentPos[i]-status.statingPosition}] `;
    }
    $playerSta.text(`${status.playerName} position ${labelText}`);
    $playerSta.css("border","2px double")
}

function presentGameStatus(){
    playerStatus(arrayGameInfo[0],$statusYel);
    playerStatus(arrayGameInfo[1],$statusBlu);
    playerStatus(arrayGameInfo[2],$statusGre);
    playerStatus(arrayGameInfo[3],$statusRed);
}

function movePieces(steps, piece_pkg){//moving the pieces
    // let currentPiece= $movingPiece.data('piece');
    const {el_id, player, piece} = piece_pkg;
    let timer=380;
    let winningGame=false;
    let remaingSteps=0;

    let currentPos=arrayGameInfo[currentPlayer].currentPos[piece];

    $('')

    let pos=0;
    let id = setInterval(nextPos, timer);
    // testing  currentPos=38;steps=73;
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
        // let $child=$movingPiece;
        let $child = $(`#${el_id}`)
        // check end position.
        if (currentPos-1 >arrayGameInfo[currentPlayer].endPosition){
            //moving to castle(home)
            homePosition=true;
            pos=steps;
            $newParent=$homeClastle;
            setTimeout(function(){winningGame=checkWinner(player)},20)
        }

        $newParent.append($child);
        //reasingning values
        if (winningGame){
            dicePoints-=pos;
            steps=pos;
        }
        //last move
        if(pos===steps){
            arrayGameInfo[currentPlayer].currentPos[piece]=currentPos;
            clearInterval(id);

            if (!homePosition) {
                retreatPieces(player,$newParent,$child);// cheking if there are other pieces in that position
                traps(player,$newParent,$child); //checking if the actual position is a trap
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
        (winningGame)? setGameValues() : 0;
    },  steps*(timer+5));
}
socket.on('move piece', (dicePoints, pkg) => {
    movePieces(dicePoints, pkg);
});

socket.emit('random player', Math.floor(Math.random()*4));
const onload = (randomPlayer, {username, isHost}, connections) => { 
    function load_game(){
        currentPlayer = starting_player;

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

        presentGameStatus();
        // adding the events
        $("#rollDices").on("click", function(){
            // rollDices();
            let valueDice1= Math.floor(Math.random()*6)+1;
            let valueDice2= Math.floor(Math.random()*6)+1;

            socket.emit('roll dice', valueDice1, valueDice2);
        });
        socket.on('roll dice', (one, two) => {
            rollDices(one, two);
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
            //testing $($position).text(($($position).attr("id")).substring(8,11));
        }

        //refact
        $("#position039").css("background-image","url('images/trollYel.jpg')");
        $("#position022").css("background-image","url('images/trollBlu.jpg')");
        $("#position056").css("background-image","url('images/trollGre.jpg')");
        $("#position005").css("background-image","url('images/trollRed.jpg')");

        $("#position039, #position022, #position056, #position005").data({'trap':"troll"});

        $("#position075, #position089").css("background-image","url('images/bridge2.jpg')");
        $("#position082, #position096").css("background-image","url('images/bridge.jpg')");

        $("#hPlayerYel").text(arrayGameInfo[0].playerName);
        $("#hPlayerBlu").text(arrayGameInfo[1].playerName);
        $("#hPlayerGre").text(arrayGameInfo[2].playerName);
        $("#hPlayerRed").text(arrayGameInfo[3].playerName);
    }

    socket.on('start game!', () => {
        console.log('can we get a move on')     
        load_game()
    });

    const mainEl = (el) => document.querySelector(el);
    const createEl = (el) => document.createElement(el);
    const getEls = (els) => document.getElementsByClassName(els);
    
    function count_inuse(arr){
        let count = 0;
        for (let obj of arr){
            const list = Object.keys(obj);
            for (let it of list){
                if (it === 'inUse'){
                    if (obj[it]) count++;
                }
            }
        }
        return count;
    }

    function load_modal(){
        const coverPage = createEl('div');
        coverPage.style.backgroundImage = "url('../media/cover.png')";
        coverPage.style.backgroundRepeat = "no-repeat";
        coverPage.style.backgroundSize = "cover";
        coverPage.style.height = "100%";
        coverPage.style.width = "100%";

        const modal = createEl('div');
        modal.setAttribute('class', 'modal');

        const coverForm = createEl('div');
        coverForm.setAttribute('class', 'modal-content');

        const welcome = createEl('h2');
        welcome.innerText = `Welcome ${username}! \n Please choose a kingdom`;
        coverForm.appendChild(welcome);

        const player1 = createEl('p');
        player1.onclick = (e) => assign_kingdom(e);
        player1.innerText = 'Yellow Kingdom:';
        player1.innerHTML += `<button class="kingdomChoice" id="${arrayGameInfo[0].playerId}" value="0">CHOOSE</button>`;
        coverForm.appendChild(player1);

        const player2 = createEl('p');
        player2.onclick = (e) => assign_kingdom(e);
        player2.innerText = 'Blue Kingdom:';
        player2.innerHTML += `<button class="kingdomChoice" id="${arrayGameInfo[1].playerId}" value="1">CHOOSE</button>`;
        coverForm.appendChild(player2);

        const player3 = createEl('p');
        player3.onclick = (e) => assign_kingdom(e);
        player3.innerText = 'Green Kingdom:';
        player3.innerHTML += `<button class="kingdomChoice" id="${arrayGameInfo[2].playerId}" value="2">CHOOSE</button>`;
        coverForm.appendChild(player3);

        const player4 = createEl('p');
        player4.onclick = (e) => assign_kingdom(e);
        player4.innerText = 'Red Kingdom:';
        player4.innerHTML += `<button class="kingdomChoice" id="${arrayGameInfo[3].playerId}" value="3">CHOOSE</button>`;
        coverForm.appendChild(player4);

        if (isHost && count_inuse(arrayGameInfo) === connections){
            const submit = document.createElement('button');
            submit.innerText = 'START';
            submit.onclick = () => {
                socket.emit('start game!');
            }

            coverForm.appendChild(submit);
        } 

        modal.appendChild(coverForm);
        coverPage.appendChild(modal);
        mainEl(".mainDiv").innerHTML = "";
        mainEl(".mainDiv").appendChild(coverPage);
    }

    function assign_kingdom(e){
        const val = e.target.value;

        arrayGameInfo[val].playerName=(name + "'s KINGDOM").toUpperCase(); 
        arrayGameInfo[val].inUse=true; 
        // mainEl('.joinGame').innerHTML = "Wait for host...";
        load_modal();

        // if (isHost && count_inuse(arrayGameInfo) === conns) {
        //     arrayGameInfo[0].playerName=(name + "'s KINGDOM").toUpperCase(); 
        //     arrayGameInfo[0].inUse=true; 
        //     mainEl('.joinGame').innerHTML = "Wait for host...";
        //     load_modal(name, conns);
        // } 
        // else {
        //     arrayGameInfo[position-1].playerName=(name + "'s KINGDOM").toUpperCase(); 
        //     arrayGameInfo[position-1].inUse=true; 
        //     mainEl('.joinGame').innerHTML = "Wait for host...";
        //     load_modal(name, position-1, conns);
        // }
    }
    load_modal();
}
socket.on('random player', (randomPlayer, startingPlayer, connections) => onload(randomPlayer, startingPlayer, connections));

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
    // clear board
    $element.empty();

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
    $homeClastle.css({"flex-wrap":"wrap","flex-direction":"row","background-image":"url('images/kingdomHome.jpg')"});

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

    for (index = 4; index >=2; index--) {//POSITIONS CONTAINERS
        createElement($posSquare4,"div","posSquare  posSquareR posSquareCol posSquareRow","line"+(index),"");
        createElement($posSquare1,"div","posSquare posSquareCol ","line"+(index+3),"");
    }

    for (index = 8; index <=10; index++) {//POSITIONS CONTAINERs
        createElement($posSquare2,"div","posSquare  posSquareR posSquareCol posSquareRow","line"+(index),"");
        if (index<10){
            createElement($posSquare5,"div","posSquare posSquareCol ","line"+(index+3),"");
        }
    }
    createElement($posSquare5,"div","posSquare posSquareCol ","line"+1,"");

    for (index = 8; index >=1; index--) {    //positions for ascending positions
        createElement($("#line1"),"div","position","position"+format(index,"0",3),"");
        createElement($("#line4"),"div","position position2" ,"position"+format(index+17,"0",3),"");
        createElement($("#line5"),"div","position","position"+format(index+25,"0",3),"");
        createElement($("#line8"),"div","position position2","position"+format(index+42,"0",3),"");

    }
    createElement($("#line6"),"div","position","position"+format(34,"0",3),"");
    createElement($("#line9"),"div","position position2","position"+51,"" );

    for (index = 9; index <=16; index++) {    //positions for decrecing positions
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
