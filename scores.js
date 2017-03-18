const displayEasy = document.querySelector('#scoresEasy'),
	  displayNormal = document.querySelector('#scoresNormal'),
	  displayHard = document.querySelector('#scoresHard');
	  leastMovesEasy = document.querySelector('#leastMovesEasy'),
	  leastMovesNormal = document.querySelector('#leastMovesNormal'),
	  leastMovesHard = document.querySelector('#leastMovesHard'),
	  bestTimeEverEasyContainer = document.querySelector('#bestTimeEverEasy'),
	  bestTimeEverNormalContainer = document.querySelector('#bestTimeEverNormal'),
	  bestTimeEverHardContainer = document.querySelector('#bestTimeEverHard'),
	  leastMovesEverEasyContainer = document.querySelector('#leastMovesEverEasy'),
	  leastMovesEverNormalContainer = document.querySelector('#leastMovesEverNormal'),
	  leastMovesEverHardContainer = document.querySelector('#leastMovesEverHard');

let score,
	game = 'normal',
	scoresEasy = [],
	scoresNormal = [],
	scoresHard = [],	
	leastMovesEverEasy = localStorage.getItem('leastMovesEverEasy') || '999',
	leastMovesEverNormal = localStorage.getItem('leastMovesEverNormal') || '999',
	leastMovesEverHard = localStorage.getItem('leastMovesEverHard') || '999',
	bestTimeEverEasy = localStorage.getItem('bestTimeEverEasy') || '99:99:99',
	bestTimeEverNormal = localStorage.getItem('bestTimeEverNormal') || '99:99:99',
	bestTimeEverHard = localStorage.getItem('bestTimeEverHard') || '99:99:99';
	


function updateScore(game, counter) {
	// Update least moves record
		updateLeastMoves(game, counter);
	// Check the game difficulty and update score accordingly
	if (game === 'easy') {
		// Add the score and sort the scores array
		scoresEasy.push(score);
		scoresEasy.sort();		
			
		// Keep max 5 results
		if (scoresEasy.length > 5) {
			scoresEasy.pop();
		}
		
		// Update the scoretable
		for (let i = 0; i < scoresEasy.length; i++) {
			displayEasy.children[i].innerHTML = scoresEasy[i];
		}		
	
	} else if (game === 'hard') {
		scoresHard.push(score);
		scoresHard.sort();
	
		if (scoresHard.length > 5) {
			scoresHard.pop();
		}
		
		for (let i = 0; i < scoresHard.length; i++) {
			displayHard.children[i].textContent = scoresHard[i];
		}
		
	} else if (game === 'normal') {
		scoresNormal.push(score);
		scoresNormal.sort();
	
		if (scoresNormal.length > 5) {
			scoresNormal.pop();
		}
		for (let i = 0; i < scoresNormal.length; i++) {
			displayNormal.children[i].textContent = scoresNormal[i];
		}
	}
}

// Toggle scoreboard display according to difficulty
function displayRecords() {
	if (game === 'easy') {
		displayEasy.style.display = 'block';
		displayNormal.style.display = 'none';
		displayHard.style.display = 'none';
		leastMovesEasy.style.display = 'inline';
		leastMovesNormal.style.display = 'none';
		leastMovesHard.style.display = 'none';
		bestTimeEverEasyContainer.style.display = 'block';
		bestTimeEverNormalContainer.style.display = 'none';
		bestTimeEverHardContainer.style.display = 'none';
		leastMovesEverEasyContainer.style.display = 'block';
		leastMovesEverNormalContainer.style.display = 'none';
		leastMovesEverHardContainer.style.display = 'none';
	} else if (game === 'hard') {
		displayHard.style.display = 'block';
		displayNormal.style.display = 'none';
		displayEasy.style.display = 'none';
		leastMovesEasy.style.display = 'none';
		leastMovesNormal.style.display = 'none';
		leastMovesHard.style.display = 'inline';
		bestTimeEverEasyContainer.style.display = 'none';
		bestTimeEverNormalContainer.style.display = 'none';
		bestTimeEverHardContainer.style.display = 'block';
		leastMovesEverEasyContainer.style.display = 'none';
		leastMovesEverNormalContainer.style.display = 'none';
		leastMovesEverHardContainer.style.display = 'block';
	} else {
		displayNormal.style.display = 'block';
		displayEasy.style.display = 'none';
		displayHard.style.display = 'none';
		leastMovesEasy.style.display = 'none';
		leastMovesNormal.style.display = 'inline';
		leastMovesHard.style.display = 'none';
		bestTimeEverEasyContainer.style.display = 'none';
		bestTimeEverNormalContainer.style.display = 'block';
		bestTimeEverHardContainer.style.display = 'none';
		leastMovesEverEasyContainer.style.display = 'none';
		leastMovesEverNormalContainer.style.display = 'block';
		leastMovesEverHardContainer.style.display = 'none';
	}
}

