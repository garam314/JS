  // Arreglo para almacenar los asientos seleccionados
  let selectedSeats = [];
  const movie_parameter = new URLSearchParams(window.location.search);
  const pelicula =  movie_parameter.get('pelicula');
  const filas = 9;
  const asientos_fila = 9;


  function f_generarNumeroAleatorio(inicio, fin) {
    var rango = fin - inicio + 1;
    var numeroAleatorio = Math.floor(Math.random() * rango) + inicio;
    return numeroAleatorio;
  }
  

  // FUNCION PARA CARGAR DATOS DE PELICULA SELECCIONADA
  function f_load_movie()
  {
    let contenedor  = document.querySelector("#img_movie_booking");
    let imagen = document.createElement("img");
    imagen.src = "./imagenes/"+pelicula+".webp";
    contenedor.append(imagen)
    let file_sinopsis = './imagenes/sinopsis/'+pelicula + ".txt"
    
    let respuesta = fetch(file_sinopsis);

    //se utiliza una promesa para obtener el texto de un arhivo TXT y cargar datos, SINOPSIS
    fetch(file_sinopsis)
    .then(response => response.text())
    .then(data => {
      // El contenido del archivo se encuentra en la variable 'data'
      contenedor = document.querySelector("#sinopsis")
      let desc_sinopsis = document.createElement("p")
      desc_sinopsis.textContent = data
      contenedor.append(desc_sinopsis)
    })
    .catch(error => {
      // Manejo de errores
      console.error('Error al leer el archivo:', error);
    });
    generateSeats();
  }



  // Función para actualizar la información del asiento seleccionado
  function updateSeatInfo() {
      let seatInfo = "Asiento seleccionado: ";
      let seatCount = selectedSeats.length;
      let seatSelected = document.querySelector("#selected-seat");
      let seatsSelected = document.querySelector("#selected-seats");
      let reserve_btn = document.querySelector("#reserve-btn");
      if (seatCount > 0) {
        seatInfo += selectedSeats.join(", ");
        seatSelected.textContent = seatInfo;
        seatsSelected.textContent = "Total asientos seleccionados: " + seatCount;
        reserve_btn.removeAttribute("disabled");
      } else {
        seatSelected.textContent = "";
        seatsSelected.textContent = "";
        reserve_btn.setAttribute("disabled", "");
      }
  }

  // Función para manejar el evento de clic en un asiento
  function seatClicked() {
      let seat = this;
      let seatNumber = seat.getAttribute("id");
      // Comprobar si el asiento está disponible
      if (!seat.classList.contains("reserved")) {
        seat.classList.toggle("selected");
        let index = selectedSeats.indexOf(seatNumber);
        if (index === -1) {
          selectedSeats.push(seatNumber);
        } else {
          selectedSeats.splice(index, 1);
        }
        updateSeatInfo();
      }
  }
  // Generar los asientos y asignar el evento de clic
  function generateSeats() {
      let seatMap = document.querySelector("#seat-map");
      let filas = 9;
      let asientos_fila = 9;

      for (let row = 1; row <= filas; row++) {
        let seatRow = document.createElement("div")
        let row_letter = String.fromCharCode( row.toString().charCodeAt(0)+16);
        seatRow.classList.add("row");      
    
        for (let seat = 1; seat <= asientos_fila; seat++) {
          let seatNumber = row_letter + "" + seat;
          let seatDiv = document.createElement("div")
          seatDiv.classList.add("seat")
          seatDiv.setAttribute("data-seat-number", seatNumber)
          seatDiv.textContent = seatNumber
          seatDiv.addEventListener("click", seatClicked)
          seatDiv.id = seatNumber;

          // Simular algunos asientos ya reservados
          let reservado = f_generarNumeroAleatorio(1, asientos_fila);
          if (seat === reservado) {
            seatDiv.classList.add("reserved");
          }
          seatRow.append(seatDiv);
      }
      seatMap.append(seatRow);
      }
  }

  let json_movies_saves = localStorage.getItem('moviesJSON');
  let array_movies = JSON.parse(json_movies_saves);
  let movies_map = new Map();

  array_movies.forEach(function(item){
    movies_map.set(item[0], item[1]);
  });
  let titulo = document.querySelector("#titulo");
  titulo.textContent = movies_map.get(pelicula);
  console.log(movies_map.get(pelicula));
  // Inicializar la generación de asientos
  document.addEventListener("DOMContentLoaded", f_load_movie())
      
