document.addEventListener("DOMContentLoaded", function() {
    var navLinks = document.getElementById("links");

    window.menuMegjelenites = function() {
        navLinks.style.right = "-50%";
        
    };

    window.menuBezaras = function() {
        navLinks.style.right = "-100%";

    };


    var currentPath = window.location.pathname.split("/").pop(); 
    var pageIds = {
        "orokbefogadas.html":"orokbefogadas",
        "segitenek.html":"segitenek"
    };

   var activeLinkId = pageIds[currentPath];
    if (activeLinkId) {
        var activeLink = document.querySelector("#" + activeLinkId);
        if (activeLink) {
            activeLink.parentNode.classList.add("active");
        }
    }
    
});