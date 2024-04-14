var kereses = document.getElementById('kereses');
var allatainkWrapper = document.querySelector('.allatainkwrapper');

kereses.addEventListener("click", function() {
    allatainkWrapper.style.display = "flex";
});


async function allataink(event) {
    event.preventDefault();

    const kutyakereses = document.getElementById('kutyakereses').value;
    const ivarkereses = document.getElementById('ivarkereses').value;
    const korkereses = document.getElementById('korkereses').value;

    if (kutyakereses === '' || ivarkereses === '' ||  korkereses === '') {
        alert("Minden mező kitöltése kötelező.");
        return;
    }

    
    try {
        const response = await fetch('http://127.0.0.1:8080/kereses', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({kutyakereses:kutyakereses,ivarkereses:ivarkereses,korkereses:korkereses})
        });
        
        if (!response.ok) {
            throw new Error('Hiba történt a keresés során.');
        }
        
        const results = await response.json();
        const wrapper = document.querySelector('.orokbefogadhato-wrapper');
        wrapper.innerHTML = ''; 

        if (results.length > 0) {
            results.forEach(result => {
                const div = document.createElement('div');
                const text = document.createElement('p');
                text.innerHTML = `Állat neve: ${result.allatnev}<br>Termete: ${result.termet}<br>Színe: ${result.szin}<br>Kora: ${result.kor}<br>Leírás az állatról: ${result.leiras}`;
                div.appendChild(text);
                wrapper.appendChild(div);
            });
        } else {
            alert('Nincs olyan állatunk, ami megfelel a keresési feltételeknek.');
            window.location.reload();

        }
    } catch (error) {
        alert('Hiba történt');
        window.location.reload();
    }
}

document.getElementById('keresesGomb').addEventListener('click', function() {
    document.getElementById('allatainkCim').style.display = 'block';
});