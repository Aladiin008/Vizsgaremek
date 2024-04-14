async function feltoltes(event) {
    event.preventDefault();

    const fileInput = document.getElementById('fileInput');
    const file = fileInput.files[0]; 

    if (file) {
        try {
            await fileFeltoltes(file);
        } catch (error) {
            console.error('Hiba történt a fájl feltöltése során:', error);
        }
    } else {
        console.error('Nincs fájl kiválasztva.');
    }
}

async function fileFeltoltes(file) {
    const formData = new FormData();
    formData.append('image', file);

    try {
        const response = await fetch('http://127.0.0.1:8080/feltoltes', {
            method: 'POST',
            body: formData
        });

        if (!response.ok) {
            throw new Error('Hiba történt a fájl feltöltése során.');
        }
        const data = await response.json();
        alert('Fájl sikeresen feltöltve', data);
        window.location.reload();

    } catch (error) {
        alert('Nem sikerült a feltöltés', data);
        window.location.reload();

    }
}