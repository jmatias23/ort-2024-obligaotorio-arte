// clases.js

class Artista {
    constructor(nombre, edad, estilo) {
        this.nombre = nombre;
        this.edad = edad;
        this.estilo = estilo;
    }
}

class Exposicion {
    constructor(titulo, fecha, descripcion, artistas) {
        this.titulo = titulo;
        this.fecha = fecha;
        this.descripcion = descripcion;
        this.artistas = artistas; // Array de objetos Artista
    }
}

class Visita {
    constructor(id, exposicion, visitante, comentario, calificacion, visitaGuiada) {
        this.id = id;
        this.exposicion = exposicion;
        this.visitante = visitante;
        this.comentario = comentario;
        this.calificacion = calificacion;
        this.visitaGuiada = visitaGuiada;
    }
}

class Sistema {
    constructor() {
        this.listaArtistas = [];
        this.listaExposiciones = [];
        this.listaVisitas = [];
    }

    agregarArtista(nombre, edad, estilo) {
        this.listaArtistas.push(new Artista(nombre, edad, estilo));
    }

    agregarExposicion(titulo, fecha, descripcion, artistas = []) {
        const exposicion = new Exposicion(titulo, fecha, descripcion, artistas);
        this.listaExposiciones.push(exposicion);
        console.log(`Exposición ${titulo} agregada.`);
    }

    agregarVisita(exposicion, visitante, comentario, calificacion, visitaGuiada = false) {
        const id = this.listaVisitas.length += 1
        const visita = new Visita(id, exposicion, visitante, comentario, calificacion, visitaGuiada);
        this.listaVisitas.push(visita);
        console.log(`Comentario de ${visitante} agregado.`);
    }

    existeArtista(nombre) {
        nombre = nombre.toLowerCase();
        for (let i = 0; i < this.listaArtistas.length; i++) {
            let nombreAux = this.listaArtistas[i].nombre.toLowerCase();
            if (nombre === nombreAux) {
                return true;
            }
        }
        return false;
    }

    existeExposicion(titulo) {
        titulo = titulo.toLowerCase();
        for (let i = 0; i < this.listaExposiciones.length; i++) {
            let tituloAuxiliar = this.listaExposiciones[i].titulo.toLowerCase();
            if (titulo === tituloAuxiliar) {
                return true
            }
        }
        return false;
    }

    existeComentario(titulo, visitante) {
        titulo = titulo.toLowerCase();
        for (let i = 0; i < this.listaVisitas.length; i++) {
            let visita = this.listaVisitas[i]
            let visitanteAuxiliar = visita.exposicion.visitante.toLowerCase()
            let tituloAuxiliar = visita.exposicion.titulo.toLowerCase()

            if (titulo === tituloAuxiliar && visitante === visitanteAuxiliar) {
                return true
            }
        }
        return false;
    }

    obtenerArtistaPorNombre(nombre) {
        nombre = nombre.toLowerCase();
        for (let i = 0; i < this.listaArtistas.length; i++) {
            let nombreAuxiliar = this.listaArtistas[i].nombre.toLowerCase();
            if (nombre === nombreAuxiliar) {
                return this.listaArtistas[i]
            }
        }
        return null;
    }

    obtenerExposicionPorTitulo(titulo) {
        titulo = titulo.toLowerCase();
        for (let i = 0; i < this.listaExposiciones.length; i++) {
            let tituloAuxiliar = this.listaExposiciones[i].titulo.toLowerCase();
            if (titulo === tituloAuxiliar) {
                return this.listaExposiciones[i]
            }
        }
        return null;
    }

    obtenerExposicionPorIdVisita(id) {
        for (let i = 0; i < this.listaVisitas.length; i++) {
            if (id === this.listaVisitas[i].id) {
                return this.listaVisitas[i].exposicion
            }
        }
    }

    obtenerExposicionesConMasArtistas() {
        let lista = this.listaExposiciones;

        return lista.sort((a, b) => a.artistas.length.localeCompare(b.artistas.length));
    }

    obtenerExposicionesConComentarios() {
        let lista = [];
        for (let i = 0; i < this.listaExposiciones.length; i++) {
            for (let j = 0; j < this.listaVisitas.length; j++) {
                if (this.listaExposiciones[j].titulo === this.listaVisitas[j].exposicion.titulo) {
                    lista.push(this.listaExposiciones[j]);
                    break;
                }
            }
        }

        return lista.sort((a, b) => a.artistas.length.localeCompare(b.artistas.length));
    }

    obtenerListaVisitasOrdenadas(titulo = "", creciente = false) {
        let lista = this.listaVisitas;

        if (titulo !== "") {
            lista = lista.filter(visita => visita.titulo.toLowerCase() === titulo);
        }
        if (creciente) {
            lista.sort((a, b) => a.calificacion.localeCompare(b.calificacion));
        } else {
            lista.sort((a, b) => b.calificacion.localeCompare(a.calificacion));
        }

        return lista;
    }


//     agregarVisita(exposicion, visitante, comentario, calificacion, visitaGuiada = false) {
//         const visita = new Visita(exposicion, visitante, comentario, calificacion, visitaGuiada);
//         this.listaVisitas.push(visita);
//         console.log(`Comentario de ${visitante} agregado.`);
//     }

//     cambiarColores() {
//         document.body.style.backgroundColor = "#f0e68c";
//         document.querySelector("header").style.backgroundColor = "#ffa07a";
//         document.getElementById("seccion1").style.backgroundColor = "#e6e6fa";
//         document.getElementById("seccion2").style.backgroundColor = "#e0ffff";
//     }


//     cambiarColores() {
//         document.body.style.backgroundColor = "#f0e68c";
//         document.querySelector("header").style.backgroundColor = "#ffa07a";
//         document.getElementById("seccion1").style.backgroundColor = "#e6e6fa";
//         document.getElementById("seccion2").style.backgroundColor = "#e0ffff";
//     }


}

