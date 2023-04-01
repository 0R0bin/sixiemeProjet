var ccompteurCat = 0;

//  =======================
//      Meilleurs Films
//  =======================
async function createBestMoviesCarroussel() {
    let contentBestMovieCarroussel = ``;
    const infoMovie = await this.getMoviesPerCategories("", 8); // Request info d'un film

    for (var i = 1; i < infoMovie.length; i++){
        let movie = infoMovie[i];
        let idMovie = movie['id']
        let titleMovie = movie['title']
        let genresMovie = movie['genres']
        let imgMovie = movie['image_url']
        let imdbMovie = movie['imdb_score']
        let genres = "";

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
        
        contentBestMovieCarroussel += `
        <div class="slide">
            <div class ="containerInfoSlide">
                <div class="firstColumnInfoSlide">
                    <h1>` + titleMovie + `</h1>
                    <span><h3>Genre :</h3> <h7>` + genres + `</h7></span>
                    <span><h3>Note IMDB :</h3> <h7>` + imdbMovie + ` / 10</h7></span>
                    <div class="btnsCardMovie">
                        <button class="btnCardMovie">Lecture</button>
                        <button class="btnCardMovie" onclick="openModal(` + idMovie + `)">Plus d'infos</button>
                    </div>
                </div>
                <img src="` + imgMovie + `" onclick="openModal(` + idMovie + `)" alt="` + titleMovie + `"></img>
            </div>
        </div>
        `;
    }
    contentBestMovieCarroussel += `
    <button class="btnCarroussel btn-next">></button>
    <button class="btnCarroussel btn-prev"><</button>
    `;
    document.querySelector('#go_here_js_best_cat').insertAdjacentHTML('afterbegin', contentBestMovieCarroussel);
}

//  ===============================
//      Construction catégories
//  ===============================
async function createMoviesCarroussel(nameCategorie, nameSlide, choiceColor) {
    let contentBestMovieCarroussel = ``;
    const infoMovie = await this.getMoviesPerCategories(nameCategorie, 7); // Request info d'un film

    for (var i = 0; i < infoMovie.length; i++){
        let movie = infoMovie[i];
        let idMovie = movie['id']
        let titleMovie = movie['title']
        let genresMovie = movie['genres']
        let imgMovie = movie['image_url']
        let imdbMovie = movie['imdb_score']
        let genres = "";
        let divCardMovie = "";
        let divTextCardMovie = "";

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

        if (choiceColor == 0){
            divCardMovie = `<div class ="containerInfoSlide">`;
            divTextCardMovie = `<div class="firstColumnInfoSlide">`;
        } else {
            divCardMovie = `<div class ="containerInfoSlideWhite">`;
            divTextCardMovie = `<div class="firstColumnInfoSlideBlack">`;
        }
        
        contentBestMovieCarroussel += `
        <div class="slide` + nameSlide + `">
            ` + divCardMovie + `
                ` + divTextCardMovie + `
                    <h1>` + titleMovie + `</h1>
                    <span><h3>Genre :</h3> <h7>` + genres + `</h7></span>
                    <span><h3>Note IMDB :</h3> <h7>` + imdbMovie + ` / 10</h7></span>
                    <div class="btnsCardMovie">
                        <button class="btnCardMovie">Lecture</button>
                        <button class="btnCardMovie" onclick="openModal(` + idMovie + `)">Plus d'infos</button>
                    </div>
                </div>
                <img src="` + imgMovie + `" style="width:200px; height:300px;" onclick="openModal(` + idMovie + `)" alt="` + titleMovie + `"></img>
            </div>
        </div>
        `;
    }
    if (choiceColor == 0){
        contentBestMovieCarroussel += `
        <button class="btnCarroussel btn-next` + nameSlide + `">></button>
        <button class="btnCarroussel btn-prev` + nameSlide + `"><</button>
        `;
    } else {
        contentBestMovieCarroussel += `
        <button class="btnCarrousselWhite btn-next` + nameSlide + `">></button>
        <button class="btnCarrousselWhite btn-prev` + nameSlide + `"><</button>
        `;
    }
    
    document.querySelector('#go_here_js_cat_1').insertAdjacentHTML('afterbegin', contentBestMovieCarroussel);
}


//  ================================
//      Au chargement de la page
//  ================================
window.addEventListener('load', async () => {
    await createBestMoviesCarroussel();
    await createMoviesCarroussel("Action", "FirstCat", 1);

    // Best Catégories Slides
    const slides = document.querySelectorAll(".slide");

    slides.forEach((slide, indx) => {
        slide.style.transform = `translateX(${indx * 100}%)`;
    });

    const nextSlide = document.querySelector(".btn-next");

    let curSlide = 0;
    let maxSlide = slides.length - 1;

    nextSlide.addEventListener("click", function () {
        if (curSlide === maxSlide) {
            curSlide = 0;
        } else {
            curSlide++;
        }

        slides.forEach((slide, indx) => {
            slide.style.transform = `translateX(${100 * (indx - curSlide)}%)`;
        });
    });

    const prevSlide = document.querySelector(".btn-prev");

    prevSlide.addEventListener("click", function () {
        if (curSlide === 0) {
            curSlide = maxSlide;
        } else {
            curSlide--;
        }

        slides.forEach((slide, indx) => {
            slide.style.transform = `translateX(${100 * (indx - curSlide)}%)`;
        });
    });
    
    // Première catégorie slides
    const slidesFirstCat = document.querySelectorAll(".slideFirstCat");
    slidesFirstCat.forEach((slide, indx) => {
        slide.style.transform = `translateX(${indx * 100}%)`;
    });
    const nextSlideFirstCat = document.querySelector(".btn-nextFirstCat");
    let curSlideFirstCat = 0;
    let maxSlideFirstCat = slidesFirstCat.length - 1;
    nextSlideFirstCat.addEventListener("click", function () {
        if (curSlideFirstCat === maxSlideFirstCat) {
            curSlideFirstCat = 0;
        } else {
            curSlideFirstCat++;
        }
        slidesFirstCat.forEach((slide, indx) => {
            slide.style.transform = `translateX(${100 * (indx - curSlideFirstCat)}%)`;
        });
    });
    const prevSlideFirstCat = document.querySelector(".btn-prevFirstCat");
    prevSlideFirstCat.addEventListener("click", function () {
        if (curSlideFirstCat === 0) {
            curSlideFirstCat = maxSlideFirstCat;
        } else {
            curSlideFirstCat--;
        }
        slidesFirstCat.forEach((slide, indx) => {
            slide.style.transform = `translateX(${100 * (indx - curSlideFirstCat)}%)`;
        });
    });
});