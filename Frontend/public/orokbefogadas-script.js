const allatokDropdown = document.getElementById('allatok');

fetch('http://127.0.0.1:8080/allatok_nevei')
    .then(response => response.json())
    .then(data => {
        data.forEach(allatnev => {
            const option = document.createElement('option');
            option.text = allatnev;
            option.value = allatnev;
            allatokDropdown.appendChild(option);
        });
    })
    .catch(error => console.error('Hiba történt az állatnevek lekérése során:', error));

async function orokbefogadas(event) {
    event.preventDefault();

    const feltetelekCheckbox = document.getElementById('feltetelek');
    if (!feltetelekCheckbox.checked) {
        alert("Az örökbefogadási feltételeket el kell fogadnia!");
        return;
    }

    const gazdiemail = document.getElementById('gazdiemail').value;
    const gazdinev = document.getElementById('gazdinev').value;
    const varos = document.getElementById('varos').value;
    const utca = document.getElementById('utca').value;
    const hazszam = document.getElementById('hazszam').value;
    const telefonszam = document.getElementById('telefonszam').value;
    const allatnev = allatokDropdown.value;
        
    if (gazdiemail === '' ||gazdinev === '' || varos === '' || utca === '' || hazszam === '' || telefonszam === '') {
        alert("Minden mező kitöltése kötelező.");
        return;
        }
        
        const response = await fetch('http://127.0.0.1:8080/orokbefogadas', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({gazdiemail:gazdiemail, gazdinev:gazdinev, varos:varos, utca:utca, hazszam:hazszam, telefonszam:telefonszam, allatnev:allatnev })
        });
            
        const data = await response.json();
        console.log(data);
        
        if (response.ok) {
            console.log('Sikeres beküldés');
            alert("Sikeres örökbefogadás.");
            window.location.reload();
        } else {
            alert("A beküldés sikertelen.");
            window.location.reload();
        }
}