
function randomNb(start,end){
    let nb=Math.random();
    nb*=(end);
    nb=Math.floor(nb);
    nb+=start;
    return nb;
}

function test(){
    console.log("test");
}

/* let hit=document.getElementById("hit");
hit.disabled=true; */
let cards=[];
let sum=0;
disButtons()

function newGame(){
    cards=[];
    sum=0;
    document.getElementById("hit").disabled=false;
    document.getElementById("stand").disabled=false;
    document.getElementById("cards-box").innerHTML="";
    for (let i=0;i<2;i++){
        hit()
    }
    //renderGame();
}

function disButtons(){
    document.getElementById("hit").disabled=true;
    document.getElementById("stand").disabled=true;
    document.getElementById("split").disabled=true;
    //console.log("disabled buttons")
}

function renderGame(){
    cardType=randomNb(1,4);
    if (cardType===1){cardType="Clubs";}
    else if (cardType===2){cardType="Diamonds";}
    else if (cardType===3){cardType="Hearts";}
    else if (cardType===4){cardType="Spades";}
    cardTag='<img class="card" src="img/Flat Playing Cards Set/'+cardType+'/'+cards[cards.length-1]+'.png" alt="">';
    document.getElementById("cards-box").innerHTML+=cardTag;
    if (sum>21 && cards.indexOf("A")!=-1){
        sum-=10;
        cards[cards.indexOf("A")]="A f"
    }
    document.getElementById("sum").innerHTML="Sum: " + sum;
    if (sum>21){
        disButtons();
        document.getElementById("sum").innerHTML+=" - You have busted! Tough luck.";
    }
    if (sum===21){
        disButtons();
        document.getElementById("sum").innerHTML+=" - You have got Blackjack!";
    }
    //console.log(cards,sum);
}

function stand(){
    disButtons()
}

function hit(){
    let randomCard=randomNb(1,13);
    let randomCardValue;
    if (randomCard>10){
        randomCardValue=10;
        if (randomCard===11){
            randomCard="J";
        }
        else if (randomCard===12){
            randomCard="Q";
        }
        else if (randomCard===13){
            randomCard="K";
        }
    }
    else if (randomCard===1){
        randomCardValue=11;
        randomCard="A"
    }
    else {
        randomCardValue=randomCard;
    }
    cards.push(randomCard);
    sum+=randomCardValue;
    renderGame();
}
