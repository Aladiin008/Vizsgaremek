var wholeImgBox = document.getElementById("wholeImgBox");
var wholeImg = document.getElementById("wholeImg");

function openWholeImg(pic) {
    wholeImgBox.style.display = "flex";
    wholeImg.src = pic;
}

function closeWholeImg() {
    wholeImgBox.style.display = "none";
}

function Kepmegjelenites() {
    const div = document.getElementById("gallery");    
    fetch('/getImages', {
        method: 'GET'

    })

    .then(response => {
        if (!response.ok) {
            throw new Error('Hiba történt a kérés során: ' + response.statusText);
        }
        return response.json(); 
    })
    .then(data => {
        data.forEach(item => {
            const img = document.createElement("img");
            img.src = item.filepath; 
            img.className = "gallery-img";
            img.addEventListener("click", function() {
                openWholeImg(this.src);
            });
            div.appendChild(img);
        });
    })
    .catch(error => {
        console.error('Hiba történt:', error);
    });
}

Kepmegjelenites();