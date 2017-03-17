let msec = 0,
	sec = 0,
	min = 0,
	time = [],
	timeDisplay = document.querySelector('#time'),
	interval;

// Turn msec into sec, and sec into min
function updateTime() {
	msec++;
		
	if (msec == 50) {
		msec = 0;
		sec++;
		}
			
	if (sec == 60) {
		sec = 0;
		min++;
		}	
		
	updateTimeDisplay();
}

// Display time
function updateTimeDisplay() {
	// Add leading 0 if value is a single digit
	time = [('0' + min).slice(-2), ('0' + sec).slice(-2), ('0' + msec*2).slice(-2)];
	
	timeDisplay.textContent = `${time[0]}:${time[1]}:${time[2]}`;
}


// Constructor function for timer. 
function Timer() {
	interval = setInterval(updateTime, 20);		
}

// Self-explanatory methods
Timer.prototype.start = function() {
	clearInterval(interval);
	Timer();
}

Timer.prototype.reset = function() {
	msec = 0;
	sec = 0;
	min = 0;
	updateTimeDisplay();
}

Timer.prototype.stop = function() {
	clearInterval(interval);
}

const timer = new Timer;