// Check if the least moves record is beaten
function updateLeastMoves(game, counter) {
	if (game === 'easy') {
		if(counter/2 < parseInt(leastMovesEasy.textContent)) {
			leastMovesEasy.textContent = counter/2;			
		}
	} else if (game === 'hard') {
		if(counter/2 < parseInt(leastMovesHard.textContent)) {
			leastMovesHard.textContent = counter/2;
		}
	} else {
		if(counter/2 < parseInt(leastMovesNormal.textContent)) {
			leastMovesNormal.textContent = counter/2;
		}
	}
}

function populateStorage() {
	localStorage.setItem('bestTimeEverEasy', bestTimeEverEasy);
	localStorage.setItem('bestTimeEverNormal', bestTimeEverNormal);
	localStorage.setItem('bestTimeEverHard', bestTimeEverHard);
	localStorage.setItem('leastMovesEverHard', leastMovesEverHard);
	localStorage.setItem('leastMovesEverEasy', leastMovesEverEasy);
	localStorage.setItem('leastMovesEverNormal', leastMovesEverNormal);
}

// Check if the last game was solved fastest, and if it is update Best time ever (both localStorage and value)
function checkBestTimeEver(game) {
	if (game === 'easy') {
		if (scoresEasy[0] < bestTimeEverEasy) {
			bestTimeEverEasy = scoresEasy[0];
			populateStorage();
			bestTimeEverEasyContainer.children[0].textContent = localStorage.getItem('bestTimeEverEasy');
		};
	} else if (game === 'hard') {
		if (scoresHard[0] < bestTimeEverHard) {
			bestTimeEverHard = scoresHard[0];
			populateStorage();
			bestTimeEverHardContainer.children[0].textContent = localStorage.getItem('bestTimeEverHard');
		}
	} else {
		if (scoresNormal[0] < bestTimeEverNormal) {
			bestTimeEverNormal = scoresNormal[0];
			populateStorage();
			bestTimeEverNormalContainer.children[0].textContent = localStorage.getItem('bestTimeEverNormal');
		}
	}
}

// Check if the last game was with least moves, and if it is update Least moves ever (both localStorage and value)
function checkLeastMovesEver(game, counter) {
	if (game === 'easy') {
		if (counter/2 < leastMovesEverEasy) {
			leastMovesEverEasy = counter/2;
			populateStorage();
			leastMovesEverEasyContainer.children[0].textContent = localStorage.getItem('leastMovesEverEasy');
		}
	} else if (game === 'hard') {
		if (counter/2 < leastMovesEverHard) {
			leastMovesEverHard = counter/2;
			populateStorage();
			leastMovesEverHardContainer.children[0].textContent = localStorage.getItem('leastMovesEverHard');
		}
	} else {
		if (counter/2 < leastMovesEverNormal) {
			leastMovesEverNormal = counter/2;
			populateStorage();
			leastMovesEverNormalContainer.children[0].textContent = localStorage.getItem('leastMovesEverNormal');
		}
	}
	
}

// Clear localStorage and reload the page
document.querySelector('#reset').addEventListener('click', () => {
	localStorage.clear();
	window.location.reload();
})