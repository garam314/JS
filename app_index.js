const buttons = document.querySelectorAll(".btn_compra");

function f_agregar_click_comprar()
{
    
    buttons.forEach(element => {
        element.addEventListener("click", ()=>{
            load_pag_tickets(element);
        });
    });
}

function load_pag_tickets(btn)
{
    let pelicula = btn.id
    let url = "./reserva.html?pelicula=" +encodeURIComponent(pelicula) 
    window.open(url, '_blank');
}


function f_json_movies()
{
    let movies = new Map();
    buttons.forEach(element => {
        movies.set(element.id, element.name);
    });   
    let jsonDatos = JSON.stringify(Array.from(movies));
    localStorage.setItem('moviesJSON', jsonDatos);
}
  

  // Inicializar la generación de asientos
  document.addEventListener("DOMContentLoaded", ()=>{
    f_agregar_click_comprar();
    f_json_movies();
});

      
