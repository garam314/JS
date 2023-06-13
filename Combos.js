export class Combo
{
    precio
    id
    nombre
    cantidad

    constructor(precio, id, nombre, cantidad){
        this.precio = precio
        this.id = id
        this.nombre = nombre
        this.cantidad = cantidad
    }

    agregar(cantidad)
    {
        this.cantidad += cantidad
    }

    quitar(cantidad)
    {
        this.cantidad =- cantidad
    }

    get_total()
    {
        return this.cantidad*this.precio
    }

    get_nombre()
    {
        if (this.cantidad > 1)
            return this.nombre + " x " + this.cantidad
        else
            return this.nombre
    }

    get_id()
    {
        return this.id
    }
}