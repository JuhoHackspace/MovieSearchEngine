function fetchMovies() {
    var category = document.getElementById("inputText").value;
    if (!category) {
        console.error('Element with ID "inputText" not found.');
        return;
    }
    fetch("http://localhost:3000/category", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            genre: category // corrected the variable name
        }),
    }).then(response => response.json()).then(data => {
        for(let i = 0; i < data.length; i++) {
            document.getElementById('results').innerHTML += data[i].original_title + '<br>';
        }
    }).catch(error => {
        console.log("Error: "+error);
        document.getElementById(results).innerHTML = "Error: "+error;
    });
}