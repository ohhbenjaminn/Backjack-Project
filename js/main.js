/*----- constants -----*/
const suits = ['s', 'c', 'd', 'h'];
const ranks = ['02', '03', '04', '05', '06', '07', '08', '09', '10', 'J', 'Q', 'K', 'A'];

// Build a 'master' deck of 'card' objects used to create shuffled decks
const masterDeck = buildMasterDeck();
renderDeckInContainer(masterDeck, document.getElementById('master-deck-container'));

/*----- app's state (variables) -----*/
let shuffledDeck;

/*----- cached element references -----*/
const shuffledContainer = document.getElementById('shuffled-deck-container');

const playerRandomCards = document.getElementById('player-random-shuffled-cards');
const dealerRandomCards = document.getElementById('dealer-random-shuffled-cards');
let dealerResult = document.querySelector(".dealer-result"); 
let playerResult = document.querySelector(".player-result");

/*----- event listeners -----*/
document.querySelector('button').addEventListener('click', renderNewShuffledDeck);
document.querySelector('#deal').addEventListener('click', dealMe);
document.querySelector('#hit').addEventListener('click', hitCards);
document.querySelector('#stay').addEventListener('click', dealerHit);
document.querySelector('#stay').addEventListener('click', stayFinish);

/*----- Remove event listeners -----*/
// document.removeEventListener('#deal', 'click', true);

let playerSum = 0;
let dealerSum = 0;
let counter = 0;
let playerCurrentHand = [];
let dealerCurrentHand = [];

/*----- functions -----*/
function getNewShuffledDeck() {
  // Create a copy of the masterDeck (leave masterDeck untouched!)
  const tempDeck = [...masterDeck];
  const newShuffledDeck = [];
  while (tempDeck.length) {
    // Get a random index for a card still in the tempDeck
    const rndIdx = Math.floor(Math.random() * tempDeck.length);
    // Note the [0] after splice - this is because splice always returns an array and we just want the card object in that array
    newShuffledDeck.push(tempDeck.splice(rndIdx, 1)[0]);
  }
  return newShuffledDeck;
}

function renderNewShuffledDeck() {
  // Create a copy of the masterDeck (leave masterDeck untouched!)
  shuffledDeck = getNewShuffledDeck();
  renderDeckInContainer(shuffledDeck, shuffledContainer);

    playerSum = 0;
    dealerSum = 0;
    counter = 0;
    playerCurrentHand = [];
    dealerCurrentHand = [];

    playerRandomCards.innerHTML = '';
    dealerRandomCards.innerHTML = '';
    dealerResult.innerHTML = dealerSum;
    playerResult.innerHTML = playerSum;
}

function renderDeckInContainer(deck, container) {
  container.innerHTML = '';
  // Let's build the cards as a string of HTML
  let cardsHtml = '';
  //----

  deck.forEach(function(card) {
    cardsHtml += `<div class="card ${card.face}"></div>`;
  });
  // Or, use reduce to 'reduce' the array into a single thing - in this case a string of HTML markup 
  // const cardsHtml = deck.reduce(function(html, card) {
  //   return html + `<div class="card ${card.face}"></div>`;
  // }, '');
  container.innerHTML = cardsHtml;
}

function buildMasterDeck() {
  const deck = [];
  // Use nested forEach to generate card objects
  suits.forEach(function(suit) {
    ranks.forEach(function(rank) {
      deck.push({
        // The 'face' property maps to the library's CSS classes for cards
        face: `${suit}${rank}`,
        // Setting the 'value' property for game of blackjack, not war
        value: Number(rank) || (rank === 'A' ? 11 : 10)
      });
    });
  });
  return deck;
}
renderNewShuffledDeck();

function dealMe () {
   playerCurrentHand.push(shuffledDeck[0], shuffledDeck[1]);
   playerSum += shuffledDeck[0].value + shuffledDeck[1].value;

   dealerCurrentHand.push(shuffledDeck[2], shuffledDeck[3]);
   dealerSum += shuffledDeck[2].value + shuffledDeck[3].value;
   counter = 3
    dealerResult.innerHTML = dealerSum;
    playerResult.innerHTML = playerSum;

    playerCurrentHand.forEach(function(card) {
        playerRandomCards.innerHTML += `<div class="card ${card.face}"></div>`;
    });

    dealerCurrentHand.forEach(function(card) {
        dealerRandomCards.innerHTML += `<div class="card ${card.face}"></div>`;
    })

  if(playerSum === 21){
    setTimeout(() => {
        alert("WINNER WINNER CHICKEN DINNER!!! YOU GOT 21!!!")
    }, 100);
  }
  if(dealerSum === 21){
    setTimeout(() => {
        alert("YOU LOSE, DEALER GOT 21!!!")
    }, 100);
    
  }
};

function hitCards() {
    counter+= 1
    playerCurrentHand.push(shuffledDeck[counter]);
    playerSum += shuffledDeck[counter].value;
    
    playerRandomCards.innerHTML += `<div class="card ${shuffledDeck[counter].face}"></div>`
    
    playerResult.innerHTML = playerSum;

    if(playerSum > 21){
        setTimeout(() => {
            alert("BUST!!!")
        }, 100)
        
    }
    if(playerSum === 21){
        setTimeout(() => {
            alert("WINNER WINNER CHICKEN DINNER!!! YOU GOT 21!!!")
        }, 100);
    }
};

function dealerHit(){
  counter+= 1
  dealerCurrentHand.push(shuffledDeck[counter])
  dealerSum += shuffledDeck[counter].value;

  dealerResult.innerHTML = dealerSum;
  
  if(dealerSum > 21){
      setTimeout(() => {
        alert("BUST!!!")
    }, 100)
      
    }
    if(dealerSum === 21){
        setTimeout(() => {
            alert("YOU LOSE, DEALER GOT 21!!!")
        }, 100)
    }

    dealerRandomCards.innerHTML += `<div class="card ${shuffledDeck[counter].face}"></div>`
    

};

// function sumOfCurrentHand() {
//   let playerHandSum = playerCurrentHand.reduce((a, b) => a + b, 0);
//   let dealerHandSum = dealerCurrentHand.reduce((a, b) => a + b, 0);
// }

//when clicked the function will automatically have the dealer keep hitting until they reach >= 17

function stayFinish(){
  if (dealerSum > 17) {
    return;
  }
  dealerHit();
  stayFinish()
};

