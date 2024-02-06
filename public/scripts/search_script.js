const genreMap = new Map([
    [28, 'Action'],
    [12, 'Adventure'],
    [16, 'Animation'],
    [35, 'Comedy'],
    [80, 'Crime'],
    [99, 'Documentary'],
    [18, 'Drama'],
    [10751, 'Family'],
    [14, 'Fantasy'],
    [36, 'History'],
    [27, 'Horror'],
    [10402, 'Music'],
    [9648, 'Mystery'],
    [10749, 'Romance'],
    [878, 'Science Fiction'],
    [10770, 'TV Movie'],
    [53, 'Thriller'],
    [10752, 'War'],
    [37, 'Western']
])

const reverseGenreMap = new Map([...genreMap.entries()].map(([id, genre]) => [genre, id]));

function fetchMovies(changePageBy, new_genre) {
    if(new_genre===true) {
        var genre = document.getElementById('dropdownMenu').value;
        sessionStorage.setItem('genre', genre);
        sessionStorage.setItem('cnt_page',1);
    }
    var cnt_page = parseInt(sessionStorage.getItem('cnt_page'));
    var genreID = reverseGenreMap.get(sessionStorage.getItem('genre'));
    if(changePageBy===-1) {
        if(cnt_page - 1 >= 1) {
            cnt_page-=1;
        }
    }else if(changePageBy===1) {
        if(cnt_page + 1 <= parseInt(sessionStorage.getItem('total_pages'))) {
            cnt_page+=1;
        }
    }
    var language_filter = 'none';
    var checkbox = document.getElementById('englishCheckbox');
    if(checkbox.checked) {
        language_filter = 'en';
    }
    const resultsContainer = document.getElementById('movies');
    resultsContainer.innerHTML = "";
    fetch("/category", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            genre: genreID,
            page: cnt_page,
            filter: language_filter 
        }),
    }).then(response => response.json()).then(data => {
        for(let i = 0; i < data.results.length; i++) {
            const movieRow = document.createElement('div');
            movieRow.classList.add('movie_row');

            const titleSpan = document.createElement('span');
            titleSpan.textContent = data.results[i].original_title;
            movieRow.appendChild(titleSpan);

            const genresSpan = document.createElement('span');
            genresSpan.textContent = data.results[i].genre_ids.map(genreId => genreMap.get(genreId)).join(', ');
            movieRow.appendChild(genresSpan);

            const releaseYearSpan = document.createElement('span');
            releaseYearSpan.textContent = data.results[i].release_date ? new Date(data.results[i].release_date).getFullYear() : 'N/A';
            movieRow.appendChild(releaseYearSpan);
            
            const posterSpan = document.createElement('span');
            var poster_path = '<a href="https://image.tmdb.org/t/p/w342'+data.results[i].poster_path+'" target="_blank">Movie Poster</a>'
            posterSpan.innerHTML = poster_path;
            movieRow.appendChild(posterSpan);

            resultsContainer.appendChild(movieRow);
            
        }
        sessionStorage.setItem('total_pages',data.total_pages);
    }).catch(error => {
        console.log("Error: "+error);
        document.getElementById(results).innerHTML = "Error: "+error;
    });
    sessionStorage.setItem('cnt_page', cnt_page);
}
