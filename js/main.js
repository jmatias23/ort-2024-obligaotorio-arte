let sistema = new Sistema();

window.addEventListener("load", inicio);
let selectDerecha, selectIzquierda;

function inicio() {
    selectDerecha = document.getElementById("selectArtistasDerecha");
    selectIzquierda = document.getElementById("selectArtistasIzquierda");
    document.getElementById("idFrmRegistrarArtista").addEventListener("submit", agregarArtista);
    document.getElementById("idFrmRegistrarExposicion").addEventListener("submit", agregarExposiscion);
    document.getElementById("pasarDerecha").addEventListener("click", moverArtistasDerecha)
    document.getElementById("pasarIzquierda").addEventListener("click", moverArtistasIzquierda)
    cargarSelectArtistas();
}

function limpiar() {
    document.getElementById("idFrmRegistrarArtista").reset();
    cargar();
}

function cargar() {
    cargarSelectArtistas();
}

function cargarSelectArtistas() {
    selectIzquierda.innerHTML = "";
    for (let i = 0; i < sistema.listaArtistas.length; i++) {
        let nombre = sistema.listaArtistas[i].nombre;
        let opcion = document.createElement("option");
        let textoOpcion = document.createTextNode(nombre);
        opcion.appendChild(textoOpcion);
        selectIzquierda.appendChild(opcion);
    }
    ordenarSelect(selectIzquierda)
}

function agregarArtista(event) {
    event.preventDefault();
    let nombre = document.getElementById("idNombreArtista").value;
    let edad = document.getElementById("idEdadArtista").value;
    let estilo = document.getElementById("idEstilo").value;

    if (sistema.existeArtista(nombre)) {
        alert("Artista ya existe.");
    } else {
        sistema.agregarArtista(nombre, edad, estilo);
        alert("artista registrado");
        limpiar();
    }
}


function agregarExposiscion(event) {
    event.preventDefault();
    const titulo = document.getElementById("tituloExposicion").value;
    const fecha = document.getElementById("fechaExposicion").value;
    const descripcion = document.getElementById("descripcionExposicion").value;
    const seleccionados = document.getElementById("selectArtistasDerecha");

    if (seleccionados.length == 0) {
        alert("Debe agregar al menos un artista a la lista.")
        return;
    }
    let artistas = [];

    for (let i = 0; i < seleccionados.length; i++) {
        let nombre = seleccionados[i].textContent;
        artistas.push(sistema.obtenerArtistaPorNombre(nombre));
    }

    console.log(artistas);

    if (sistema.existeExposicion(titulo)) {
        alert("Artista ya existe.");
    } else {
        sistema.agregarExposicion(titulo, fecha, descripcion, artistas);
        alert("artista registrado");
        document.getElementById("idFrmRegistrarExposicion").reset();
        seleccionados.innerHTML = "";
        cargarSelectArtistas();
    }
}

function elimnarElementoDeSelect(selectARemover, valorAEliminar) {
    for (let i = 0; i < selectARemover.options.length; i++) {
        if (selectARemover.options[i].textContent === valorAEliminar) {
            selectARemover.remove(i); // Remover la opción
            break;
        }
    }
}

function moverOpcion(selectOrigen, selectDestino, elementosSeleccionados) {
    for (const seleccionado of elementosSeleccionados) {
        const option = document.createElement("option");
        option.textContent = seleccionado.textContent;
        selectDestino.appendChild(option);
        ordenarSelect(selectDestino)
        elimnarElementoDeSelect(selectOrigen, seleccionado.textContent)
    }
}

function moverArtistasDerecha() {
    let seleccionados = document.querySelectorAll("#selectArtistasIzquierda option:checked");

    moverOpcion(selectIzquierda, selectDerecha, seleccionados);
}

function moverArtistasIzquierda() {
    let seleccionados = document.querySelectorAll("#selectArtistasDerecha option:checked");

    moverOpcion(selectDerecha, selectIzquierda, seleccionados);
}

function ordenarSelect(selectAOrdenar) {
    const optionsArray = Array.from(selectAOrdenar.options);

    // Ordenar el array de opciones por texto
    optionsArray.sort((a, b) => a.text.localeCompare(b.text));

    // Limpiar y agregar las opciones ordenadas al select
    selectAOrdenar.innerHTML = '';
    optionsArray.forEach(option => selectAOrdenar.add(option));
}


