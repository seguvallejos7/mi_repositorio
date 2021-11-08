// Variables
const baseDeDatos = [
    {
        id: 1,
        nombre: 'Acelga x kg',
        precio: 150,
        imagen: 'frutasyverduras/acelga.jpg'
    },
    {
        id: 2,
        nombre: 'Ajo',
        precio: 70,
        imagen: 'frutasyverduras/ajo.jpg'
    },
    {
        id: 3,
        nombre: 'Arandanos x 500g',
        precio: 350,
        imagen: 'frutasyverduras/arandanos.jpg'
    },
    {
        id: 4,
        nombre: 'Banana x kg',
        precio: 190,
        imagen: 'frutasyverduras/banana.jpg'
    },
    {
        id: 5,
        nombre: 'Berenjena x kg',
        precio: 150,
        imagen: 'frutasyverduras/berenjena.jpg'
    },
    {
        id: 6,
        nombre: 'Brocoli',
        precio: 150,
        imagen: 'frutasyverduras/brocoli.jpg'
    },
        {
        id: 7,
        nombre: 'Calabaza x kg',
        precio: 100,
        imagen: 'frutasyverduras/calabaza.jpg'
    },
    {
        id: 8,
        nombre: 'Cebolla x kg',
        precio: 80,
        imagen: 'frutasyverduras/cebolla.jpg'
    },
    {
        id: 9,
        nombre: 'Esparragos x kg',
        precio: 1000,
        imagen: 'frutasyverduras/esparragos.jpg'
    },
    {
        id: 10,
        nombre: 'Lechuga x kg',
        precio: 130,
        imagen: 'frutasyverduras/lechuga.jpg'
    },
    {
        id: 11,
        nombre: 'Lima x kg',
        precio: 190,
        imagen: 'frutasyverduras/lima.jpg'
    },
        {
        id: 12,
        nombre: 'Limon x kg',
        precio: 90,
        imagen: 'frutasyverduras/limon.jpg'
    },
    {
        id: 13,
        nombre: 'Mandarina x kg',
        precio: 100,
        imagen: 'frutasyverduras/mandarina.jpg'
    },
    {
        id: 14,
        nombre: 'Manzana roja x kg',
        precio: 120,
        imagen: 'frutasyverduras/manzana.jpg'
    },
    {
        id: 15,
        nombre: 'Manzana verde x kg',
        precio: 150,
        imagen: 'frutasyverduras/manzanaverde.jpg'
    },
    {
        id: 16,
        nombre: 'Morron x kg',
        precio: 250,
        imagen: 'frutasyverduras/morron.jpg'
    },
    {
        id: 17,
        nombre: 'Naranja x kg',
        precio: 100,
        imagen: 'frutasyverduras/naranja.jpg'
    },
    {
        id: 18,
        nombre: 'Palta',
        precio: 100,
        imagen: 'frutasyverduras/palta.jpg'
    },
    {
        id: 19,
        nombre: 'Papa x kg',
        precio: 70,
        imagen: 'frutasyverduras/papa.jpg'
    },
    {
        id: 20,
        nombre: 'Pera x kg',
        precio: 100,
        imagen: 'frutasyverduras/pera.jpg'
    },
    {
        id: 21,
        nombre: 'Pomelo x kg',
        precio: 110,
        imagen: 'frutasyverduras/pomelo.jpg'
    }


];

let carrito = [];
let total = 0;
const DOMitems = document.querySelector('#items');
const DOMcarrito = document.querySelector('#carrito');
const DOMtotal = document.querySelector('#total');
const DOMbotonVaciar = document.querySelector('#boton-vaciar');
const DOMbotonComprar = document.querySelector('#boton-comprar');

// funciones


