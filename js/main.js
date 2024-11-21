let sistema = new Sistema();

window.addEventListener("load", inicio);
let selectDerecha, selectIzquierda, selectExposicion, selectFiltroExposicion, tablaComentarios, exposicionesMasArtistas,
    exposicionesConComentarios, buttonOrdenCalificacion;
let ordenCalificacion = true;


function filtrarComentarios() {
    cargarTablaComentarios(selectFiltroExposicion.value, ordenCalificacion)
}

function cambiarOrden(event) {
    event.preventDefault();
    if (ordenCalificacion) {
        ordenCalificacion = false;
        buttonOrdenCalificacion.textContent = "Calificación creciente";
    }else{
        ordenCalificacion = true;
        buttonOrdenCalificacion.textContent = "Calificación decreciente";
    }

    cargarTablaComentarios(selectFiltroExposicion.value, ordenCalificacion)
}

function inicio() {
    buttonOrdenCalificacion = document.getElementById("ordenCalificacion");
    selectDerecha = document.getElementById("selectArtistasDerecha");
    selectIzquierda = document.getElementById("selectArtistasIzquierda");
    selectExposicion = document.getElementById("exposicionElegida");
    selectFiltroExposicion = document.getElementById("filtroExposicion");
    tablaComentarios = document.getElementById("tablaComentarios");
    exposicionesMasArtistas = document.getElementById("exposicionesMasArtistas")
    exposicionesConComentarios = document.getElementById("exposicionesConComentarios")

    document.getElementById("idFrmRegistrarArtista").addEventListener("submit", agregarArtista);
    document.getElementById("idFrmRegistrarExposicion").addEventListener("submit", agregarExposiscion);
    document.getElementById("formComentarios").addEventListener("submit", agregarComentario);

    selectFiltroExposicion.addEventListener("change", filtrarComentarios)
    buttonOrdenCalificacion.addEventListener("click", cambiarOrden)

    document.getElementById("pasarDerecha").addEventListener("click", moverArtistasDerecha)
    document.getElementById("pasarIzquierda").addEventListener("click", moverArtistasIzquierda)

    cargarSelectArtistas();
    cargarSelectExposicion();
}

function limpiar() {
    document.getElementById("idFrmRegistrarArtista").reset();
    cargar();
}

function cargar() {
    cargarSelectArtistas();
    cargarSelectArtistas();
    cargarSelectExposicion();
    cargarSelectExposicionFiltro();
    cargarListasMasArtistas();
    cargarTablaComentarios();
    cargarListasConComentarios();
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
        cargar();
    }
}

function agregarExposiscion(event) {
    event.preventDefault();
    const titulo = document.getElementById("tituloExposicion").value;
    const fecha = document.getElementById("fechaExposicion").value;
    const descripcion = document.getElementById("descripcionExposicion").value;
    const seleccionados = document.getElementById("selectArtistasDerecha");

    if (seleccionados.length === 0) {
        alert("Debe agregar al menos un artista a la lista.")
        return;
    }
    let artistas = [];

    for (let i = 0; i < seleccionados.length; i++) {
        let nombre = seleccionados[i].textContent;
        artistas.push(sistema.obtenerArtistaPorNombre(nombre));
    }

    if (sistema.existeExposicion(titulo)) {
        alert("Exposición ya existe.");
    } else {
        sistema.agregarExposicion(titulo, fecha, descripcion, artistas);
        alert("Exposisción registrada");
        document.getElementById("idFrmRegistrarExposicion").reset();
        seleccionados.innerHTML = "";
        cargar();
    }
}

function cargarListasMasArtistas() {
    const exposiciones = sistema.obtenerExposicionesConMasArtistas();
    exposicionesMasArtistas.innerHTML = ""
    if (exposiciones.length === 0) {
        let item = document.createElement("li");
        item.textContent = "Sin Datos";
        exposicionesMasArtistas.appendChild(item);
    } else {
        for (let i = 0; i < exposiciones.length; i++) {
            let item = document.createElement("li");
            item.textContent = exposiciones[i].titulo;
            exposicionesMasArtistas.appendChild(item);
        }
    }
}

function cargarListasConComentarios() {
    const exposiciones = sistema.obtenerExposicionesConComentarios();
    exposicionesConComentarios.innerHTML = ""
    if (exposiciones.length === 0) {
        let item = document.createElement("li");
        item.textContent = "Sin Datos";
        exposicionesConComentarios.appendChild(item);
    } else {
        for (let i = 0; i < exposiciones.length; i++) {
            let item = document.createElement("li");
            item.textContent = exposiciones[i].titulo + ", " + exposiciones[i].fecha;
            exposicionesConComentarios.appendChild(item);
        }
    }
}

