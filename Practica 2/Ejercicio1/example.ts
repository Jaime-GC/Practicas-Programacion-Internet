/* Ejemplo practico de como hacer una llamada fetch a una API para que esta nos devuelva los datos
 *  Para ejecutar este comando se debe usar Deno de la siguiente forma:
 *  deno run --allow-all example.ts
 */

// Tipos
export interface ResponseData {
    statusCode:  number;
    message:     string;
    pagination:  Pagination;
    totalQuotes: null;
    data:        string[];
}

export interface Pagination {
    currentPage: null;
    nextPage:    null;
    totalPages:  null;
}

const fetchData = async () => {
  try {
    // Fetch a resource from the network. It returns a Promise
    // that resolves to the Response to that Request, whether it is successful or not.
    const response = await fetch(
      "https://quote-garden.onrender.com/api/v3/authors?limit=10"
    );

    // Takes a Response stream and reads it to completion. It returns a promise that resolves
    // with the result of parsing the body text as JSON.
    const data: ResponseData = await response.json();

    console.log("Status:",data.statusCode);
    data.data.forEach(author => {
        console.log("---------------------------------")
        console.log(author)
      })
  } catch (error) {
    // Debemos tratar siempre los errores cuando trabajemos con Promesas
    console.log(error);
  }
};

const secondMethod = () => {
  fetch("https://quote-garden.onrender.com/api/v3/authors?genre=business&limit=10")
    .then((response) => response.json())
    .then((data: ResponseData) => {
        console.log("Status:",data.statusCode);
        data.data.forEach(author => {
        console.log("---------------------------------")
        console.log(author)
      })
    })
    .catch((error) => console.log(error));
};

await fetchData();
secondMethod();
