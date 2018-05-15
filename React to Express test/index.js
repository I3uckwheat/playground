const express = require('express');
const path = require('path');

const app = express();

app.use(express.static('react-app/build/static'));

app.use('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'react-test/build/index.html'));
});

app.listen(7777);
