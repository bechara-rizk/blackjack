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
let splitCards = [];
let sum = 0;
let deck;
let numberOfDecks = 2;
let hands = 1;
let splitDone = false;
let dealerTurn = false;
let dealerSum = 0;
let playerSum = 0;
let currentHand = 0;
let renderHand = 0;
disButtons()
document.getElementById("cards-box").style.display = "block";
document.getElementById("split-wrap").style.display = "none";
//createDeck();

function newGame() {
    document.getElementById("sum").style.display = "block";
    document.getElementById("commands").innerHTML = '';
    document.getElementById("commands").innerHTML = `
    <button class="buttons " id="new-game" onclick="newGame()">new game</button>
                <button class="buttons" id="hit" onclick="hit()">HIT</button>
                <button class="buttons " id="stand" onclick="stand()">STAND</button>
                <button class="buttons " id="split" onclick="split()">Split</button>
                <button class="buttons " id="resetDeck" onclick="createDeck()">reset deck</button>
                <input class="buttons button-input" type="number" placeholder="# of decks" min="0" oninput="changeDeckHTML()" id="deckHTML"></input>
    `;
    cards = [];
    splitCards = [];
    sum = 0;
    renderHand = 0;
    sums=[];
    document.getElementById("hit").disabled = false;
    document.getElementById("stand").disabled = false;
    //document.getElementById("resetDeck").disabled = false;
    document.getElementById("cards-box").style.display = "block";
    document.getElementById("split-wrap").style.display = "none";
    document.getElementById("cards-box").innerHTML = "";
    document.getElementById("split-wrap").innerHTML = "";
    document.getElementById("dealer").innerHTML = "Dealer's Score:"
    hands = 1;
    splitDone = false;
    dealerTurn = false;
    dealerSum = 0;
    playerSum = 0;
    currentHand = 0;
    for (let i = 0; i < 2; i++) {
        hit();
    }
    //renderGame();
    //console.log(cards);
    if (cards[0]===cards[2]) {
        document.getElementById("split").disabled = false;
    }
    else {
        document.getElementById("split").disabled = true;
    }
}

function split() {
    //console.log("split");
    splitDone = true;
    document.getElementById("cards-box").style.display = "none";
    document.getElementById("split-wrap").style.display = "flex";
    document.getElementById("sum").style.display = "none";
    //document.getElementById("commands").innerHTML = '';
    document.getElementById("commands").innerHTML = `
    <button class="buttons " id="new-game" onclick="newGame()">new game</button>
                <button class="buttons" id="hit" onclick="hitSplit()">HIT</button>
                <button class="buttons " id="stand" onclick="standSplit()">STAND</button>
                <button class="buttons " id="split" onclick="split()">Split</button>
                <button class="buttons " id="resetDeck" onclick="createDeck()">reset deck</button>
                <input class="buttons button-input" type="number" placeholder="# of decks" min="0" oninput="changeDeckHTML()" id="deckHTML"></input>
    `;
    //document.getElementById("split").disabled =true;
    if (hands === 1) {
        for (let i = 0; i < 2; i++) {

            splitCards.push([cards[i * (i + 1)], cards[i * (i + 1) + 1]]);
            addHand();
        }
        //let temp=splitCards[0];
        //splitCards[0] = splitCards[1];
        //splitCards[1]=temp;
    } else {
        splitCards.push([cards[cards.length - 2], cards[cards.length - 1]]);
        addHand();
    }
    for (let i = 0; i < hands - 1; i++) {
        splitSum(i);
    }
    //console.log(splitCards);
    //addHand();
}

function hitSplit() {
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
    
    if (dealerTurn === false) {

        //sum += randomCardValue;
        //console.log(splitSum(currentHand));
        splitCards[currentHand].push(randomCard);
        splitCards[currentHand].push(currentSuit);
        //console.log(splitCards)
        splitSum(currentHand);
        renderSplit();
    } else {
        dealerSum += randomCardValue;
    }
    if (deck.length <= numberOfDecks * 52 * 0.3) {
        createDeck();
        //console.log(deck)
    }
}

function splitSum(cHand) {
    let sum = 0;
    for (let i = 0; i < splitCards[cHand].length; i += 2) {
        if (splitCards[cHand][i] == "J" || splitCards[cHand][i] == "Q" || splitCards[cHand][i] == "K") {
            sum += 10;
        } else if (splitCards[cHand][i] == "A" || splitCards[cHand][i] == "A hard") {
            sum += 11;
        } else if (splitCards[cHand][i] == "A hard 2") {
            sum += 1;
        } else {
            sum += splitCards[cHand][i];
        }
        while (sum > 21 && (splitCards[cHand].indexOf("A") != -1 || splitCards[cHand].indexOf("A hard") != -1)) {
            if (splitCards[cHand].indexOf("A") != -1) {
                sum -= 10;
                splitCards[cHand][splitCards[cHand].indexOf("A")] = "A hard 2";
            } else if (splitCards[cHand].indexOf("A hard") != -1) {
                sum -= 10;
                splitCards[cHand][splitCards[cHand].indexOf("A hard")] = "A hard 2";
            }
        }
    }
    let idToChange = cHand + 1;
    document.getElementById("sum" + idToChange).innerHTML = `SUM ${idToChange}: ${sum}`;
    if (sum > 21) {
        document.getElementById("sum" + idToChange).innerHTML += " - Busted Hand!";
    } else if (sum === 21) {
        document.getElementById('sum' + idToChange).innerHTML += " - You have got Blackjack!";
    }
    if (sum>=21){
        standSplit(sum);
    }
    return sum;
}

let sums=[];

