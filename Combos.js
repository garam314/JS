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

}