//  ===================
//      Open Modal
//  ===================
async function openModal(idMovie){
    let contentSectionInfoMovie = ``;
    const infoMovie = await this.getInfoMovie(idMovie); // Request info d'un film
    let genresMovie = infoMovie['genres'];
    let wgi = ``;
    let rated = ``;
    let genres = ``;

    // Take care of null income
    if (infoMovie["worldwide_gross_income"] != null){
        wgi = `<span><h3>Revenus générés :</h3> <h7>` + infoMovie["worldwide_gross_income"] + ` $</h7></span>`;
    }
    if (infoMovie['rated'] != 'Not rated or unkown rating'){
        rated = `<span><h3>Guide parental :</h3> <h7>` + infoMovie["rated"] + `</h7></span>`;
    }
    if (genresMovie.length == 0){
        genres = "Non défini"
    } else if (genresMovie.length == 1){
        genres = genresMovie[0]
    } else {
        for (var j = 0; j < genresMovie.length; j++){
            genres += genresMovie[j] + ', ';
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
            <span><h3>Genre :</h3> <h7>` + genres + `</h7></span>
            <span><h3>Durée :</h3> <h7>` + infoMovie["duration"] + ` mins</h7></span>
            <span><h3>Note IMDB :</h3> <h7>` + infoMovie["imdb_score"] + ` / 10</h7></span>
            ` + rated + `
            ` + wgi + `
            <span><h3>Année de production :</h3> <h7>` + infoMovie["year"] + `</h7></span>
            <span><h3>Pays de production :</h3> <h7>` + infoMovie["countries"] + `</h7></span>
            <span><h3>Directeur :</h3> <h7>` + infoMovie["directors"] + `</h7></span>
            <h3>Acteurs :</h3>
            <p>` + infoMovie["actors"] + `</p>
        </div>
        <div class="columnRightModal">
            <button class="btn-close" onclick="closeModal()">⨉</button>
            <img src="` + infoMovie["image_url"] + `" alt="` + infoMovie["title"] + `">
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
    // Ajout du listener en dehors de la modal pour la fermer
    document.querySelector(".overlay").addEventListener("click", closeModal);
});