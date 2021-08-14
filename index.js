function randomNb(start, end) {
    let nb = Math.random();
    nb *= (end);
    nb = Math.floor(nb);
    nb += start;
    return nb;
}

function test() {
    console.log("test");
}

/* let hit=document.getElementById("hit");
hit.disabled=true; */
let cards = [];
let sum = 0;
let deck;
let numberOfDecks=2;
let hands=0;
disButtons()
document.getElementById("cards-box").style.display="block";
document.getElementById("split-wrap").style.display="none";
//createDeck();

function newGame() {
    cards = [];
    sum = 0;
    document.getElementById("hit").disabled = false;
    document.getElementById("stand").disabled = false;
    //document.getElementById("resetDeck").disabled = false;
    document.getElementById("cards-box").style.display="block";
    document.getElementById("split-wrap").style.display="none";
    document.getElementById("cards-box").innerHTML = "";
    for (let i = 0; i < 2; i++) {
        hit();
    }
    //renderGame();
    //console.log(cards);
    if (false/* cards[0]===cards[1] */){
        document.getElementById("split").disabled = false;
    }
}

function split(){
    //console.log("split");
    document.getElementById("cards-box").style.display="none";
    document.getElementById("split-wrap").style.display="block";
    if (hands===0){
        hands++;
        let newHand=
        document.getElementById("split-wrap").insertAdjacentHTML("beforeend",newHand);
    }
}

function disButtons() {
    document.getElementById("hit").disabled = true;
    document.getElementById("stand").disabled = true;
    document.getElementById("split").disabled = true;
    //document.getElementById("resetDeck").disabled = true;
    //console.log("disabled buttons")
}

function renderGame() {
    cardType = randomNb(1, 4);
    if (cardType === 1) {
        cardType = "Clubs";
    } else if (cardType === 2) {
        cardType = "Diamonds";
    } else if (cardType === 3) {
        cardType = "Hearts";
    } else if (cardType === 4) {
        cardType = "Spades";
    }
    cardTag = '<img class="card" src="img/Flat Playing Cards Set/' + cards[cards.length - 1] + '/' + cards[cards.length - 2] + '.png" alt="">';
    document.getElementById("cards-box").insertAdjacentHTML("afterbegin", cardTag);//+= cardTag;
    if (sum > 21 && cards.indexOf("A") != -1) {
        sum -= 10;
        cards[cards.indexOf("A")] = "hard";
    }
    document.getElementById("sum").innerHTML = "Sum: " + sum;
    if (sum > 21) {
        //disButtons();
        document.getElementById("sum").innerHTML += " - You have busted! Tough luck.";
    }
    if (sum === 21) {
        disButtons();
        document.getElementById("sum").innerHTML += " - You have got Blackjack!";
    }
    //console.log(cards,sum);
}

function stand() {
    disButtons()
}

function hit() {
    let randomCardDeck = randomNb(1, deck.length-1);
    //console.log(randomCardDeck)
    let randomCard=deck[randomCardDeck]['value'];
    let currentSuit=deck[randomCardDeck]['suit'];
    deck.splice(randomCardDeck,1);
    //console.log(randomCardDeck,randomCard,currentSuit);
    let randomCardValue;
    if (randomCard > 10) {
        randomCardValue = 10;
        if (randomCard === 11) {
            randomCard = "J";
        } else if (randomCard === 12) {
            randomCard = "Q";
        } else if (randomCard === 13) {
            randomCard = "K";
        }
    } else if (randomCard === 1) {
        randomCardValue = 11;
        randomCard = "A"
    } else {
        randomCardValue = randomCard;
    }
    cards.push(randomCard);
    cards.push(currentSuit);
    sum += randomCardValue;
    //console.log(deck)
    renderGame();
    if (deck.length <= numberOfDecks*52*0.3){
        createDeck();
        //console.log(deck)

    }
}

function createDeck() {
    deck=[];
    let cardsToAdd=[1,2,3,4,5,6,7,8,9,10,11,12,13];
    let suitsToAdd=['Clubs','Spades','Diamonds','Hearts'];
    for (let k=0; k<numberOfDecks; k++){
        for (let i=0;i<cardsToAdd.length;i++){
            for (let j=0;j<suitsToAdd.length;j++){
                let card={'value':cardsToAdd[i],'suit':suitsToAdd[j]};
                deck.push(card);
            }
        }
    }
    
    //console.log(numberOfDecks)
}
createDeck()
// console.log(deck[4])
// console.log(deck[4]["value"])

function changeDeckHTML(){
    numberOfDecks=parseInt(document.getElementById("deckHTML").value);
    if (isNaN(numberOfDecks)){
        numberOfDecks=2;
    }
    //console.log(numberOfDecks)
    createDeck();
}