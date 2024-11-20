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
    constructor(exposicion, visitante, comentario, calificacion, visitaGuiada) {
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

//     // Método adicional para ordenar y mostrar los artistas en la lista de selección
//     obtenerListaArtistasOrdenada() {
//         return this.listaArtistas.sort((a, b) => a.nombre.localeCompare(b.nombre));
//     }
// }
// // clases.js

// class Artista {
//     constructor(nombre, edad, estilo) {
//         this.nombre = nombre;
//         this.edad = edad;
//         this.estilo = estilo;
//     }
// }

// class Exposicion {
//     constructor(titulo, fecha, descripcion, artistas = []) {
//         this.titulo = titulo;
//         this.fecha = fecha;
//         this.descripcion = descripcion;
//         this.artistas = artistas; // Array de objetos Artista
//     }
// }

// class Visita {
//     constructor(exposicion, visitante, comentario, calificacion, visitaGuiada = false) {
//         this.exposicion = exposicion;
//         this.visitante = visitante;
//         this.comentario = comentario;
//         this.calificacion = calificacion;
//         this.visitaGuiada = visitaGuiada;
//     }
// }

// class Sistema {
//     constructor() {
//         this.artistas = new Set();       // Almacena nombres de artistas únicos
//         this.exposiciones = new Set();   // Almacena títulos de exposiciones únicos
//         this.listaArtistas = [];         // Array de objetos Artista
//         this.listaExposiciones = [];     // Array de objetos Exposicion
//         this.listaVisitas = [];          // Array de objetos Visita
//     }

//     agregarArtista(nombre, edad, estilo) {
//         if (this.artistas.has(nombre)) {
//             console.log("El nombre del artista ya está registrado.");
//             return;
//         }
//         const artista = new Artista(nombre, edad, estilo);
//         this.listaArtistas.push(artista);
//         this.artistas.add(nombre); // Agregar el nombre al conjunto para evitar duplicados
//         console.log(`Artista ${nombre} agregado.`);
//     }

//     agregarExposicion(titulo, fecha, descripcion, artistas = []) {
//         if (this.exposiciones.has(titulo)) {
//             console.log("El título de la exposición ya está registrado.");
//             return;
//         }
//         const exposicion = new Exposicion(titulo, fecha, descripcion, artistas);
//         this.listaExposiciones.push(exposicion);
//         this.exposiciones.add(titulo); // Agregar el título al conjunto para evitar duplicados
//         console.log(`Exposición ${titulo} agregada.`);
//     }

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

//     // Método adicional para ordenar y mostrar los artistas en la lista de selección
//     obtenerListaArtistasOrdenada() {
//         return this.listaArtistas.sort((a, b) => a.nombre.localeCompare(b.nombre));
//     }
// 
}

