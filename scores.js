let score,
	game = 'normal',
	scoresEasy = [],
	scoresNormal = [],
	scoresHard = [],
	displayEasy = document.querySelector('#scoresEasy'),
	displayNormal = document.querySelector('#scoresNormal'),
	displayHard = document.querySelector('#scoresHard');
	leastMovesEasy = document.querySelector('#leastMovesEasy'),
	leastMovesNormal = document.querySelector('#leastMovesNormal'),
	leastMovesHard = document.querySelector('#leastMovesHard');


function updateScore(game, counter) {
	// Update least moves record
		updateLeastMoves(game, counter)
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
	} else if (game === 'hard') {
		displayHard.style.display = 'block';
		displayNormal.style.display = 'none';
		displayEasy.style.display = 'none';
		leastMovesEasy.style.display = 'none';
		leastMovesNormal.style.display = 'none';
		leastMovesHard.style.display = 'inline';
	} else {
		displayNormal.style.display = 'block';
		displayEasy.style.display = 'none';
		displayHard.style.display = 'none';
		leastMovesEasy.style.display = 'none';
		leastMovesNormal.style.display = 'inline';
		leastMovesHard.style.display = 'none';
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