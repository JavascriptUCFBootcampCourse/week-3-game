var wordlist = [],
		targetWord = '',
		guesses = [],
		maxLives = 6;


function setImage(number) {
	$('#hangman_img').removeAttr("class").addClass("image" + number);
}

function loadWordlist() {
	var  word = '';
	$.ajax({
		url:'assets/wordlist.json',
		async: true
	}).done(function(data) {
		for (word in data) {
			wordlist.push(data[word]);
		}
	}, 'json');
}

function newWord() {
	targetWord = wordlist[Math.floor(Math.random() * wordlist.length)];
}

function obfuscateWord() {
	var obWord = '';

	for (var i=0; i < targetWord.length; i++) {
		if (guesses.indexOf(targetWord[i].toLowerCase(), 0) == -1) {
			obWord += '_';
		} else {
			obWord += targetWord[i];
		}
	}

	return obWord;
}


function drawWord() {
	while (targetWord == '') {
		newWord();
	}

	$('#targetWord').html(obfuscateWord());
}

function drawGuesses() {
	guesses.sort();
	$('#previousGuesses').html(guesses.join(', '));

}

function cleanGuess() {
    var uniqueGuesses = [];
    $.each(guesses, function(index, element) {
        if (element.length > 0 && $.inArray(element, uniqueGuesses) == -1) {
            uniqueGuesses.push(element);
        }
    });
    guesses = uniqueGuesses;
}

function addGuess() {
	if (/^[a-zA-Z]*$/.test($('#guess').val()) && typeof $('#guess').val() !== "undefined") {
		guesses.push($('#guess').val().toLowerCase());

	}
}

function endGameDialog(isWinner) {
	if (isWinner) {
		alert("You have gained the Iron Throne");
	} else {
		alert("The Lannisters have taken the throne from you!");

	}

}

function reviewLives() {
	var livesRemaining = maxLives,
		string = targetWord.toLowerCase();

	for (var i = 0; i < guesses.length; i++) {
		if (string.indexOf(guesses[i], 0) == -1) {
			livesRemaining--;

		}
	}

	if (livesRemaining <= 0) {
		setImage(0);
		endGameDialog(); 
		return;
	}

	setImage(maxLives - livesRemaining);
}

function checkIfWon() {
	if (obfuscateWord() == targetWord) {
		endGameDialog(true);
	}
}

function resetGame() {
	setImage(0);
	targetWord = '';
	guesses = [];
	newWord();
}

function update() {
	addGuess();
	cleanGuess();
	drawWord();
	drawGuesses();
	checkIfWon();

}



// window.onload = function() {
// 	loadWordlist();
//     drawWord();
//     drawGuesses();
//     $('#guess').attr('onkeyup','update();');

// };