function standSplit(called=0) {
    if (called){
        sums.push(called);
        currentHand++;
        //console.log("called");
        if (currentHand>=hands-1){
            console.log("dealer");
            dealerTurn=true;
            dealerPlaySplit();
        }
    }
    else if (currentHand<hands-2){
        //console.log("stood");
        let toAdd=(currentHand+1);
        document.getElementById("sum"+toAdd).innerHTML+=" - Stood.";
        //console.log("sum"+(currentHand+1));
        currentHand++;
        sums.push(splitSum(currentHand-1));
        
    }
    else{
        let toAdd=(currentHand+1);
        document.getElementById("sum"+toAdd).innerHTML+=" - Stood.";
        sums.push(splitSum(currentHand));
        //console.log("dealer");
        dealerTurn=true;
        dealerPlaySplit();
    }
    //console.log(sums);
}

function dealerPlaySplit(){
    dealerSum = 0;
    //console.log("dealer play");
    while (dealerSum < 17) {
        hitSplit();
    }
        //console.log(dealerSum);
    document.getElementById("dealer").innerHTML= "Dealer's Score: " + dealerSum;
    //console.log("Dealer's Score: " + dealerSum);
    for (let i=0; i<hands-1; i++) {
        let toAdd=(i+1);
        if (sums[i]>dealerSum && sums[i]<=21){
            document.getElementById("sum"+toAdd).innerHTML+=" - Won To Dealer.";
        }
        else if (sums[i]<dealerSum && dealerSum<=21){
            document.getElementById("sum"+toAdd).innerHTML+=" - Lost To Dealer.";
        }
        else if (sums[i]===dealerSum && dealerSum<=21){
            document.getElementById("sum"+toAdd).innerHTML+=" - Tied Hand.";
        }
        else if (sums[i]<21 && dealerSum>21){
            document.getElementById("sum"+toAdd).innerHTML+=" - Won To Dealer.";
        }
    }
    disButtonsSplit()
    dealerTurn=false;
}

function disButtonsSplit() {
    document.getElementById("hit").disabled = true;
    document.getElementById("stand").disabled = true;
    document.getElementById("split").disabled = true;
    //document.getElementById("resetDeck").disabled = true;
    //console.log("disabled buttons")
}


function renderSplit() {
    for (let i = 0; i < renderHand; i++) {
        let cardTag = ''
        for (let j = 0; j < splitCards[i].length / 2; j++) {
            if ((/[a-zA-Z]/).test(splitCards[i][splitCards[i].length - 2 - j * 2])) {
                cardTag += '<img class="card" src="img/Flat Playing Cards Set/' + splitCards[i][splitCards[i].length - 1 - j * 2] + '/' + splitCards[i][splitCards[i].length - 2 - j * 2][0] + '.png" alt="">';
            } else {
                cardTag += '<img class="card" src="img/Flat Playing Cards Set/' + splitCards[i][splitCards[i].length - 1 - j * 2] + '/' + splitCards[i][splitCards[i].length - 2 - j * 2] + '.png" alt="">';
            }
        }
        let idToAdd = (i + 1);
        document.getElementById("split-cards-" + idToAdd).innerHTML = cardTag;
    }
}

function addHand() {
    cardTag = ''; //'<img class="card" src="img/Flat Playing Cards Set/' + cards[cards.length - 1-i*hands] + '/' + cards[cards.length - 2-i*hands] + '.png" alt="">';
    let newHand = `
        <div class="hand" id="hand-` + hands + `">
        <div class="split-title">
            HAND ` + hands + `
        </div>
        <div class="split-cards" id="split-cards-${hands}">
            ` + cardTag + `
        </div>
        <div class="info">
            <span class="sum" id="sum` + hands + `">Sum ` + hands + `: </span>
        </div>
    </div>`;
    document.getElementById("split-wrap").insertAdjacentHTML("beforeend", newHand);
    hands++;
    renderHand++;
    renderSplit();
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
        cards[cards.indexOf("A")] = "A hard";
    }
    document.getElementById("sum").innerHTML = "Sum: " + sum;
    if (sum > 21) {
        disButtons();
        document.getElementById("sum").innerHTML += " - You have busted! Tough luck.";
        document.getElementById("dealer").innerHTML = "You Lost, The Dealer Doesn't Have To Play."
    }
    if (sum === 21) {
        document.getElementById("sum").innerHTML += " - You have got Blackjack!";
        stand();
    }
    //console.log(cards,sum);
}

function stand() {
    disButtons()
    playerSum = sum;
    if (splitDone === false) {
        dealerTurn = true;
        dealerPlay();
    }
}

function dealerPlay() {
    dealerSum = 0;
    //console.log("dealer play");
    while (dealerSum < 17) {
        hit();
        //console.log(dealerSum);
    }
    //console.log("Dealer's Score: " + dealerSum);
    document.getElementById("dealer").innerHTML = "Dealer's Score: " + dealerSum;
    //console.log(dealerSum, sum);
    if (dealerSum > 21) {
        document.getElementById("dealer").innerHTML += " The Dealer Has Busted. You Win!"
    } else if (dealerSum > playerSum) {
        document.getElementById("dealer").innerHTML += " The dealer won!"
    } else if (dealerSum < playerSum) {
        document.getElementById("dealer").innerHTML += " You won!"
    } else if (dealerSum === playerSum) {
        document.getElementById("dealer").innerHTML += " It is a tie!"
    }
    //dealerSum = 0;
    dealerTurn = false;
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
    if (dealerTurn === false) {
        sum += randomCardValue;
        renderGame();
    } else {
        dealerSum += randomCardValue;
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