function renderizarProductos() {
    baseDeDatos.forEach((info) => {
        
        const miNodo = document.createElement('div');
        miNodo.classList.add('card', 'col-sm-4');
        
        const miNodoCardBody = document.createElement('div');
        miNodoCardBody.classList.add('card-body');
        
        const miNodoTitle = document.createElement('h5');
        miNodoTitle.classList.add('card-title');
        miNodoTitle.textContent = info.nombre;
        
        const miNodoImagen = document.createElement('img');
        miNodoImagen.classList.add('img-fluid');
        miNodoImagen.setAttribute('src', info.imagen);
       
        const miNodoPrecio = document.createElement('p');
        miNodoPrecio.classList.add('card-text');
        miNodoPrecio.textContent = '$'+ info.precio ;
        //botones
        const miNodoBoton = document.createElement('button');
        miNodoBoton.classList.add('btn', 'btn-primary');
        miNodoBoton.textContent = '+';
        miNodoBoton.setAttribute('marcador', info.id);
        miNodoBoton.addEventListener('click', anyadirProductoAlCarrito);
        //insertar
        miNodoCardBody.appendChild(miNodoImagen);
        miNodoCardBody.appendChild(miNodoTitle);
        miNodoCardBody.appendChild(miNodoPrecio);
        miNodoCardBody.appendChild(miNodoBoton);
        miNodo.appendChild(miNodoCardBody);
        DOMitems.appendChild(miNodo);
    });
}

/**
 * añadir un producto al carrito 
 */
function anyadirProductoAlCarrito(evento) {
    carrito.push(evento.target.getAttribute('marcador'))
    calcularTotal();
    renderizarCarrito();

}

/**
 * productos guardados en el carrito
 */
function renderizarCarrito() {
    DOMcarrito.textContent = '';
    const carritoSinDuplicados = [...new Set(carrito)];
    carritoSinDuplicados.forEach((item) => {

        const miItem = baseDeDatos.filter((itemBaseDatos) => {           
            return itemBaseDatos.id === parseInt(item);
        });       
        const numeroUnidadesItem = carrito.reduce((total, itemId) => {           
            return itemId === item ? total += 1 : total;
        }, 0);
       
        const miNodo = document.createElement('li');
        miNodo.classList.add('list-group-item', 'text-right', 'mx-2');
        miNodo.textContent = `${numeroUnidadesItem} x ${miItem[0].nombre} - ${miItem[0].precio}$`;
        // boton de borrar
        const miBoton = document.createElement('button');
        miBoton.classList.add('btn', 'btn-danger', 'mx-5');
        miBoton.textContent = 'X';
        miBoton.style.marginLeft = '1rem';
        miBoton.dataset.item = item;
        miBoton.addEventListener('click', borrarItemCarrito);
        // nodos
        miNodo.appendChild(miBoton);
        DOMcarrito.appendChild(miNodo);
    });
}

/**
 * borrar un elemento del carrito
 */
function borrarItemCarrito(evento) {
   
    const id = evento.target.dataset.item;
   
    carrito = carrito.filter((carritoId) => {
        return carritoId !== id;
    });
    
    renderizarCarrito();
   
    calcularTotal();
}

/**
 * calcula el precio total 
 */
function calcularTotal() {
   
    total = 0;
   
    carrito.forEach((item) => {
       
        const miItem = baseDeDatos.filter((itemBaseDatos) => {
            return itemBaseDatos.id === parseInt(item);
        });
        total = total + miItem[0].precio;
    });
   
    DOMtotal.textContent = total.toFixed(2);
}

/**
 * Vacia el carrito 
 */
function vaciarCarrito() {
    
    carrito = [];
    
    renderizarCarrito();
    calcularTotal();
}

// eventos
DOMbotonVaciar.addEventListener('click', vaciarCarrito);
DOMbotonComprar.addEventListener('click', vaciarCarrito);

// mensaje
$('#boton-comprar').on('click',()=>{
    alert('Gracias por su compra, pronto recibira su pedido.')
})

// inicio
renderizarProductos();

