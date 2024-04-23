// frontend/script.js
document.addEventListener('DOMContentLoaded', () => {
  const convertBtn = document.getElementById('convertBtn');
  convertBtn.addEventListener('click', convertToSpeech);
});

async function convertToSpeech() {
  const text = document.getElementById('textArea').value;
  if (!text) {
    alert('Please enter some text to convert to speech.');
    return;
  }

  const options = {
    method: 'POST',
    url: 'http://localhost:3000/generateAudioFiles',
    headers: {
      'content-type': 'application/json',
      'X-RapidAPI-Key': '2a6dce0884msh49892b3bb88356cp166bdejsnadd15849c20d',
      'X-RapidAPI-Host': 'text-to-speech-neural-google.p.rapidapi.com'
    },
    data: {
      audioFormat: 'ogg',
      paragraphChunks: [text],
      voiceParams: {
        name: 'Wavenet-B',
        engine: 'google',
        languageCode: 'en-IN'
      }
    }
  };

  try {
    const response = await axios.request(options);
    const audioUrl = response.data.audioFiles[0].audioUri;
    const audioPlayer = document.getElementById('audioPlayer');
    audioPlayer.src = audioUrl;
    audioPlayer.style.display = 'block';
  } catch (error) {
    console.error(error);
    alert('An error occurred while converting text to speech. Please try again later.');
  }
}
