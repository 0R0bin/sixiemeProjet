//  ===================
//      Open Modal
//  ===================
async function openModal(idMovie){
    let contentSectionInfoMovie = ``;
    const infoMovie = await this.getInfoMovie(idMovie); // Request info d'un film
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
            <span style="display:flex;"><h3>Genre :</h3> <h7>` + infoMovie["genres"] + `</h7></span>
            <span style="display:flex;"><h3>Durée :</h3> <h7>` + infoMovie["duration"] + `</h7></span>
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
    // Ajout du listener en dehors de la modal pour la fermer
    document.querySelector(".overlay").addEventListener("click", closeModal);
});