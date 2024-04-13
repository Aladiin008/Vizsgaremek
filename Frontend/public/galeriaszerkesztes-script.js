async function upload(event) {
    event.preventDefault();

    const fileInput = document.getElementById('fileInput');
    const file = fileInput.files[0]; 

    if (file) {
        try {
            await uploadFile(file);
        } catch (error) {
            console.error('Hiba történt a fájl feltöltése során:', error);
        }
    } else {
        console.error('Nincs fájl kiválasztva.');
    }
}

async function uploadFile(file) {
    const formData = new FormData();
    formData.append('image', file);

    try {
        const response = await fetch('http://127.0.0.1:8080/upload', {
            method: 'POST',
            body: formData
        });

        if (!response.ok) {
            throw new Error('Hiba történt a fájl feltöltése során.');
        }

        const data = await response.json();
        console.log('Fájl sikeresen feltöltve:', data);
    } catch (error) {
        throw new Error(error.message);
    }
}