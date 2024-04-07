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
            window.location.href = "blogszerkesztes.html";
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

document.getElementById('adminForm').addEventListener('submit', async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const email = formData.get('email');
    const adminjogosultsag = formData.get('adminjogosultsag') === '1';

    try {
        const response = await fetch('http://127.0.0.1:8080/admin/update', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, adminjogosultsag })
        });

        if (response.ok) {
            alert('Adminjogosultság sikeresen frissítve.');
        } else {
            const data = await response.json();
            alert(data.error || 'Hiba történt a frissítés során.');
        }
    } catch (error) {
        console.error('Hiba történt a kérés során:', error);
        alert('Hiba történt a kérés során.');
    }
});
