
class Reserva
{   
    pelicula = '';
    horario = '';
    asientos = []

    get_pelicula()
    {
      return this.pelicula
    }

    get_schedule()
    {
        return this.horario
    }

    get_seats()
    {
        return this.asientos
    }

    set_pelicula(pelicula)
    {
      this.pelicula = pelicula
      return
    }

    set_schedule(schedule)
    {
        this.horario = schedule
        return
    }

    set_seats(seats)
    {
        this.asientos = seats
        return
    }
}


let movie_name
let movie_schedule
let movie_asientos = []
const reserved = new Reserva()


function f_load_data()
{
    // RECUPERAMOS LOS DATOS ASOCIADOS A LA RESERVA
    let boletos = document.querySelector("#boletos")
    let map_movies = new Map(Object.entries(JSON.parse(localStorage.getItem('moviesJSON'))));
    let map_reserved_seat = new Map(Object.entries(JSON.parse(localStorage.getItem('reserveseatJSON'))));  
    let map_movie_picked = new Map(Object.entries(JSON.parse(localStorage.getItem('reservemovieJSON'))));  

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
        e.forEach(a => {
            if (a != "asientos")
                movie_asientos.push(a)
        });
    });
    reserved.set_pelicula(movie_name)
    reserved.set_schedule(movie_schedule)
    reserved.set_seats(movie_asientos)


    load_movie()
    load_ticket()
    return
}


function load_movie()
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

function load_ticket()
{
    let div_movie = document.querySelector("#boletos")
    let h1 = document.createElement("h3")
    let p = document.createElement("p")

    h1.textContent = reserved.get_pelicula()
    p.textContent = "Función: " + reserved.get_schedule()
    div_movie.append(h1)
    div_movie.append(p)
    return
}


document.addEventListener("DOMContentLoaded", f_load_data())
