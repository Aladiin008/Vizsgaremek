async function jelszomodositas(event) {
    event.preventDefault();

    const email = document.getElementById('emailujjelszo').value;
    const regijelszo = document.getElementById('regijelszo').value;
    const ujjelszo = document.getElementById('ujjelszo').value;
    const ujjelszo2 = document.getElementById('ujjelszo2').value;

    if (ujjelszo !== ujjelszo2) {
        alert("Az új jelszavak nem egyeznek meg!");
        return;
    }

    const response = await fetch('http://127.0.0.1:8080/jelszomodositas', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email:email, regijelszo:regijelszo, ujjelszo:ujjelszo })
    });
    
    const data = await response.json();
    console.log(data);

    if (response.ok) {
        alert("Sikeres jelszómódosítás!");
        window.location.href = 'login.html';
    } else {
        alert("Hiba történt a jelszó módosítása során!");
    }

}