function agregarComentario(event) {
    event.preventDefault();

    const visitante = document.getElementById("nombreVisitante").value;
    const exposicion = document.getElementById("exposicionElegida").value;
    const comentario = document.getElementById("comentarioVisitante").value;
    let calificacion = document.querySelector('input[name=calificacion]:checked');
    const visitaGuiada = document.querySelector('input[name=comentarioVisitaGuiada]');

    if (calificacion == undefined) {
        alert("Debe seleccionar una calificación")
        return;
    }

    calificacion = calificacion.value;

    if (sistema.existeComentario(exposicion, visitante)) {
        alert("Ya existe un comentario de este visitante para esta exposición")
        return;
    }

    const exposicionEncontrada = sistema.obtenerExposicionPorTitulo(exposicion)
    sistema.agregarVisita(exposicionEncontrada, visitante, comentario, calificacion, visitaGuiada.checked)
    document.getElementById("formComentarios").reset()
    cargar();
}


function mostrarInfo(id) {
    const exposicion = sistema.obtenerExposicionPorIdVisita(id);
    let mensaje = "";
    const enter = "\n";
    mensaje += "Titulo: " + exposicion.titulo + enter;
    mensaje += "Fecha: " + exposicion.fecha + enter;
    mensaje += "Descripcion: " + exposicion.descripcion + enter;
    mensaje += "Artistas: " + enter;
    for (let i = 0; i < exposicion.artistas; i++) {
        mensaje += exposicion.artistas[i].nombre + enter;
    }

    alert(mensaje);
}

function obtenerImagenDeCalificacion(calificacion) {
    switch (calificacion) {
        case "1":
            return '<img alt="Rojo" src="img/IMG-20241023-WA0007.jpg">';
        case "2":
            return '<img alt="Naranja" src="img/IMG-20241023-WA0011.jpg">';
        case "3":
            return '<img alt="Amarillo" src="img/IMG-20241023-WA0009.jpg>"';
        case "4":
            return '<img alt="Verde claro" src="img/IMG-20241023-WA0010.jpg">';
        default:
            return '<img alt="Verde claro" src="img/IMG-20241023-WA0010.jpg">';
    }
}

function cargarTablaComentarios(titulo = "Todos", orden = true) {
    tablaComentarios.innerHTML = ""

    const listaVisitas = sistema.obtenerListaVisitasOrdenadas(titulo, orden)

    for (let i = 0; i < listaVisitas.length; i++) {
        let visita = listaVisitas[i]
        let row = document.createElement("tr");
        let columnaTitulo = document.createElement("td");

        columnaTitulo.textContent = visita.exposicion.titulo;

        let columnaMasDatos = document.createElement("td");
        columnaMasDatos.innerHTML = `<button type='button' onclick='mostrarInfo(${visita.id})'>Ampliar</button>`;
        let columnaNombre = document.createElement("td");
        columnaNombre.innerHTML = visita.visitante;
        let columnaComentario = document.createElement("td");
        columnaComentario.innerHTML = visita.comentario;
        let columnaGuiada = document.createElement("td");
        columnaGuiada.innerHTML = visita.visitaGuiada === true ? "SI" : "NO";
        let columnaCalificacion = document.createElement("td");
        columnaCalificacion.innerHTML = obtenerImagenDeCalificacion(visita.calificacion);

        row.appendChild(columnaTitulo);
        row.appendChild(columnaMasDatos);
        row.appendChild(columnaNombre);
        row.appendChild(columnaComentario);
        row.appendChild(columnaGuiada);
        row.appendChild(columnaCalificacion);

        tablaComentarios.appendChild(row);
    }
}

function cargarSelectExposicion() {
    selectExposicion.innerHTML = "";
    for (let i = 0; i < sistema.listaExposiciones.length; i++) {
        let titulo = sistema.listaExposiciones[i].titulo;
        let opcion = document.createElement("option");
        let textoOpcion = document.createTextNode(titulo);
        opcion.appendChild(textoOpcion);
        selectExposicion.appendChild(opcion);
    }
    ordenarSelect(selectExposicion)
}

function cargarSelectExposicionFiltro() {
    selectFiltroExposicion.innerHTML = "";
    for (let i = 0; i < sistema.listaExposiciones.length; i++) {
        let titulo = sistema.listaExposiciones[i].titulo;
        let opcion = document.createElement("option");
        let textoOpcion = document.createTextNode(titulo);
        opcion.appendChild(textoOpcion);
        selectFiltroExposicion.appendChild(opcion);
    }
    ordenarSelect(selectFiltroExposicion)
    let opcion = document.createElement("option");
    opcion.selected = true;
    let textoOpcion = document.createTextNode("Todos");
    opcion.appendChild(textoOpcion);
    selectFiltroExposicion.appendChild(opcion);
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
