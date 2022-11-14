// Base Url de l'API
const baseURL = "http://localhost:8000/api/v1/titles/";
// Définition des différents points
const rBestMovies = baseURL + '?sort_by=-imdb_score';
const moveByCategories = baseURL + "";

// Création de notre objet requête
var request = new XMLHttpRequest();

// //  =======================
// //      Meilleurs Films
// //  =======================
// request.open('GET', rBestMovies);
// request.responseType = 'json';
// request.send();

// request.onloadend = function() {
//     var reponse = request.response;
//     var fullMovies = reponse['results']
//     // A ajouter -> Choix aléatoire du meilleur film affiché !!!!!!!!!!!!!!!
//     titleBM = fullMovies[0]['title'];
//     imageBM = fullMovies[0]['image_url'];
//     urlBM = fullMovies[0]['url']

//     console.log("Meilleur film")
//     console.log(titleBM);
//     console.log(imageBM);
//     //  Requête sur le meilleur film pour avoir sa description
//     request.open('GET', urlBM);
//     request.responseType = 'json';
//     request.send();
//     request.onloadend = function() {
//         var reponse = request.response;
//         console.log(reponse['description']);
//     }
    
//     for (let i = 1; i < 7; i++) {
//         console.log("Film " + i);
//         // imageBM = fullMovies[i]['image_url'];
//       }
// }

//  =======================
//      Meilleurs Films
//  =======================

async function getBestMovie() {

    await fetch(rBestMovies)
        .then(response => response.json())
        .then(data => {
            titleBM = data["results"][0]["title"];
            imageBM = data["results"][0]["image_url"];
            console.log(titleBM);
            console.log(imageBM);
            // On fait une requête sur le film pour avoir sa description
            fetch(data["results"][0]["url"])
                .then(response => response.json())
                .then(data => {
                    description = data["description"];
                    console.log(description);
                    console.log("Test3");
                })
        })

}

//     for (let i = 1; i < 7; i++) {
//         console.log("Film " + i);
//         // imageBM = fullMovies[i]['image_url'];
//       }

window.addEventListener('load', () => {
    getBestMovie();
    console.log("Hi");
});