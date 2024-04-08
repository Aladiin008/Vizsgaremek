async function jelentkezes(event) {
    event.preventDefault();
    const onkentesNev = document.getElementById('onkentesnev').value;
    const onkentesEmail = document.getElementById('onkentesemail').value;
    const telefonszam = document.getElementById('telszam').value;
    const kozepiskolas = document.getElementById('kozepiskolas').value;

   
    if (onkentesNev === '' || onkentesEmail === '' || telefonszam === '' || kozepiskolas === '') {
        alert("Minden mező kitöltése kötelező.");
        return;
    }

    if (!onkentesEmail.includes('@')) {
        alert("Érvénytelen e-mail cím.");
        return;
    }


    const response = await fetch('http://127.0.0.1:8080/jelentkezes', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ onkentesnev:onkentesNev, onkentesemail:onkentesEmail, telszam:telefonszam, kozepiskolas:kozepiskolas })
    });
    
    const data = await response.json();
    console.log(data);

    if (response.ok) {
        console.log('Sikeres beküldés');
        alert("Sikeres beküldés.");
        window.location.href="segitenek.html";
    } else {
        alert("A beküldés sikertelen.");
        window.location.href="segitenek.html";

       
    }
}
