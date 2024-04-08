window.onload = function() {
    LegfrissebbVelemenyek(); 
}

async function Velemeny() {
    const nev = document.getElementById('nev').value;
    const velemeny = document.getElementById('velemeny').value;

    try {
        const response = await fetch('http://127.0.0.1:8080/velemenyek', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ nev:nev, velemeny:velemeny })
        });

        if (response.ok) {
            alert('Vélemény sikeresen elküldve.');
            LegfrissebbVelemenyek(); 
            window.location.href = "kapcsolat.html";

        } else {
            const data = await response.json();
            alert(data.error || 'Hiba történt a küldés során.');
        }
    } catch (error) {
        console.error('Hiba történt a kérés során:', error);
        alert('Hiba történt a kérés során.');
    }
}

async function LegfrissebbVelemenyek() {
    try {
        const response = await fetch('http://localhost:8080/legfrissebb_velemenyek');
        const velemenyek = await response.json();
        const tiirtatok = document.querySelector('.tiirtatok-wrapper');
        tiirtatok.innerHTML = '';

        velemenyek.forEach(velemeny => {
            const velemenyElem = document.createElement('div');
            velemenyElem.classList.add('velemeny');

            const nevElem = document.createElement('div');
            nevElem.classList.add('nev');
            nevElem.textContent = velemeny.Nev;

            const szovegElem = document.createElement('div');
            szovegElem.classList.add('szoveg');
            szovegElem.textContent = velemeny.Velemeny;

            velemenyElem.appendChild(szovegElem);
            velemenyElem.appendChild(nevElem);

            tiirtatok.appendChild(velemenyElem);
        });
        
    } catch (error) {
        console.error('Hiba történt a legfrissebb vélemények betöltésekor:', error);
    }
}