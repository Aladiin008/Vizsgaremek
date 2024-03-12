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



        // A login form elküldésekor az adatok beküldése AJAX kéréssel
        document.querySelector('form').addEventListener('submit', async (event) => {
            event.preventDefault();
        
            const email = document.querySelector('input[type="email"]').value;
            const password = document.querySelector('input[type="password"]').value;
        
            try {
                const response = await fetch('http://127.0.0.1:8080/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ email, password })
                });
        
                const data = await response.json();
        
                if (response.ok) {
                    
                    console.log(data.message);
                    console.log(data.userData);
                    
                } else {
                    console.error(data.error);
                    res.send({"error": "Hiba a lekérés során"})
                }
            } catch (error) {
                console.error('Hiba történt:', error);
            }
        });
        