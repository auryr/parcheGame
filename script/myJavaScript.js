

function createElement($parent,elementType,elementClass,elementId,content){
    let $createdElement = $(`<${elementType}>`,{id:elementId, class:elementClass,text:content});
    $($parent).append($createdElement);
    return $createdElement;
}

function createBoard(){
    let index=0;
    let $element  =$("#mainDiv");
    //MAIN CONTAINER
    const $scoreBar=createElement($element,"div","scoreBar","scoreBar","","");
    const $dice1=createElement($scoreBar,"div","dice","dice1","","");
    const $dice2=createElement($scoreBar,"div","dice","dice2","","");

    const $containerDiv=createElement($element,"div","containerDiv","containerDiv","","");

    //SMALL CONTAINER TOP (
    var $middle=createElement($containerDiv,"div","middleContDiv","middleContDiv1","");
    $element=createElement($middle,"div","playerSquare playerA","playerSquare1","");
    createElement($element,"div","player","player1","");
    let $posSquare1=createElement($middle,"div","posSquare","posSquare1","");
    $element=createElement($middle,"div","playerSquare playerB","playerSquare2","");
    createElement($element,"div","player","player2","");

    //SMALL CONTAINER CENTER
    $middle=createElement($containerDiv,"div","middleContDiv","middleContDiv2","");
    let $posSquare2=createElement($middle,"div","posSquare posSquareCol","posSquare2","");
    createElement($middle,"div","posSquare posSquareCol","posSquare3","");
    let $posSquare4=createElement($middle,"div","posSquare posSquareCol","posSquare4","");

    //SMALL CONTAINER BOTTOM
    $middle=createElement($containerDiv,"div","middleContDiv","middleContDiv3","");
    $element=createElement($middle,"div","playerSquare  playerC","playerSquare3","");
    createElement($element,"div","player","player3","");
    let $posSquare5=createElement($middle,"div","posSquare","posSquare5","");
    $element=createElement($middle,"div","playerSquare playerD","playerSquare4","");
    createElement($element,"div","player","player4","");


    for (index = 4; index >=2; index--) {
        createElement($posSquare4,"div","posSquare  posSquareR posSquareCol posSquareRow","line"+(index),index);
        createElement($posSquare1,"div","posSquare posSquareCol ","line"+(index+3),(index+3));
    }

    //POSITIONS CONTAINER
    for (index = 8; index <=10; index++) {
        createElement($posSquare2,"div","posSquare  posSquareR posSquareCol posSquareRow","line"+(index),index);
        if (index<10){
            createElement($posSquare5,"div","posSquare posSquareCol ","line"+(index+3),(index+3));
        }
    }
    createElement($posSquare5,"div","posSquare posSquareCol ","line"+1,1);


    for (index = 8; index >=1; index--) {
        createElement($("#line1"),"div","position","position"+index,index);
        createElement($("#line4"),"div","position position2" ,"position"+(index+17),(index+17));
        createElement($("#line5"),"div","position","position"+(index+25),(index+25));
        createElement($("#line8"),"div","position position2","position"+(index+42),(index+42));

    }
    createElement($("#line6"),"div","position","position"+34,34);
    createElement($("#line9"),"div","position position2","position"+51,51 );

    for (index = 9; index <=16; index++) {
        createElement($("#line2"),"div","position position2","position"+index,index);
        createElement($("#line7"),"div","position","position"+(index+26),(index+26));
        createElement($("#line10"),"div","position position2","position"+(index+43),(index+43));
        createElement($("#line11"),"div","position","position"+(index+51),(index+51));
    }

    for (index = 75; index >=69; index--) {
        createElement($("#line12"),"div","position  playerD","position"+index,index);
        createElement($("#line3"),"div","position position2 playerB","position"+index+8,index+8);
    }

    createElement($("#line12"),"div","position","position"+68,68);
    createElement($("#line3"),"div","position position2","position"+17,17);

    for (index = 84; index <=91; index++) {
        createElement($("#line6"),"div","position playerA","position "+(index),(index));
        createElement($("#line9"),"div","position position2 playerC","position"+(index+8),(index+8));
    }

}


function createPieces(){
    let $arrayPlayer=$(".player");

    for (let $element of $arrayPlayer){
        for (let i=1; i <= 4 ; i++){
            createElement($($element),"div",`pieces player$A`,"piece"+i+$element.id,i);
        }
    }
}

window.onload = function() {
    createBoard();
    createPieces();
}
