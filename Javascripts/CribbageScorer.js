function quickStart(){
	createPlayers();
	deck1 = new Deck();
	deal(deck1);
	randoCrib();
	starter = new card("5", "Spade", 5, 4);
	player1.hand[0] = new card("5", "Diamond", 5, 4)
	player1.hand[1] = new card("5", "Heart", 5, 4)
	player1.hand[2] = new card("5", "Club", 5, 4)
	player1.hand[3] = new card("Jack", "Spade", 10, 10)
}


function scoreHand(hand, starter, isCrib){
	if(hand.length != 4){
		throw "hand size must be 4"
	}

	points = [];
	//combine hand and starter into one sorted hand
	sortedHand = sortHand(hand.concat(starter));

	//count fifteens
	points[0] = countFifteens(sortedHand);
	//count pairs
	points[1] = countPairs(sortedHand);
	//count runs
	points[2] = countRuns(sortedHand);
	//count flushes
	points[3]  = countFlushes(hand, starter, isCrib);
	//count nobs
	points[4] = countNobs(hand, starter) ;

	return points;
}


function countFifteens(sortedHand){
	var fifs = 0;
	var hand = sortedHand;
	var cardSets = powerset(hand)
	for(var i = 0; i < cardSets.length; i++){
		var set = cardSets[i];
		if(sumCardSet(set) == 15){
			fifs++;
		}
	}

	//each fifteen is worth 2 points
	return fifs*2;
}

//helper function for countFifteens. Creates an array of all possible combinations of cards in the hand
function powerset(arr) {
    var ps = [[]];
    for (var i = 0; i < arr.length; i++) {
        for (var j = 0, len = ps.length; j < len; j++) {
            ps.push(ps[j].concat(arr[i]));
        }
    }
    return ps;
}
//helper function for countFifteens
function sumCardSet(arr){
	var sum = 0;
	for(var i = 0; i < arr.length; i++){
		sum += arr[i].numVal;
	}
	return sum;
}

function countPairs(sortedHand){
	var hand = sortedHand;
	var numOccurences = [0,0,0,0,0,0,0,0,0,0,0,0,0]
	var pairs = 0;

	for(var i = 0; i < hand.length; i++){
		numOccurences[hand[i].order]++;
	}

	console.log(numOccurences);
	for(var i = 0; i < numOccurences.length; i++){
		var x = numOccurences[i]
		if(x == 0 || x == 1){
			//no pairs, do nothing
		}else if(x == 2){
			pairs += 1;
		}else if(x == 3){
			pairs += 3;
			console.log("3")
		}else if(x == 4){
			pairs += 6;
			console.log("4")
		}
	}

	//each pair is worth 2 points
	return pairs*2;
}

function countRuns(sortedHand){
	hand = sortedHand;

	//use numOccurences from above maybe?
	return -99;
}

function countFlushes(hand, starter, isCrib){
	suiteToMatch = hand[0].suite;
	//check if remaining cards in hand match suite
	for(i = 1; i < 4; i++){
		if(hand[i].suite != suiteToMatch){
			//if at least one does not match, no flush is awarded
			return 0;
		}
	}
	//if all cards in hand match check the starter suite
	if(starter.suite != suiteToMatch){
		if(isCrib){
			//no points awareded if starter does not match suite for crib
			return 0;
		}else{
			return 4;
		}
	}else{
		return 5;
	}
}

function countNobs(hand, starter){
	//1 point awarded if a card in hand is the jack that matches the suite of the starter
	for(i = 0; i < 4; i++){
		if(hand[i].val == "Jack" && hand[i].suite == starter.suite){
			return 1;
		}
	}
	return 0;
}