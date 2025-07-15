// server/index.js
const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
app.use(express.json());

app.use(
    cors({
        origin: '*',
    })
);

const CLIENT_ID = "Ov23liW5jvYePA3DwlAR";
const CLIENT_SECRET = "ffa48f0ace3c490c961712ac97d6d2f5655c7fa5";
console.log("hello");
app.post('/github/callback', async (req, res) => {
  const { code } = req.body;

  console.log(code);

  try {
    const response = await axios.post(
      'https://github.com/login/oauth/access_token',
      {
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
        code: code,
      },
      {
        headers: { Accept: 'application/json' },
      }
    );

    const accessToken = response.data.access_token;
    res.json({ accessToken });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(8000, () => console.log('OAuth server running on http://localhost:8000'));
