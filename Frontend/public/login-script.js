async function Login() {
    const email = document.querySelector('input[type="email"]').value;
    const password = document.querySelector('input[type="password"]').value;

    const response = await fetch('http://127.0.0.1:8080/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email: email, password: password })
    });
    
    const data = await response.json();
    if (response.ok) {
        if (data.isAdmin) {
            window.location.href = "galeriaszerkesztes.html";
        } else {
            window.location.href = "orokbefogadas.html";
        }
    } else {
        alert(data.error);
    }
}

async function Regisztracio() {
    const FelhasznaloNev = document.querySelector('input[id="FelhasznaloNev"]').value;
    const Email = document.querySelector('input[id="Email"]').value;
    const Jelszo = document.querySelector('input[id="Jelszo"]').value;

    if (FelhasznaloNev === '' || Email === '' || Jelszo === '') {
        alert("Minden mező kitöltése kötelező.");
        return;
    }

    if (!Email.includes('@')) {
        alert("Érvénytelen e-mail cím.");
        return;
    }

    const response = await fetch('http://127.0.0.1:8080/regisztracio', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({ FelhasznaloNev:FelhasznaloNev, Email:Email, Jelszo:Jelszo })
    });

    const data = await response.json();
    console.log(data);

    if (response.ok) {
        console.log('Sikeres regisztráció');
        alert("Sikeres regisztráció.");
        window.location.href="login.html";
    } else {
        alert("A regisztráció sikertelen. Az e-mail cím vagy a felhasználónév már foglalt.");
        window.location.href="regisztracio.html";
    }
}


