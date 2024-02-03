const express = require('express');
const axios = require('axios');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();

const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.static('public'));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post("/category", function(req, res) {
  var genre = req.body.genre;
  console.log("method genre: "+genre);
  const url = 'https://api.themoviedb.org/3/discover/movie?api_key='+process.env.api_key+'&with_genres='+genre+'&page=20';

  fetch(url).then(response => response.json()).then(json => {
        res.json(json)
    }).catch(error => {
        console.log("error: "+error);
        res.json(error);
    })
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });

