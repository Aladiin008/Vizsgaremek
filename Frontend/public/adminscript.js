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
        "admin.html":"admin",
        "elozoev.html":"elozoev"

    };

   var activeLinkId = pageIds[currentPath];
    if (activeLinkId) {
        var activeLink = document.querySelector("#" + activeLinkId);
        if (activeLink) {
            activeLink.parentNode.classList.add("active");
        }
    }
    
});
/*
document.getElementById('bejelentkezes').addEventListener('click', async (event) => {
    event.preventDefault(); 

    try {
        const response = await fetch('http://127.0.0.1:8080/logout', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        });

        if (response.ok) {
            window.location.href = 'login.html';
        } else {
            const data = await response.json();
            alert(data.error || 'Hiba történt a kijelentkezés során.');
        }
    } catch (error) {
        console.error('Hiba történt a kérés során:', error);
        alert('Hiba történt a kijelentkezés során.');
    }
});*/