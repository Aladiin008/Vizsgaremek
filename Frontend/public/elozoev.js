async function adatmodositas(event) {
    event.preventDefault();

        const honapok =document.getElementById('honapok').value;
        const osszallat = document.getElementById('osszallat').value;
        const kutyak = document.getElementById('kutyak').value;
    
    if (honapok === '' || osszallat === '' || kutyak === '') {
            alert("Minden mező kitöltése kötelező.");
            return;
    }

    try {

    const response = await fetch('http://127.0.0.1:8080/adatmodositas', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ honapok:honapok, osszallat:osszallat, kutyak:kutyak})
    });
    
    const data = await response.json();
    console.log(data);

    if (response.ok) {
        console.log('Sikeres beküldés');
        alert("Sikeres beküldés.");
        window.location.href="elozoev.html";
    } else {
        alert("A beküldés sikertelen.");
        window.location.href="elozoev.html";

    }
    } catch (error) {
        console.error('Hiba történt:', error);
        alert("Valamilyen hiba történt a beküldés során.");
    }
}

