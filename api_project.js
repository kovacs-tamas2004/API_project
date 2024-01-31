fetchData();

function fetchData() {
    fetch('https://restful-api.dev/')
        .then(response => response.json())
        .then(data => displayData(data))
        .catch(error => console.error(error));
}

function displayData(data) {
    const table = document.getElementById('tablazat');
    table.innerHTML = '<tr><th>ID</th><th>Név</th><th>Adatok</th></tr>';

    data.forEach(user => {
        const sor = `<tr>
                        <td>${user.id}</td>
                        <td>${user.name}</td>
                        <td>${user.data}</td>
                        <td>
                            <button onclick="Create(${user.id}, '${user.name}', ${user.data})">
                                Létrehozás
                            </button>
                            <button onclick="Update(${user.id}, '${user.name}', ${user.data})">
                                Módosítás
                            </button>
                            <button onclick="Deletee(${user.id}, '${user.name}', ${user.data})">
                                Törlés
                            </button>
                        </td>
                    </tr>`;
        table.innerHTML += sor;
    });
}

function Create() {
    const Letrehozas = document.getElementById('create');
    Letrehozas.innerHTML = `
        <h2>Új adat létrehozása</h2>
        <form id="create-form" onsubmit="createData(); return false;">
            <label for="create-name">Név:</label>
            <input type="text" id="create-name" required><br>
            <label for="create-data">Adatok:</label>
            <input type="text" id="create-data" required><br>
            <button type="submit">Létrehozás</button>
        </form>
    `;
}

function createData() {
    const name = document.getElementById('create-name').value;
    const data = document.getElementById('create-data').value;

    fetch('https://restful-api.dev/api/users', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, data }),
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Hiba az adat létrehozása során');
            }
            return response.json();
        })
        .then(data => {
            console.log('Új adat létrehozva:', data);
            fetchData();
        })
        .catch(error => {
            console.error(error);
            alert('Hiba az adat létrehozása során!');
        });
}

function Update() {
    const Modositas = document.getElementById('update');
    Modositas.innerHTML = `
        <form id="update-form" onsubmit="updateData(); return false;">
            <label for="update-id">ID:</label>
            <input type="text" id="update-id" required><br>
            <label for="update-name">Név:</label>
            <input type="text" id="update-name" required><br>
            <label for="update-data">Adatok:</label>
            <input type="text" id="update-data" required><br>
            <button type="submit">Mentés</button>
        </form>
    `;
}

function updateData() {
    const id = document.getElementById('update-id').value;
    const name = document.getElementById('update-name').value;
    const data = document.getElementById('update-data').value;

    fetch(`https://restful-api.dev/api/users/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, data }),
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Hiba a módosítás során');
            }
            return response.json();
        })
        .then(data => {
            console.log('Módosított adat:', data);
            fetchData(); 
        })
        .catch(error => {
            console.error(error);
            alert('Hiba a módosítás során!');
        });
}

function Deletee() {
    const Torles = prompt('Adja meg a törlendő felhasználó ID-jét:');
    fetch(`https://restful-api.dev/api/users/${Torles}`, {
        method: 'DELETE',
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Hiba a törlés során');
            }
            return response.json();
        })
        .then(data => {
            console.log('Törölt adat:', data);
            fetchData();
        })
        .catch(error => {
            console.error(error);
            alert('Hiba a törlés során!');
        });
}