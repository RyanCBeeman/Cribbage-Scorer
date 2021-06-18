
const vals = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "Jack", "Queen", "King"];
const numericVals = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 10, 10, 10];
const order = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
const suites = ["heart", "club", "diamond", "spade"];


function card(val, suite, numVal, order) {
	this.val = val;
	this.suite = suite;
	this.numVal = numVal;
	this.order = order;
}

function Deck() {
	this.cards = new Array();
	for(i=0;i<=12;i++){
		this.cards.push(new card(vals[i], "Heart", numericVals[i], order[i]))
	}
	for(i=0;i<=12;i++){
		this.cards.push(new card(vals[i], "Club", numericVals[i], order[i]))
	}
	for(i=12;i>=0;i--){
		this.cards.push(new card(vals[i], "Diamond", numericVals[i], order[i]))
	}
	for(i=12;i>=0;i--){
		this.cards.push(new card(vals[i], "Spade", numericVals[i], order[i]))
	}
	console.log("THIS SHOULD NOT BE CALLED EXCEPT ONCE");
}

Deck.prototype.shuffle = function(){
	// Shuffles the deck of cards using the Fisher-Yates Shuffle
	var m = this.cards.length;
	var t;
	var i;

	//while there are cards left to be shuffled
	while(m){
		//pick on of the remaining cards
		i = Math.floor(Math.random() * m)
		m--;
		//swap chosen element with current element
		t = this.cards[m];
		this.cards[m] = this.cards[i]
		this.cards[i] = t;
	}
	return this.cards;
}

Deck.prototype.shift = function(){
	return this.cards.shift();
}

Deck.prototype.resetDeck = function(){
	return new Deck();
}

