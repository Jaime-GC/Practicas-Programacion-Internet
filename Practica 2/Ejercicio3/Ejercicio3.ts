type libro = {
    id: number,
    title: string,
    author: string,
    pages: number,
    genre: string
};

const libros: libro[] = [];

function crearLibro(): libro {
    const id: number = libros.length + 1;
    const title: string | null = prompt("Introduce el titulo del libro: ");
    const author: string | null = prompt("Introduce el autor del libro: ");
    const pages: number | null = parseInt(prompt("Introduce el numero de paginas del libro: ") || "0");
    const genre: string | null = prompt("Introduce el genero del libro: ");

    const Libro: libro = {
        id: id,
        title: title || "", 
        author: author || "",
        pages: pages,
        genre: genre || ""
    };

    return Libro;

}

function filtrarLibroGenero(){
    const genero: string | null = prompt("Introduce el genero del libro: ");
    const librosGenero: libro[] = libros.filter((libro) => libro.genre === genero);
    console.log(librosGenero);
}

function borrarLibro(){
    const id: number | null = parseInt(prompt("Introduce el id del libro que quieres borrar: ") || "0");
    const libroBorrar: libro | undefined = libros.find((libro) => libro.id === id);

    if (libroBorrar !== undefined){
        const index: number = libros.indexOf(libroBorrar);
        libros.splice(index, 1); //Borramos el libro del array (utilizado de esta referencia: https://www.w3schools.com/jsref/jsref_splice.asp)
        console.log("Libro borrado correctamente");
    } else {
        console.log("No se ha encontrado el libro");
    }
}

function mostrarLibros(){
    console.log(libros);
}





const menu = (): void => {
    console.log("Bienvenido a la CLI de libros");
    console.log("1. Crear libro");
    console.log("2. Filtrar libro por genero");
    console.log("3. Borrar libro");
    console.log("4. Salir");
    console.log("5. Mostrar libros");

    const opcion: number | null = parseInt(prompt("Introduce una opcion: ") || "0");

    switch (opcion) {
        case 1:
            libros.push(crearLibro());
            menu();
            break;
        case 2:
            filtrarLibroGenero();
            menu();
            break;
        case 3:
            borrarLibro();
            menu();
            break;
        case 4:
            console.log("Ha salido de la CLI");
            break;
        case 5:
            mostrarLibros();
            menu();
            break;
        default:
            console.log("Opcion no valida");
            break;
    }
}

menu();