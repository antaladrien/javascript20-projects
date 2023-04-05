const jokebutton = document.getElementById('button');
const audioElement = document.getElementById('audio');
const languageButtons = document.querySelectorAll('.language-button');

// Disable/Enable Button
function toggleButton() {
	jokebutton.disabled = !jokebutton.disabled;
}

let language = 'english';
// VoiceRSS Speech Function
function tellMe(joke) {
	const jokeString = joke.trim().replace(/ /g, '%20');
	// VoiceRSS Speech Parameters
	language === 'english'
		? VoiceRSS.speech({
				key: 'a9ff38b3aa19440a8ae48b7b87adfb7c',
				src: jokeString,
				hl: 'en-gb',
				r: 0,
				c: 'mp3',
				f: '44khz_16bit_stereo',
				ssml: false,
		  })
		: VoiceRSS.speech({
				key: 'a9ff38b3aa19440a8ae48b7b87adfb7c',
				src: jokeString,
				hl: 'hu-hu',
				r: 0,
				c: 'mp3',
				f: '44khz_16bit_stereo',
				ssml: false,
		  });
}

// Get jokes from Joke API
let joke = '';
let apiData = [];

function newData() {
	const apiNewData = apiData[Math.floor(Math.random() * apiData.length)];
	joke = `${apiNewData.setup} ... ${apiNewData.delivery}`;
}

async function getJokes() {
	if (language === 'english') {
		const apiUrl =
			'https://v2.jokeapi.dev/joke/Programming?blacklistFlags=nsfw,religious,political,racist,sexist';
		try {
			const response = await fetch(apiUrl);
			const data = await response.json();
			joke = `${data.setup} ... ${data.delivery}`;
			// Assign One or Two Part Joke
			if (data.setup) {
				joke = `${data.setup} ... ${data.delivery}`;
				console.log(joke);
			} else {
				joke = data.joke;
				console.log(joke);
			}
			// Passing Joke to VoiceRSS API
			tellMe(joke);
			// Disable Button
			toggleButton();
		} catch (error) {
			// Catch Error Here
		}
	} else {
		const apiUrl = 'https://api.npoint.io/53ef2dadb5591bab07f8';
		try {
			const response = await fetch(apiUrl);
			apiData = await response.json();
			newData();
			tellMe(joke);
			toggleButton();
		} catch (error) {
			// Catch Errors Here
			console.log('whoops', error);
		}
	}
}

button.addEventListener('click', getJokes);

languageButtons.forEach((button) => {
	button.addEventListener('click', () => {
		if (button.innerHTML === 'Magyar') {
			language = 'magyar';
			jokebutton.innerHTML = 'Mondj egy viccet';
		} else {
			language = 'english';
			jokebutton.innerHTML = 'Tell Me A Joke';
		}
	});
});

audioElement.addEventListener('ended', toggleButton);
