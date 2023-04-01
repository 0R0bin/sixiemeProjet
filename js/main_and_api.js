// Base Url de l'API
const baseURL = "http://localhost:8000";
// Définition des différents points
const uInfoMovie = baseURL + '/api/v1/titles/';
const uBestMovies = baseURL + '/api/v1/titles/?sort_by=-imdb_score';
const uMovieByCategories = baseURL + '/api/v1/titles/?sort_by=-imdb_score&genre=';

//  ======================
//      Meilleur Film
//  ======================
async function getBestMovie() {
    let contentDivBestMovie = "";
    await fetch(uBestMovies)
        .then(response => response.json())
        .then(data => {
            let idMovie = data["results"][0]["id"];
            let titleBM = data["results"][0]["title"];
            let imageBM = data["results"][0]["image_url"];
            let imdbScore = data["results"][0]["imdb_score"];
            // On fait une requête sur le film pour avoir sa description
            fetch(data["results"][0]["url"])
                .then(response => response.json())
                .then(data => {
                    let description = data["description"];
                    // Start content best movie
                    contentDivBestMovie += `
                    <div class="mainBestMovie">
                            <div>
                                <p>` + titleBM + `</p>
                                <p>` + description + `</p>
                                <p>` + imdbScore + ` / 10 sur IMDB</p>
                                <div class="btnsCardMovie">
                                    <button class="btnCardMovie">Lecture</button>
                                    <button class="btnCardMovie" onclick="openModal(` + idMovie + `)">Plus d'infos</button>
                                </div>
                            </div>
                            <div class="mydivouter">
                                <img src="` + imageBM + `" style="width:200px; height:300px;" alt="` + titleBM + `"></img>
                                <button class="mybuttonoverlap btn-info" onclick="openModal(` + idMovie + `)">Plus d'infos</button>
                            </div>
                    </div>
                    `;
                    // End content best movie
                    document.querySelector('#go_here_best_movie').insertAdjacentHTML('afterbegin', contentDivBestMovie);
                })
        })
}

//  =====================================
//    X Meilleurs Films D'une Catégorie
//  =====================================
// Pagination sur la requête API pour éviter de multiples requêtes !!!
async function getMoviesPerCategories(genre, filmToDisplay) {
    var moviesInCategorie = [];
    var compareNext;
    return fetch(uMovieByCategories + genre)
        .then(response => response.json())
        .then(async data => {
            data['results'].forEach(element => {
                moviesInCategorie.push(element);
            });
            compareNext = moviesInCategorie.length;

            while (compareNext < filmToDisplay && data["next"] != null) {
                // Requête sur l'url des films en page suivante
                await fetch(data["next"])
                .then(response => response.json())
                .then(data => {
                    data['results'].forEach(element => {
                        moviesInCategorie.push(element);
                    });
                    compareNext += data["results"].length;
                })
            }
            nbToDelete = moviesInCategorie.length - filmToDisplay;
            if (nbToDelete != 0) {
                moviesInCategorie.splice(-(nbToDelete));
            }
            return moviesInCategorie;
        })
    
}

//  =======================
//      Info D'un Film 
//  =======================
async function getInfoMovie(id) {
    return fetch(uInfoMovie + id)
        .then(response => response.json())
        .then(data => {return data;})
    
}

//  ================================
//      Au chargement de la page
//  ================================
window.addEventListener('load', () => {
    getBestMovie();
    // test = getMoviesPerCategories("", 8); 
});