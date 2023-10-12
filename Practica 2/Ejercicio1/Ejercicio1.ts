export interface ResponseData { //
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


  

let contador = 0;

const fetchData = async () => {
    try {
      // Fetch a resource from the network. It returns a Promise
      // that resolves to the Response to that Request, whether it is successful or not.
      const response = await fetch(
        "https://quote-garden.onrender.com/api/v3/quotes?limit=30"
      );
  
      // Takes a Response stream and reads it to completion. It returns a promise that resolves
      // with the result of parsing the body text as JSON.
      const data: ResponseData = await response.json();  


  
      console.log("Status:",response.status);

      
      data.data.forEach(quote => {
          console.log("---------------------------------")
          console.log(quote)
          contador++;
          
          console.log("Contador: ", contador);
        });
        
        
    } catch (error) {
      // Debemos tratar siempre los errores cuando trabajemos con Promesas
      console.log(error);
    }
  };

  await fetchData();
 