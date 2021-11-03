
//ENTIDADES
 
 class Bebida {
 
     constructor({
         nombre,
         marca,
         modelo,
         tamaño,
         disponible = false,
     }) {
         this.nombre = nombre;
         this.marca = marca;
         this.modelo = modelo;
         this.tamaño = tamaño;
         this.disponible = disponible;
     }
 }
 
 
//variables

 let listaBebidas = [];
 
//FUNCIONES

 const crearBebida = () => {
 
     const bebida = new Bebida({
         nombre: document.getElementById("nombre").value,
         marca: document.getElementById("marca").value,
         modelo: document.getElementById("modelo").value,
         tamaño: document.getElementById("tamaño").value,
     })
 
 
     let lista;
     if (localStorage.getItem("listaBebidas") != null) {
         lista = JSON.parse(localStorage.getItem("listaBebidas"))
         lista.push(bebida)
         localStorage.setItem("listaBebidas", JSON.stringify(lista))
     }
     listaBebidas.push(bebida)
 
 
     return bebida
 }
 
 
 const guardarEnBaseDeDatos = () => {
 
     crearBebida()
 
     if (verificarStorage() != undefined) {
         localStorage.setItem("listaBebidas", JSON.stringify(verificarStorage()))
     } else {
         localStorage.setItem("listaBebidas", JSON.stringify(listaBebidas))
     }
 }
 
 
 const verificarStorage = () => {
     let dato = [];
     if (localStorage.getItem("listaBebidas") != null) {
         dato = JSON.parse(localStorage.getItem("listaBebidas"))
         return dato
     }
 }
 
 
 const imprimirDatos = () => {
 
     let indice = 0
 
     verificarStorage().forEach(obj => {
 
         indice += 1
 
         document.getElementById("tabla").innerHTML += `
         <tr>
             <td>${indice}</td>
             <td>${obj.nombre}</td>
             <td>${obj.marca}</td>
             <td>${obj.modelo}</td>
             <td>${obj.tamaño}</td>
             <td>${!obj.disponible ?'si':'no'}</td>
             <td><button onclick=elimiarDeLaLista(${obj.nombre})>X</button></td>
         </tr>
         `
     });
 }
 
 const elimiarDeLaLista = (marca) => {
 
     let listaVieja = JSON.parse(localStorage.getItem("listaBebidas"))
     let listaNueva = listaVieja.filter(e => e.marca != marca)
 
     localStorage.setItem("listaBebidas", JSON.stringify(listaNueva))
     location.reload()
 
 }
 
//EVENTOS
 
 
 document.getElementById("btnSave").addEventListener("click", () => {
     guardarEnBaseDeDatos()
 })
 
 if (localStorage.getItem("listaBebidas") != null) {
     imprimirDatos()
 }
 
 console.log(verificarStorage())
 

