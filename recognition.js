window.SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;

const recognition = new SpeechRecognition();
recognition.interimResults = true; // see what you are saying as you are speaking (default is to wait till done speaking)

let p = document.createElement('p');
const words = document.querySelector('.words');
words.appendChild(p);

recognition.addEventListener('result', e => {
  const transcript = Array.from(e.results)
    .map(result => result[0])
    .map(result => result.transcript)
    .join('');

  p.textContent = transcript;

  if (e.results[0].isFinal) {
    p = document.createElement('p');
    words.appendChild(p);
    p.scrollIntoView();
  }

  if (transcript.includes('unicorn clear')) {
    console.log('🦄 clear command...');
    words.innerHTML = '';
  }
});

recognition.addEventListener('end', recognition.start);
recognition.start();
