
export class Reserva
{   
    pelicula = '';
    horario = '';
    asientos = []
    ticket_price = 2900

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

    get_price()
    {
        return this.ticket_price
    }
}
