var numPlayers = 2;
var cardsToDeal = 6;
var currentDealer;


function player(playerNum){
	this.playerNum = playerNum;
	this.points = 0;
	this.hand = [];
	this.cribHand = [];
}

function createPlayers(){
	player1 = new player(1);
	player2 = new player(2);
	currentDealer = player1;
}

function deal(deck){
	deck = deck.shuffle()
		if(currentDealer.playerNum == 1){
			for(i = 0; i < cardsToDeal;i++){
				player2.hand.push(deck.shift());
				player1.hand.push(deck.shift());
			}
		}else if(currentDealer.playerNum == 2){
			for(i = 0; i < cardsToDeal;i++){
				player1.hand.push(deck.shift());
				player2.hand.push(deck.shift());
			}
		}
	
	return deck
}

//compares the value of two cards
function compareCards(card1, card2){
	if(card1.order < card2.order){
		return -1;
	}else if (card1.order > card2.order){
		return 1;
	}else{
		return 0;
	}
}

//sorts hand by card value
function sortHand(hand){
	hand.sort(compareCards);
	return hand;
}


function randoCrib(){
	currentDealer.cribHand.push(player1.hand.shift())
	currentDealer.cribHand.push(player1.hand.shift())
	currentDealer.cribHand.push(player2.hand.shift())
	currentDealer.cribHand.push(player2.hand.shift())
	nextDealer();
}

function nextDealer(){
	if(currentDealer.playerNum == 1){
		currentDealer = player2;
	}else if(currentDealer.playerNum == 2){
		currentDealer = player1;
	}
}