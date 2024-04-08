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

    const data = {
        email: email,
        password: regijelszo
    };

    try {
        const response = await fetch('http://localhost:8080/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        const responseData = await response.json();

        if (response.ok) {
            const newData = {
                email: email,
                ujjelszo: ujjelszo
            };

            const updateResponse = await fetch('http://localhost:8080/jelszomodositas', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newData),
            });

            const updateResponseData = await updateResponse.json();

            if (updateResponse.ok) {
                alert("Sikeres jelszó módosítás!");
                window.location.href = 'login.html';
            } else {
                alert("Hiba történt a jelszó módosítása során!");
            }
        } else {
            alert("Hibás e-mail cím vagy jelszó!");
        }
    } catch (error) {
        console.error('Hiba történt:', error);
    }
}
