document.addEventListener("DOMContentLoaded", function () {
    var navLinks = document.getElementById("links");

    window.menuMegjelenites = function () {
        navLinks.style.right = "-50%";
        ujMenu(true);
    };

    window.menuBezaras = function () {
        navLinks.style.right = "-100%";
        ujMenu(false);
    };

    function ujMenu(megjelenitve) {
        var orokbefogadhatoLink = document.querySelector("#links ul li:nth-child(2) a");
        if (orokbefogadhatoLink) {
            orokbefogadhatoLink.innerHTML = megjelenitve ? "Örökbefogadható<br> állataink" : "Örökbefogadható állataink";
        }
    };

    var currentPath = window.location.pathname.split("/").pop();
    var pageIds = {
        "index.html": "fooldal",
        "allataink.html": "allataink",
        "informaciok.html": "informaciok",
        "galeria.html": "galeria",
        "kapcsolat.html": "kapcsolat",
        "login.html": "bejelentkezes"
    };

    var activeLinkId = pageIds[currentPath];
    if (activeLinkId) {
        var activeLink = document.querySelector("#" + activeLinkId);
        if (activeLink) {
            activeLink.parentNode.classList.add("active");
        }
    }

});

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
    let div = document.getElementById("gallery");
    for (let i = 1; i <= 9; i++) {
        let img = document.createElement("img");
        img.src = "images/img" + i + ".jpg";

        img.addEventListener("click", function () {
            openWholeImg(this.src);
        });
        console.log(div);
        div.appendChild(img);
    }
}

Kepmegjelenites();

document.getElementById('searchForm').addEventListener('submit', async (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const fajtak = formData.get('fajtak');
    const ivar = formData.get('ivar');
    const kor = formData.get('kor');

    try {
        const response = await fetch(`/search?fajtak=${fajtak}&ivar=${ivar}&kor=${kor}`);
        const data = await response.json();

        const resultsDiv = document.getElementById('results');
        resultsDiv.innerHTML = '';

        data.forEach((row) => {
            const div = document.createElement('div');
            div.classList.add('animal');

            const img = document.createElement('img');
            img.src = `images/${row.id}.jpg`;

            const p = document.createElement('p');
            p.textContent = `Név: ${row.neve}, Kor: ${row.kora}, Termet: ${row.termete}, Szín: ${row.szine}, Leírás: ${row.leiras}`;

            div.appendChild(img);
            div.appendChild(p);
            resultsDiv.appendChild(div);
        });
    } catch (error) {
        console.error('Hiba történt:', error);
    }
});

async function Login(){

    const email = document.querySelector('input[type="email"]').value;
    const password = document.querySelector('input[type="password"]').value;

        const response = await fetch('http://127.0.0.1:8080/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email:email, password:password })
        })
        const data = await response.json();
        console.log(data);

        if(data.valasz)
            window.open("bejelentkezes.html");

       
};


async function Regisztracio() {
    const FelhasznaloNev = document.querySelector('input[id="FelhasznaloNev"]').value;
    const Email = document.querySelector('input[id="Email"]').value;
    const Jelszo = document.querySelector('input[id="Jelszo"]').value;

    const response = await fetch('http://127.0.0.1:8080/regisztracio', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({ FelhasznaloNev:FelhasznaloNev, Email:Email, Jelszo:Jelszo })
});

const data = await response.json();
console.log(data);

if (response.ok) {
    console.log('Sikeres regisztráció');
} else {
    console.error('Hiba történt a regisztráció során:', data.error);
}
    
}