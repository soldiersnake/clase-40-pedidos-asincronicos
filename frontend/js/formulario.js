window.onload = () => {
  fetch("http://localhost:3031/api/movies/25")
    .then((respuesta) => respuesta.json())
    .then((pelicula) => {
      let data = pelicula.data;

      let title = document.querySelector("#title");
      let rating = document.querySelector("#rating");
      let awards = document.querySelector("#awards");
      let release_date = document.querySelector("#release_date");
      let length = document.querySelector("#length");
      let date = new Date(data.release_date); // se crea nueva fecha almacenada en variable para poder transformarla

      title.value = data.title;
      rating.value = parseFloat(data.rating);
      awards.value = parseInt(data.awards);
      release_date.value = date.toISOString().slice(0, 10); //metodo para transformar hora
      length.value = data.length || 0; // 0 es valor predeterminado
    });

  let editarBoton = document.querySelector("#editarBoton");
  editarBoton.addEventListener("click", (e) => {
    let bodyData = {
      title: document.querySelector("#title").value,
      rating: document.querySelector("#rating").value,
      awards: document.querySelector("#awards").value,
      release_date: document.querySelector("#release_date").value,
      length: document.querySelector("#length").value,
    };
    let configuracion = {
      method: "PUT",
      body: JSON.stringify(bodyData),
      headers: {
        "Content-Type": "application/json",
      },
    };
    fetch("http://localhost:3031/api/movies/update/10", configuracion)
      .then((res) => res.json())
      .then((response) => console.log("Success:", response))
      .catch((error) => console.error("Error:", error));
  });

  let crearBoton = document.querySelector("#crearBoton");
  crearBoton.addEventListener("click", (e) => {
    let bodyData = {
      title: document.querySelector("#title").value,
      rating: document.querySelector("#rating").value,
      awards: document.querySelector("#awards").value,
      release_date: document.querySelector("#release_date").value,
      length: document.querySelector("#length").value,
    };
    let configuracion = {
      method: "POST",
      body: JSON.stringify(bodyData),
      headers: {
        "Content-Type": "application/json",
      },
    };
    fetch("http://localhost:3031/api/movies/create", configuracion)
      .then((res) => res.json())
      .then((response) => console.log("Success:", response))
      .catch((error) => console.error("Error:", error));
  });
};
