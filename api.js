// Base Url de l'API
const baseURL = "http://localhost:8000/api/v1/titles/";
// Définition des différents points
const rBestMovies = baseURL + '?sort_by=-imdb_score';
const movieByCategories = baseURL + "?sort_by=-imdb_score&genre=";

//  =======================
//      Meilleurs Films
//  =======================

async function getBestMovie() {
    var contentDivBestMovie = "";
    await fetch(rBestMovies)
        .then(response => response.json())
        .then(data => {
            let titleBM = data["results"][0]["title"];
            let imageBM = data["results"][0]["image_url"];
            let imdbScore = data["results"][0]["imdb_score"];
            // On fait une requête sur le film pour avoir sa description
            fetch(data["results"][0]["url"])
                .then(response => response.json())
                .then(data => {
                    let description = data["description"];
                    contentDivBestMovie += `
                    <div class="mainBestMovie">
                            <div>
                                <p>` + titleBM + `</p>
                                <p>` + description + `</p>
                                <p>` + imdbScore + ` / 10 sur IMDB</p>
                            </div>
                            <div class="mydivouter">
                                <img src="` + imageBM + `" style="width:200px; height:300px;"></img>
                                <button type="button" class="mybuttonoverlap btn btn-info">Plus d'infos</button>
                            </div>
                    </div>
                    `;
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
    await fetch(movieByCategories + genre)
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
            console.log(moviesInCategorie);
            return moviesInCategorie;
        })
    
}


//  ======================================
//      Info D'un Film (Ouverture Modal)
//  ======================================

function infoMovie(id) {
    var infoMovieTab = [];
    fetch(baseURL + id)
        .then(response => response.json())
        .then(data => {
            imageInfo = data["image_url"];
            titleInfo = data["title"];
            genreInfo = data["genres"];
            dateInfo = data["year"];
            rateInfo = data["rated"];
            imbdScoreInfo = data["imdb_score"];
            realisatorInfo = data["directors"];
            actorInfo = data["actors"];
            durationInfo = data["duration"];
            countryInfo = data["countries"];
            boxOfficeInfo = data["worldwide_gross_income"];
            summaryInfo = data["long_description"];
            infoMovieTab.push(imageInfo);
            infoMovieTab.push(titleInfo);
            infoMovieTab.push(genreInfo);
            infoMovieTab.push(dateInfo);
            infoMovieTab.push(rateInfo);
            infoMovieTab.push(imbdScoreInfo);
            infoMovieTab.push(realisatorInfo);
            infoMovieTab.push(actorInfo);
            infoMovieTab.push(durationInfo);
            infoMovieTab.push(countryInfo);
            infoMovieTab.push(boxOfficeInfo);
            infoMovieTab.push(summaryInfo);

            console.log("INFO D'UN FILM");
            console.log(imageInfo);
            console.log(titleInfo);
            console.log(genreInfo[0]);
            console.log(dateInfo);
            console.log(rateInfo);
            console.log(imbdScoreInfo);
            console.log(realisatorInfo);
            console.log(actorInfo[0]);
            console.log(durationInfo);
            console.log(countryInfo[0]);
            console.log(boxOfficeInfo);
            console.log(summaryInfo);
        })
    return infoMovieTab;
}



window.addEventListener('load', () => {
    getBestMovie();
    // infoMovie(1508669);
    // test = getMoviesPerCategories("Horror", 7);
    // console.log(test);
});