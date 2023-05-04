const  cant_numeros = 10;//CANTIDAD DE ELEMENTOS MAXIMO


/*FUNCION PARA GENERAR NUMEROS ALEATORIOS ENTRE LOS DATOS INGRESADOS POR USUARIO, CONSIDERANDO SI ESTOS SERAN PARES, IMPARES O MIXTOS*/
function f_generar_numeros(min_number, max_number)
{
    let ind_par = false, ind_impar = false;
    let numeros = [];
    let select_value = document.getElementById("tipo").value;
    

    if( select_value == 1)
    {
        ind_impar = true;
    }
    
    if( select_value == 2)
    {
        ind_par = true;
    }
/*DEBE EXISTIR DIFERENCIA MAYOR A CERO SI SE SELECCIONA NUMEROS PARES O IMPARES */
    if(max_number-min_number == 0 && (ind_impar || ind_par))
    {
        alert(`La Diferencia Entre En Numero De Inicio y El De Termino Debe Ser Mayor a 0, en caso de Tener Seleccionado Solo Números Pares o Impares`)
        return;
    }

    let div_numbers = '';
    for(let i = 0; i<cant_numeros; i++)
    {
        let num_aleatorio;

        if(ind_impar)
        {
            do {/* SE GENERA NUMERO PERO ESTO DEBE SER IMPAR */
                num_aleatorio = f_numero_azar(min_number, max_number);
            } while (num_aleatorio%2==0);
        }
        else if(ind_par)/* SE GENERA NUMERO PERO ESTO DEBE SER PAR */
        {
            do {
                num_aleatorio = f_numero_azar(min_number, max_number);
            } while (num_aleatorio%2!=0);
        }
        else/* SE GENERA NUMERO NO IMPORTA SI ES PAR O IMPAR*/
        {
            num_aleatorio = f_numero_azar(min_number, max_number);
        }

        numeros[i] = num_aleatorio;
    }
    f_pintar_numeros(numeros);
    return
}
/* FUNCION PARA MOSTRAR EN PANTALLA LOS DATOS */
function f_pintar_numeros(array_numeros)
{
    let div_numbers = '';
    for(let i = 0; i<array_numeros.length; i++)
    {
        /* SE AGREGA NUMERO AL DOM */
        div_numbers += `<div  class="celda">
            <h1>${array_numeros[i]}</h1>
        </div>`
    }
    document.getElementById("main_container").innerHTML = div_numbers;
    return;
}



/*RECUPERA LOS DATOS DESDE EL HTML Y SE GUARDAN EN UN ARRAY */
function f_orden(ind_orden)
{

    let div_numeros = document.querySelectorAll("#main_container div h1");
    if(div_numeros.length == 0)
    {
        alert("Genere Listado De Numeros Antes De Ordenar");
        return false;
    }

    let numeros = [];
    div_numeros.forEach(element => {
        numeros.push(element.innerHTML);
    });
    
    switch (ind_orden) {
        case 1:
            f_order_asc(numeros);
            break;
        case 2:
            f_order_desc(numeros);
            break;
        default:
            break;
    }    
}
/*ORDENAR DE MENOR A MAYOR EL ARRAY PASADO POR PARAMETRO */
function f_order_asc(listado_numeros)
{
    listado_numeros.sort(function(a, b){return a- b});
    f_pintar_numeros(listado_numeros);
    return;
}
/*ORDENAR DE MAYOR A MENOR EL ARRAY PASADO POR PARAMETRO*/
function f_order_desc(listado_numeros)
{
    listado_numeros.sort(function(a, b){return b- a});
    f_pintar_numeros(listado_numeros);
    return;
}
/**FUCNIO PARA ANTES DE GENERAR O ORDENAR DATOS, ESTA FUNCION VALIDA LAS CONDICIONES NECESARIOAS PARA EL CORRECTO FUNCIONAMIENTO */
function f_validar()
{
    let dato_desde = document.getElementById("desde").value;
    let dato_hasta = document.getElementById("hasta").value;
    if(dato_desde.length == 0)
    {
        alert('Debe Ingresar Valor "Desde"');
        document.getElementById("desde").focus();
        return;
    }
    if(dato_hasta.length == 0)
    {
        alert('Debe Ingresar Valor "Hasta"');
        document.getElementById("hasta").focus();
        return;
    }

    dato_desde = Number(dato_desde);
    dato_hasta = Number(dato_hasta);

    if(isNaN(dato_desde))
    {
        alert('Ingrese Número Correcto "Desde"');
        document.getElementById("desde").focus();
        return;
    }
    if(isNaN(dato_hasta))
    {
        alert('Ingrese Número Correcto "Hasta"');
        document.getElementById("hasta").focus();
        return;
    }

    if(dato_desde > dato_hasta)
    {
        alert("Valide Los Datos Ingresados");
        document.getElementById("desde").focus();
        return;
    }

    f_generar_numeros(dato_desde, dato_hasta);
    return
}

/*FUNCION PARA RECPERAR NUMERO ALEATORIO */
function f_numero_azar(min_number, max_number)
{
    return Math.floor(Math.random() * (max_number - min_number + 1)) + min_number;
}