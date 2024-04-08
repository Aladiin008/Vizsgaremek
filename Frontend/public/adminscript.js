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
        "galeriaszerkesztes.html":"galeriaszerkesztes",
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
    
});