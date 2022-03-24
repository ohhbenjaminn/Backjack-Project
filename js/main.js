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

const randomCards = document.getElementById('random-shuffled-cards');

/*----- event listeners -----*/
document.querySelector('button').addEventListener('click', renderNewShuffledDeck);
document.querySelector('#deal').addEventListener('click', dealMe);
document.querySelector('#hit').addEventListener('click', hitCards);
document.querySelector('#stay').addEventListener('click', dealerHit);
document.querySelector('#stay').addEventListener('click', stayFinish);

/*----- Remove event listeners -----*/
// document.removeEventListener('#deal', 'click', true);

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
  console.log('shuffled deck', newShuffledDeck)
  return newShuffledDeck;
}

function renderNewShuffledDeck() {
  // Create a copy of the masterDeck (leave masterDeck untouched!)
  shuffledDeck = getNewShuffledDeck();
  renderDeckInContainer(shuffledDeck, shuffledContainer);
}

function renderDeckInContainer(deck, container) {
  container.innerHTML = '';
  // Let's build the cards as a string of HTML
  let cardsHtml = '';
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

let sum = 0;
let counter = 0;
let playerCurrentHand = [];
let dealerCurrentHand = [];

let playerHandSum = () => playerCurrentHand.reduce((a, b) => a + b, 0);
let dealerHandSum = () => dealerCurrentHand.reduce((a, b) => a + b, 0);

function bust() {
  if(playerHandSum() > 21){
    alert(" YOU LOSE, BUSTED!!")
  };
  if(dealerHandSum() > 21){
    alert("YOU WIN, DEALER BUST!!")
  };
}

function dealMe () {
   playerCurrentHand.push(shuffledDeck[0].value, shuffledDeck[1].value);
   dealerCurrentHand.push(shuffledDeck[2].value, shuffledDeck[3].value);
   counter = 3
   if(playerHandSum() === 21){
     alert("WINNER WINNER CHICKEN DINNER!!! YOU GOT 21!!!");
   }
   if(dealerHandSum() === 21){
     alert("YOU LOSE, DEALER GOT 21!!!");
   }

}

function hitCards() {
  counter+= 1
  playerCurrentHand.push(shuffledDeck[counter].value)
  // playerHandSum()
  if(playerHandSum() > 21){
    // alert("BUST!!!")
    bust()
  }
  if(playerHandSum() === 21){
    alert("WINNER WINNER CHICKEN DINNER!!! YOU GOT 21!!!");
  }
};

function dealerHit(){
  counter+= 1
  dealerCurrentHand.push(shuffledDeck[counter].value)
  // dealerHandSum()
  if(dealerHandSum() > 21){
    // alert("BUST!!!")
    bust()
  }
  if(dealerHandSum() === 21){
    alert("YOU LOSE, DEALER GOT 21!!!");
  }
}




// function sumOfCurrentHand() {
//   let playerHandSum = playerCurrentHand.reduce((a, b) => a + b, 0);
//   let dealerHandSum = dealerCurrentHand.reduce((a, b) => a + b, 0);
// }

//when clicked the function will automatically have the dealer keep hitting until they reach >= 17

function stayFinish(){
  if (dealerHandSum() > 17) {
    return;
  }
  dealerHit();
  stayFinish()
};

function bust() {
  if(playerHandSum() > 21){
    alert(" YOU LOSE, BUSTED!!")
  };
  if(dealerHandSum() > 21){
    alert("YOU WIN, DEALER BUST!!")
  };
}