// backend/server.js
const express = require('express');
const axios = require('axios');

const app = express();
const PORT = 3000;

app.use(express.json());

app.post('/generateAudioFiles', async (req, res) => {
  try {
    const options = {
      method: 'POST',
      url: 'https://text-to-speech-neural-google.p.rapidapi.com/generateAudioFiles',
      headers: {
        'content-type': 'application/json',
        'X-RapidAPI-Key': '2a6dce0884msh49892b3bb88356cp166bdejsnadd15849c20d',
        'X-RapidAPI-Host': 'text-to-speech-neural-google.p.rapidapi.com'
      },
      data: req.body
    };

    const response = await axios.request(options);
    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while converting text to speech.' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
