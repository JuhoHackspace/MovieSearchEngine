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
  var currentPage = req.body.page;
  var filter = req.body.filter;
  const api_key = process.env.api_key;

  console.log("method genre: "+genre);
  console.log("method page: "+currentPage);
  console.log("method filter: "+filter);
  
  const url = `https://api.themoviedb.org/3/discover/movie?api_key=${api_key}&with_genres=${genre}&page=${currentPage}${filter === "en" ? "&with_original_language=en" : ""}`;

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

