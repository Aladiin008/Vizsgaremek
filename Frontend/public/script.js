document.addEventListener("DOMContentLoaded", function() {
    var navLinks = document.getElementById("links");
    var menuButton = document.querySelector(".fa-bars");
    var closeButton = document.querySelector(".fa-times");

    menuButton.addEventListener("click", function() {
        navLinks.classList.add("active");
        ujMenu(true);
    });

    closeButton.addEventListener("click", function() {
        navLinks.classList.remove("active");
        ujMenu(false);
    });

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
        "login.html": "bejelentkezes",

    };

   var activeLinkId = pageIds[currentPath];
    if (activeLinkId) {
        var activeLink = document.querySelector("#" + activeLinkId);
        if (activeLink) {
            activeLink.parentNode.classList.add("active");
        }
    }
    
});


    