var wordlist = [],
		targetWord = '';


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


function drawWord() {
	while (targetWord == '') {
		newWord();
	}

	$('#targetWord').html(targetWord);
}