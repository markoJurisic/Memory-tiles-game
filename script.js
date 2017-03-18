const imagesEasy = ['tile1.jpg', 'tile2.jpg', 'tile3.jpg', 'tile4.jpg', 'tile5.jpg', 'tile6.jpg'],
	  imagesNormal = imagesEasy.concat(['tile7.jpg', 'tile8.jpg']),
  	  imagesHard = imagesNormal.concat(['tile9.jpg', 'tile10.jpg', 'tile11.jpg', 'tile12.jpg', 'tile13.jpg', 'tile14.jpg', 'tile15.jpg', 'tile16.jpg']),
	  gameboard = document.querySelector('#gameboard'),
	  wrapper = document.querySelector('#wrapper'),
	  easyGame = document.querySelector('#easy'),
	  normalGame = document.querySelector('#normal'),
	  hardGame = document.querySelector('#hard'),
	  fastest = document.querySelector('#fastest'),
	  moves = document.querySelector('#moves'),
	  leastMoves = document.querySelector('#leastMoves');

// Concat is used so we get an array with 2 of each items
let allImages = imagesNormal.concat(imagesNormal);

// Get the best time ever and least moves ever for a normal game
bestTimeEverNormalContainer.children[0].textContent = localStorage.getItem('bestTimeEverNormal');
leastMovesEverNormalContainer.children[0].textContent = localStorage.getItem('leastMovesEverNormal');

// Shuffle array
shuffleArray(allImages); // Line 104
// Display scoreboard
fastest.textContent = 'Fastest runs (normal):';
displayRecords();
// Don't start the timer until the first click on a tile
timer.stop();


// Load game mode - choose the deck, shuffle it, display appropriate scoreboard, reset timer, get all time best scores, and start the game
easyGame.addEventListener('click', () => {
	game = 'easy';
	fastest.textContent = 'Fastest runs (easy):';
	allImages = imagesEasy.concat(imagesEasy);
	wrapper.style.maxWidth = '540px';
	bestTimeEverEasyContainer.children[0].textContent = localStorage.getItem('bestTimeEverEasy');
	leastMovesEverEasyContainer.children[0].textContent = localStorage.getItem('leastMovesEverEasy');
	startGame(); // Line 38
});

normalGame.addEventListener('click', () => {
	game = 'normal';
	fastest.textContent = 'Fastest runs (normal):';
	allImages = imagesNormal.concat(imagesNormal);
	wrapper.style.maxWidth = '540px';
	bestTimeEverNormalContainer.children[0].textContent = localStorage.getItem('bestTimeEverNormal');
	leastMovesEverNormalContainer.children[0].textContent = localStorage.getItem('leastMovesEverNormal');
	startGame(); // Line 38
});

hardGame.addEventListener('click', () => {
	game = 'hard';
	fastest.textContent = 'Fastest runs (hard):';
	allImages = imagesHard.concat(imagesHard);
	wrapper.style.maxWidth = '1080px';
	bestTimeEverHardContainer.children[0].textContent = localStorage.getItem('bestTimeEverHard');
	leastMovesEverHardContainer.children[0].textContent = localStorage.getItem('leastMovesEverHard');
	startGame(); // Line 38
})

function startGame() {
	// Reset moves, display scoretable, shuffle tiles, and reset timer
	moves.textContent = '0';
	displayRecords();
	shuffleArray(allImages);
	timer.stop();
	timer.reset();
	// Clear gameboard
	gameboard.innerHTML = "";

	// Create gameboard with 2 images of each
	for (let i = 0; i < allImages.length; i++) {
		displayImage(i); // Line 98
	}

	const tile = document.querySelectorAll('.gametile'),
		  clickedImage = [];
	let counter = 0, 
		bestMoves = 999;

	// Add click event listener to every tile
	tile.forEach(img => {
		img.addEventListener('click', () => {
			// Start the timer after a tile is clicked
			timer.start();
			
			let guessed = document.querySelectorAll('img.bingo');
			// Flip the clicked tile
			img.firstChild.classList.add('flipped');
			// Add the same class to container as well to turn off pointer-events
			img.classList.add('flipped');
			// Take the filename of the fliped image and add it to comparision array 
			clickedImage.push(img.firstChild.dataset.tile);			
			counter++;
			
			// Compare 2 tiles (occurs every 2 flips)
			if (counter % 2 == 0) {
				let flipped = document.querySelectorAll('.flipped');
				// Update number of moves
				moves.textContent = counter/2;
				// Check if filenames match
				if (clickedImage[0] === clickedImage[1]) {
					// Add a class to keep it visible and to prevent further clicking events
					flipped.forEach(item => item.classList.add('bingo'));
					// Empty the array
					clickedImage.pop();
					clickedImage.pop();
					// Check if the game is solved					
					if (guessed.length == (allImages.length - 2)) {
						// Stop the timer 
						timer.stop();
						// Get score
						score = `${time[0]}:${time[1]}:${time[2]}`;
						timeDisplay.style.animation = 'bingo .4s';
						// Update appropriate scoreboard based on difficulty level
						updateScore(game, counter);
						checkBestTimeEver(game);	
						checkLeastMovesEver(game, counter);
						populateStorage();						
					}
				} else {
					// 'Close' flipped images after a brief delay
					setTimeout(function () {
							flipped.forEach(item =>  item.classList.remove('flipped'))					
						}, 500)
						// Empty the array
					clickedImage.pop();
					clickedImage.pop();					
				}							
			} // End of if statement	
		})
	}); // End of tile.forEach() click handler

} // End of startGame()

function displayImage(i) {
	// Add tiles to the gameboard
	gameboard.innerHTML += `<div class="col-md-3 col-xs-4 gametile"><img data-tile="${allImages[i]}" src="images/${allImages[i]}" class="img-responsive flip-image"></div>`;
}

// ES2015 version of array shuffle function
function shuffleArray(a) {
	for (let i = a.length; i; i--) {
		let j = Math.floor(Math.random() * i);
        [a[i - 1], a[j]] = [a[j], a[i - 1]];
	}
}

startGame(); // Line 38