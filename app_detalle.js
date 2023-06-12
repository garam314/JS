
class Reserva
{   
    pelicula = '';
    horario = '';
    asientos = []
    constructor(pelicula = '', horario = '', asiento = [])
    {
        this.pelicula = pelicula;
        this.horario = horario;
        this.asientos = asiento
        
    }

    get get_pelicula()
    {
      return this.pelicula
    }

    get get_schedule()
    {
        return this.horario
    }

    get get_seats()
    {
        return this.asientos
    }
}

function f_load_data()
{
    // RECUPERAMOS LOS DATOS ASOCIADOS A LA RESERVA
    let boletos = document.querySelector("#boletos")
    let map_movies = new Map(Object.entries(JSON.parse(localStorage.getItem('moviesJSON'))));
    let map_reserved_seat = new Map(Object.entries(JSON.parse(localStorage.getItem('reserveseatJSON'))));  
    let map_movie_picked = new Map(Object.entries(JSON.parse(localStorage.getItem('reservemovieJSON'))));  

    //RECUPERAMOS LA PELICULA ESCOGIDA    
    let movie_name
    let movie_schedule

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

    let movie_asientos = []
    
    map_reserved_seat.forEach(e => {
        e.forEach(a => {
            if (a != "asientos")
                movie_asientos.push(a)
        });
    });

    const reserve = new Reserva(movie_name, movie_schedule, movie_asientos)
}


document.addEventListener("DOMContentLoaded", f_load_data())
