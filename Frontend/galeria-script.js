var wholeImgBox = document.getElementById("wholeImgBox");
var wholeImg = document.getElementById("wholeImg");

function openWholeImg(pic) {
    wholeImgBox.style.display = "flex";
    wholeImg.src = pic;
}

function closeWholeImg() {
    wholeImgBox.style.display = "none";
}

async function fetchImages() {
    try {
        const response = await fetch('http://localhost:8080/kepek');
        if (!response.ok) {
            throw new Error('Nem sikerült lekérni a képeket.');
        }
        const images = await response.json();
        const gallery = document.getElementById('gallery');
        images.forEach(image => {
            const img = document.createElement('img');
            img.src = `http://localhost:8080/images/${image.filename}`;
            img.alt = image.filename;
            img.classList.add('thumbnail');
            img.addEventListener('click', () => openWholeImg(`http://localhost:8080/images/${image.filename}`));
            gallery.appendChild(img);
        });
    } catch (error) {
        console.error('Hiba történt a képek lekérése során:', error);
    }
}

window.onload = fetchImages; 