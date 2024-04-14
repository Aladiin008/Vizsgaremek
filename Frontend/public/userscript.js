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