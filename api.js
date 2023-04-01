// Base Url de l'API
const baseURL = "http://localhost:8000/api/v1/titles/";
// Définition des différents points
const rBestMovies = baseURL + '?sort_by=-imdb_score';
const movieByCategories = baseURL + "?sort_by=-imdb_score&genre=";

//  =======================
//      Meilleurs Films
//  =======================
async function getBestMovie() {
    let contentDivBestMovie = "";
    await fetch(rBestMovies)
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
                            </div>
                            <div class="mydivouter">
                                <img src="` + imageBM + `" style="width:200px; height:300px;"></img>
                                <button type="button" class="mybuttonoverlap btn btn-info" onclick="openModal(` + idMovie + `)">Plus d'infos</button>
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


//  =======================
//      Info D'un Film 
//  =======================
async function getInfoMovie(id) {
    // var infoMovieTab = [];
    return fetch(baseURL + id)
        .then(response => response.json())
        .then(data => {return data;})
    
}


//  ===================
//      Open Modal
//  ===================
async function openModal(idMovie){
    let contentSectionInfoMovie = ``;
    const infoMovie = await this.getInfoMovie(214915); // Request info d'un film
    let wgi = ``;
    let rated = ``;
    let genres = ``;

    if (infoMovie["worldwide_gross_income"] != null){
        wgi = `<p>` + infoMovie["worldwide_gross_income"] + `</p>`;
    }
    if (infoMovie['rated'] != 'Not rated or unkown rating'){
        rated = `<p>Revenus générés : ` + infoMovie["rated"] + `</p>`;
    }
    if (infoMovie["genres"].length > 1){
        for (var i = 0; i < infoMovie["genres"].length; i++){
            genres += infoMovie["genres"][i] + ', ';
        }
        genres = genres.substring(0, genres.length - 2);
    }
    

    // Start content modal info
    contentSectionInfoMovie += `
    <div class="mainDivModal">
        <div class="columnLeftModal">
            <h1>` + infoMovie["title"] + `</h1>
            <h3>Description :</h3>
            <p>` + infoMovie["long_description"] + `</p>
        </div>
        <div class="columnMiddleModal">
            <span style="display:flex;"><h3>Genre :</h3> <h7>` + infoMovie["genres"] + ` / 10</h7></span>
            <span style="display:flex;"><h3>Durée :</h3> <h7>` + infoMovie["duration"] + ` / 10</h7></span>
            <span style="display:flex;"><h3>Note IMDB :</h3> <h7>` + infoMovie["imdb_score"] + ` / 10</h7></span>
            ` + rated + `
            ` + wgi + `
            <span style="display:flex;"><h3>Année de production :</h3> <h7>` + infoMovie["year"] + `</h7></span>
            <span style="display:flex;"><h3>Pays de production :</h3> <h7>` + infoMovie["countries"] + `</h7></span>
            <span style="display:flex;"><h3>Directeur :</h3> <h7>` + infoMovie["directors"] + `</h7></span>
            <h3>Acteurs :</h3>
            <p>` + infoMovie["actors"] + `</p>
        </div>
        <div class="columnRightModal">
            <button class="btn-close" onclick="closeModal()">⨉</button>
            <img src="` + infoMovie["image_url"] + `">
        </div>
    </div>
    `;
    // End content modal info

    document.querySelector('#go_here_modal_info').insertAdjacentHTML('afterbegin', contentSectionInfoMovie);

    document.querySelector(".modal").classList.remove("hidden");
    document.querySelector(".overlay").classList.remove("hidden");
}


//  ===================
//      Close Modal
//  ===================
function closeModal () {
    document.querySelector('#go_here_modal_info').innerHTML = null;
    document.querySelector(".modal").classList.add("hidden");
    document.querySelector(".overlay").classList.add("hidden");
};


//  ================================
//      Au chargement de la page
//  ================================
window.addEventListener('load', () => {
    getBestMovie();

    // Ajout du listener en dehors de la modal pour la fermer
    document.querySelector(".overlay").addEventListener("click", closeModal);

    test = getMoviesPerCategories("Horror", 7); 
});