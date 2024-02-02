const express = require('express');
const axios = require('axios');

const app = express();

app.use(express.static('public'));

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});