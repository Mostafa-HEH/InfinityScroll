const imgContainer = document.getElementById('img-container');
const loader = document.getElementById('loader');

let ready = false;
let imgesloaded = 0;
let totalImages = 0;
let data = [];
const count = 10;
const apiKey = `Vajsy3P5SD8F2ZRuzxaTIPn6ndxl64Lj9ZcnCpNf2h4`;
const apiUrl= `https://api.unsplash.com/photos/random?client_id=${apiKey}&count=${count}`;


function imgLoaded(){
    imgesloaded++;
    if (imgesloaded === totalImages) {
        loader.hidden = true;
        ready = true;
    }
}

function displayPhoto() {
    imgesloaded = 0;
    totalImages = data.length;
    data.forEach((photo)=>{
        const item = document.createElement('a');
        item.setAttribute('href', photo.links.html);
        item.setAttribute('target','_blank');
        const img = document.createElement('img');
        img.setAttribute('src', photo.urls.regular);
        img.setAttribute('alt', photo.alt_description);
        img.setAttribute('title', photo.alt_description);

        img.addEventListener('load', imgLoaded);
        item.appendChild(img);
        imgContainer.appendChild(item);
    });
}

async function getPhotos(){
    try{
        const response = await fetch(apiUrl);
        data = await response.json();
        displayPhoto();
    } catch(error) {
        //error
    }
}

getPhotos()

window.addEventListener('scroll', ()=>{
    // window.innerHeight => is the browser height.
    // window.scrollY => when you scroll its the height you scroll.
    // document.body.offsetHeight => the height of body containers.
    if ((window.innerHeight + window.scrollY)
     >= (document.body.offsetHeight-1000) && ready) {
         ready = false;
         getPhotos()
     }
});

