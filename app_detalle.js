import {Reserva} from './Reserva.js'
import {Combo} from './Combos.js'

const reserved = new Reserva()
const prices_combos = new Map([
    ["combo-1", 3500],
    ["combo-2", 4500],
    ["combo-3", 4000],
    ["combo-4", 5000]
])


let combos_added = []


function f_load_data()
{
    // RECUPERAMOS LOS DATOS ASOCIADOS A LA RESERVA
    let map_movies = new Map(Object.entries(JSON.parse(localStorage.getItem('moviesJSON'))));
    let map_reserved_seat = new Map(Object.entries(JSON.parse(localStorage.getItem('reserveseatJSON'))));  
    let map_movie_picked = new Map(Object.entries(JSON.parse(localStorage.getItem('reservemovieJSON'))));  

    let movie_name
    let movie_schedule
    let movie_asientos = []

    //RECUPERAMOS LA PELICULA ESCOGIDA    


    map_movie_picked.forEach(e => {
        switch (e[0]) {
            case "pelicula":
                map_movies.forEach(m => {
                    if (m[0] === e[1])
                    {
                        movie_name = m[1]
                    }
                });
                break;
        
            case "horario":
                movie_schedule = e[1]
                break;
        }
    });

    
    
    map_reserved_seat.forEach(e => {
        e[1].forEach(a => {
            if (a != "asientos")
            {
                movie_asientos.push(a)
            }
        });
    });
    reserved.set_pelicula(movie_name)
    reserved.set_schedule(movie_schedule)
    reserved.set_seats(movie_asientos)

    //SE CARGA FUNCION EN BOTONES AGREGAR COMBOS

    let botones = document.querySelectorAll('[id^="combo-"]')
    botones.forEach(boton => {
        boton.addEventListener("click", f_add_combos)
    });


    f_load_movie()
    f_load_ticket()
    f_total()
    return
}


function f_load_movie()
{
    let div_movie = document.querySelector("#pelicula")
    let h1 = document.createElement("h3")
    let p = document.createElement("p")

    h1.textContent = reserved.get_pelicula()
    p.textContent = "Función: " + reserved.get_schedule()
    div_movie.append(h1)
    div_movie.append(p)
    return
}

function f_load_ticket()
{
    let div_seats = document.querySelector("#boletos")
    let p = document.createElement("p")
    p.textContent = "Asientos: " + reserved.get_seats()
    div_seats.append(p)
    return
}

function f_total()
{
    let total = 0
    combos_added.forEach(promocion =>{
        total += promocion.get_total()
    })
    console.log(combos_added)
    let div_total = document.querySelector("#total")
    let child_div = div_total.querySelector("*")
    if (child_div != null)
    {
        div_total.removeChild(child_div)
    }
    let seats = reserved.get_seats().length
    let price = reserved.get_price()
    total += (seats * price)
    let h4 = document.createElement("h4")
    h4.textContent = total
    div_total.append(h4)
    return
}

function f_add_combos(event)
{


    let botton_pressed = event.target
    let childrens = botton_pressed.parentNode.children
    let combo_description
    for (let i = 0; i < childrens.length; i++) {
        let hijo = childrens[i];
         if(hijo.tagName == 'H6')
         {
            combo_description = hijo.textContent
         }

      }
    let id_combo = botton_pressed.id
    let price_combo = prices_combos.get(id_combo)
    let c = new Combo(price_combo, id_combo, combo_description, 1)


    
    let exists = combos_added.find(function(element){
        return element.id === id_combo;
    });
    if (exists)
        exists.agregar(1)
    else
        combos_added.push(c)

    f_show_data_combos()
}

function f_show_data_combos()
{
    let div_promocion = document.querySelector("#promocion")
    combos_added.forEach(promocion =>{
        let parrafo = document.querySelector('[det-prom="' + promocion.get_id() + '"]')
        if ( parrafo === null)
        {
            let p = document.createElement("p")
            p.setAttribute("det-prom",promocion.get_id())
            p.textContent = promocion.get_nombre()
            div_promocion.append(p)
            
        }
        else
        {
            parrafo.textContent = promocion.get_nombre()
        }
    })
    f_total()

}

document.addEventListener("DOMContentLoaded", f_load_data())
