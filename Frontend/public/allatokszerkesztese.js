async function allatokszerkesztese(event) {
    event.preventDefault();

        const kutya =document.getElementById('kutya').value;
        const ivar = document.getElementById('ivar').value;
        const allatneve = document.getElementById('allatneve').value;
        const allattermete = document.getElementById('allattermete').value;
        const allatszine = document.getElementById('allatszine').value;
        const allatkora = document.getElementById('allatkora').value;
        const allatleirasa = document.getElementById('allatleirasa').value;
    
    if (kutya === '' || ivar === '' || allatneve === '' || allattermete === '' || allatszine === '' || allatkora === '' || allatleirasa === '') {
            alert("Minden mező kitöltése kötelező.");
            return;
    }

    try {

    const response = await fetch('http://127.0.0.1:8080/allatokszerkesztese', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ kutya:kutya, ivar:ivar, allatneve:allatneve, allattermete:allattermete, allatszine:allatszine, allatkora:allatkora, allatleirasa:allatleirasa})
    });
    
    const data = await response.json();
    console.log(data);

    if (response.ok) {
        console.log('Sikeres beküldés');
        alert("Sikeres beküldés.");
        window.location.href="allatokszerkesztese.html";
    } else {
        alert("A beküldés sikertelen.");
        window.location.href="allatokszerkesztese.html";

    }
    } catch (error) {
        console.error('Hiba történt:', error);
        alert("Valamilyen hiba történt a beküldés során.");
    }
}

