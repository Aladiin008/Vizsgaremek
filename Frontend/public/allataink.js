async function allataink(event) {
    event.preventDefault();

    const kutyakereses = document.getElementById('kutyakereses').value;
    const ivarkereses = document.getElementById('ivarkereses').value;
    const korkereses = document.getElementById('korkereses').value;

    if (kutyakereses === '' || ivarkereses === '' ||  korkereses === '') {
        alert("Minden mező kitöltése kötelező.");
        return;
    }

    
    try {
        const response = await fetch('http://127.0.0.1:8080/allatokszerkesztese', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({kutyakereses:kutyakereses,ivarkereses:ivarkereses,korkereses:korkereses})
        });
        
        if (!response.ok) {
            throw new Error('Hiba történt a keresés során.');
        }
        
        const results = await response.json();
        const wrapper = document.querySelector('.orokbefogadhato-wrapper');
        wrapper.innerHTML = ''; 
        results.forEach(result => {
            const div = document.createElement('div');
            div.textContent = `Állat neve: ${result.allatnev}, Termete: ${result.termet}, Színe: ${result.szin}, Kora: ${result.kor}, Leírás az állatról: ${result.leiras}`;
            wrapper.appendChild(div);
        });
    } catch (error) {
        alert('Hiba történt');
    }
}