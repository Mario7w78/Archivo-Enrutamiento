let button = document.querySelector('.select-dropdown');
let choose = document.querySelector('.choose');

let grafico = document.querySelector('.grafico');

let origen = document.getElementById('origen');
let destino = document.getElementById('destino');

button.addEventListener('click',(event)=>{
    choose.classList.add('view')
    button.classList.add('view')
    event.stopPropagation();
})

choose.addEventListener('click', (event) => {
    event.stopPropagation();
});

document.addEventListener('click', () => {
    choose.classList.remove('view');
    button.classList.remove('view');
});




let options = "";

// Nodos de Amazonas
for (let i = 1; i <= 5; i++) {
    options += `<option class="op" value="Nodo Amazonas ${i}">Nodo Amazonas ${i}</option>`;
}

// Nodos de Áncash
for (let i = 1; i <= 3; i++) {
    options += `<option class="op" value="Nodo Áncash ${i}">Nodo Áncash ${i}</option>`;
}

// Nodos de Apurímac
for (let i = 1; i <= 5; i++) {
    options += `<option class="op" value="Nodo Apurímac ${i}">Nodo Apurímac ${i}</option>`;
}

// Nodos de Arequipa
for (let i = 1; i <= 4; i++) {
    options += `<option class="op" value="Nodo Arequipa ${i}">Nodo Arequipa ${i}</option>`;
}

// Nodos de Ayacucho
for (let i = 1; i <= 8; i++) {
    options += `<option class="op" value="Nodo Ayacucho ${i}">Nodo Ayacucho ${i}</option>`;
}

// Nodos de Cajamarca
for (let i = 1; i <= 4; i++) {
    options += `<option class="op" value="Nodo Cajamarca ${i}">Nodo Cajamarca ${i}</option>`;
}

// Nodos de Cuzco
for (let i = 1; i <= 5; i++) {
    options += `<option class="op" value="Nodo Cuzco ${i}">Nodo Cuzco ${i}</option>`;
}

// Nodos de Huancavelica
for (let i = 1; i <= 17; i++) {
    options += `<option class="op" value="Nodo Huancavelica ${i}">Nodo Huancavelica ${i}</option>`;
}

// Nodos de Huancayo
for (let i = 1; i <= 3; i++) {
    options += `<option class="op" value="Nodo Huancayo ${i}">Nodo Huancayo ${i}</option>`;
}

// Nodos de Huánuco
for (let i = 1; i <= 4; i++) {
    options += `<option class="op" value="Nodo Huánuco ${i}">Nodo Huánuco ${i}</option>`;
}

// Nodos de Ica
for (let i = 1; i <= 6; i++) {
    options += `<option class="op" value="Nodo Ica ${i}">Nodo Ica ${i}</option>`;
}

// Nodos de La Libertad
for (let i = 1; i <= 3; i++) {
    options += `<option class="op" value="Nodo La Libertad ${i}">Nodo La Libertad ${i}</option>`;
}

// Nodos de Lambayeque
for (let i = 1; i <= 2; i++) {
    options += `<option class="op" value="Nodo Lambayeque ${i}">Nodo Lambayeque ${i}</option>`;
}

// Nodos de Lima
for (let i = 1; i <= 14; i++) {
    options += `<option class="op" value="Nodo Lima ${i}">Nodo Lima ${i}</option>`;
}

// Nodos de Moquegua
for (let i = 1; i <= 2; i++) {
    options += `<option class="op" value="Nodo Moquegua ${i}">Nodo Moquegua ${i}</option>`;
}

// Nodos de Madre de Dios
for (let i = 1; i <= 3; i++) {
    options += `<option class="op" value="Nodo Madre de Dios ${i}">Nodo Madre de Dios ${i}</option>`;
}

// Nodos de Pasco 
for (let i = 1; i <= 3; i++) {
    options += `<option class="op" value="Nodo Pasco ${i}">Nodo Pasco ${i}</option>`;
}

// Nodos de Piura
for (let i = 1; i <= 3; i++) {
    options += `<option class="op" value="Nodo Piura ${i}">Nodo Piura ${i}</option>`;
}

// Nodos de Puno
for (let i = 1; i <= 5; i++) {
    options += `<option class="op" value="Nodo Puno ${i}">Nodo Puno ${i}</option>`;
}

// Nodos de San Martín
for (let i = 1; i <= 4; i++) {
    options += `<option class="op" value="Nodo San Martín ${i}">Nodo San Martín ${i}</option>`;
}

// Nodos de Tacna
for (let i = 1; i <= 2; i++) {
    options += `<option class="op" value="Nodo Tacna ${i}">Nodo Tacna ${i}</option>`;
}

// Nodos de Tumbes
for (let i = 1; i <= 1; i++) {
    options += `<option class="op" value="Nodo Tumbes ${i}">Nodo Tumbes ${i}</option>`;
}

// Nodos de Ucayali
for (let i = 1; i <= 5; i++) {
    options += `<option class="op" value="Nodo Ucayali ${i}">Nodo Ucayali ${i}</option>`;
}




origen.innerHTML = '<option value="" disabled selected>Origen</option>'+ options;
destino.innerHTML = '<option value="" disabled selected>Destino</option>'+ options;
