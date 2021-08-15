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
let numberOfDecks = 2;
let hands = 0;
let splitDone = false;
let dealerTurn = false;
let dealerSum=0;
let playerSum = 0;
disButtons()
document.getElementById("cards-box").style.display = "block";
document.getElementById("split-wrap").style.display = "none";
//createDeck();

function newGame() {
    cards = [];
    sum = 0;
    document.getElementById("hit").disabled = false;
    document.getElementById("stand").disabled = false;
    //document.getElementById("resetDeck").disabled = false;
    document.getElementById("cards-box").style.display = "block";
    document.getElementById("split-wrap").style.display = "none";
    document.getElementById("cards-box").innerHTML = "";
    for (let i = 0; i < 2; i++) {
        hit();
    }
    //renderGame();
    //console.log(cards);
    if (false /* cards[0]===cards[1] */ ) {
        document.getElementById("split").disabled = false;
    }
    document.getElementById("dealer").innerHTML="Dealer's Score:"
}

function split() {
    console.log("split");
    splitDone=true;
    document.getElementById("cards-box").style.display = "none";
    document.getElementById("split-wrap").style.display = "grid";
    document.getElementById("sum").style.display = "none";
    if (hands === 0) {
        for (let i = 0; i < 2; i++) {
            addHand();
        }
    }
    else{
        addHand();
    }
}

function addHand() {
    hands++;
    let newHand = `
        <div class="hand" id="hand-` + hands + `">
        <div class="split-title">
            HAND ` + hands + `
        </div>
        <div class="split-cards">
            <img class="card" src="img/Flat Playing Cards Set/Clubs/3.png" alt="">
        </div>
        <div class="info">
            <span class="sum" id="sum` + hands + `">Sum: </span>
        </div>
    </div>`;
    document.getElementById("split-wrap").insertAdjacentHTML("beforeend", newHand);
}

function disButtons() {
    document.getElementById("hit").disabled = true;
    document.getElementById("stand").disabled = true;
    document.getElementById("split").disabled = true;
    //document.getElementById("resetDeck").disabled = true;
    //console.log("disabled buttons")
}

function renderGame() {
    cardTag = '<img class="card" src="img/Flat Playing Cards Set/' + cards[cards.length - 1] + '/' + cards[cards.length - 2] + '.png" alt="">';
    document.getElementById("cards-box").insertAdjacentHTML("afterbegin", cardTag); //+= cardTag;
    if (sum > 21 && cards.indexOf("A") != -1) {
        sum -= 10;
        cards[cards.indexOf("A")] = "hard";
    }
    document.getElementById("sum").innerHTML = "Sum: " + sum;
    if (sum > 21) {
        disButtons();
        document.getElementById("sum").innerHTML += " - You have busted! Tough luck.";
        document.getElementById("dealer").innerHTML="You Lost, The Dealer Doesn't Have To Play."
    }
    if (sum === 21) {
        document.getElementById("sum").innerHTML += " - You have got Blackjack!";
        stand();
    }
    //console.log(cards,sum);
}

function stand() {
    disButtons()
    playerSum=sum;
    if (splitDone===false){
        dealerTurn=true;
        dealerPlay();
    }
}

function dealerPlay(){
    dealerSum=0;
    //console.log("dealer play");
    while (dealerSum<17){
        hit();
        //console.log(dealerSum);
    }
    document.getElementById("dealer").innerHTML="Dealer's Score: "+ dealerSum;
    console.log(dealerSum, sum);
    if (dealerSum>21){
        document.getElementById("dealer").innerHTML+=" The Dealer Has Busted. You Win!"
    }
    else if (dealerSum>playerSum){
        document.getElementById("dealer").innerHTML+=" The dealer won!"
    }
    else if (dealerSum<playerSum){
        document.getElementById("dealer").innerHTML+=" You won!"
    }
    else if (dealerSum===playerSum){
        document.getElementById("dealer").innerHTML+=" It is a tie!"
    }
    dealerSum=0;
    dealerTurn=false;
}

function hit() {
    let randomCardDeck = randomNb(1, deck.length - 1);
    //console.log(randomCardDeck)
    let randomCard = deck[randomCardDeck]['value'];
    let currentSuit = deck[randomCardDeck]['suit'];
    deck.splice(randomCardDeck, 1);
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
    //console.log(deck)
    if (dealerTurn===false){
        sum += randomCardValue;
        renderGame();
    }
    else{
        dealerSum+=randomCardValue;
    }
    if (deck.length <= numberOfDecks * 52 * 0.3) {
        createDeck();
        //console.log(deck)

    }
}

function createDeck() {
    deck = [];
    let cardsToAdd = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
    let suitsToAdd = ['Clubs', 'Spades', 'Diamonds', 'Hearts'];
    for (let k = 0; k < numberOfDecks; k++) {
        for (let i = 0; i < cardsToAdd.length; i++) {
            for (let j = 0; j < suitsToAdd.length; j++) {
                let card = {
                    'value': cardsToAdd[i],
                    'suit': suitsToAdd[j]
                };
                deck.push(card);
            }
        }
    }

    //console.log(numberOfDecks)
}
createDeck()
// console.log(deck[4])
// console.log(deck[4]["value"])

function changeDeckHTML() {
    numberOfDecks = parseInt(document.getElementById("deckHTML").value);
    if (isNaN(numberOfDecks)) {
        numberOfDecks = 2;
    }
    //console.log(numberOfDecks)
    createDeck();
}