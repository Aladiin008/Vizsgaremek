const emailDropdown = document.getElementById('email');

fetch('http://127.0.0.1:8080/felhasznalo_email')
    .then(response => response.json())
    .then(data => {
        data.forEach(email => {
            const option = document.createElement('option');
            option.text = email;
            option.value = email;
            emailDropdown.appendChild(option);
        });
    })
    .catch(error => console.error('Hiba történt az e-mail címek lekérése során:', error));



document.getElementById('adminForm').addEventListener('submit', async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const email = formData.get('email');
    const adminjogosultsag = formData.get('adminjogosultsag') === '1';

    try {
        const response = await fetch('http://127.0.0.1:8080/admin/update', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
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
