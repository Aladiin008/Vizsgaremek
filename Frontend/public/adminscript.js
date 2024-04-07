document.addEventListener("DOMContentLoaded", function() {
    var navLinks = document.getElementById("links");

    window.menuMegjelenites = function() {
        navLinks.style.right = "-50%";
        ujMenu(true);
    };

    window.menuBezaras = function() {
        navLinks.style.right = "-100%";
        ujMenu(false);
    };

    function ujMenu(megjelenitve) {
        var adminLink = document.querySelector("#links ul li:nth-child(2) a");
        if (adminLink) {
            adminLink.innerHTML = megjelenitve ? "Örökbefogadható <br>állataink szerkesztése" : "Örökbefogadható állataink szerkesztése";
        }

        var adminLink = document.querySelector("#links ul li:nth-child(3) a");
        if (adminLink) {
            adminLink.innerHTML = megjelenitve ? "Adminjogosultság<br> kapcsoló" : "Adminjogosultság kapcsoló";
        }
    };

    var currentPath = window.location.pathname.split("/").pop(); 
    var pageIds = {
        "blogszerkesztes.html":"blogszerkesztes",
        "allatokszerkesztese.html":"allatokszerkesztese",
        "admin.html":"admin"

    };

   var activeLinkId = pageIds[currentPath];
    if (activeLinkId) {
        var activeLink = document.querySelector("#" + activeLinkId);
        if (activeLink) {
            activeLink.parentNode.classList.add("active");
        }
    }
    async function allatokszerkesztese(){
        adminForm.addEventListener("submit", function(event) {
            event.preventDefault();
        
            const kutya = document.querySelector("select[name='kutya']").value;
            const ivar = document.querySelector("select[name='ivar']").value;
            const allatneve = document.querySelector("textarea[name='allatneve']").value;
            const allattermete = document.querySelector("textarea[name='allattermete']").value;
            const allatszine = document.querySelector("textarea[name='allatszine']").value;
            const allatkora = document.querySelector("textarea[name='allatkora']").value;
            const allatleirasa = document.querySelector("textarea[name='allatleirasa']").value;
        
            var data = {
                kutya: kutya,
                ivar: ivar,
                nev: allatneve,
                termet: allattermete,
                szin: allatszine,
                kor: allatkora,
                leiras: allatleirasa
            };
        
            fetch('http://localhost:8080/allatokszerkesztese', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            })
            .then(response => response.json())
            .then(data => {
                console.log('Sikeres mentés:', data);
            })
            .catch((error) => {
                console.error('Hiba történt:', error);
            });
        })};
    
    
});