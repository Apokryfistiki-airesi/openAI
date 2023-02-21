const express = require('express');
const axios = require('axios');

const app = express();
const port = process.env.PORT || 2002
const apiUrl = 'https://api.lolhuman.xyz/api/openai';
const apiKey = 'BrunoSobrino';

app.get('/openai', (req, res) => {
  const { text, user } = req.query;

  if (!text || !user) {
    return res.status(400).json({ error: 'Missing query parameters' });
  }

  const params = {
    apikey: apiKey,
    text: text,
    user: user,
  };

  axios.get(apiUrl, { params })
    .then((response) => {
      // Send the response data back to the client
      res.json(response.data);
    })
    .catch((error) => {
      // Send an error response to the client
      res.status(500).json({ error: 'Internal server error' });
    });
});

app.listen(port, () => {
  console.log(`API server listening on port ${port}`);
});
