class selecprod {
  constructor(varselnombre, varselprecio) {
    this.selectnombre = varselnombre;
    this.selectprecio = varselprecio;
  }
}

class detalleCarrito {
  constructor() {
    this.detalleCarrito = [];
  }

  guardarProducto(newproducto) {
    this.detalleCarrito.push(newproducto);
  }

  getdetalleCarrito() {
    return this.detalleCarrito;
  }

  nuevoDetalleCarrito(){
    this.detalleCarrito = [];
  }

  buscarProductoPorId(idProducto) {
    let varproducto = new producto();
    for (let i = 0; i < varproducto.getListadoProducto().length; i++) {
      if (varproducto.getListadoProducto()[i].id == idProducto) {
        return i;
      }
    }
  }

  agregarProductoCarrito(productoss) {
    let objProducto = new producto();
    let varidProducto = this.buscarProductoPorId(productoss);
    let productoclass = objProducto.getListadoProducto()[varidProducto].descripcion;
    let precioclass = objProducto.getListadoProducto()[varidProducto].precio;
    let varselectprod = new selecprod(productoclass, precioclass);
    this.detalleCarrito.push(varselectprod);
  }
}

class cabeceracarrito {
  constructor(varcorreo, varnombrecompleto ) {
    this.correo = varcorreo;
    this.nombrecompleto = varnombrecompleto;
  }
}

class producto {
  getListadoProducto() {
    return nuevolistado;
  }
}

class venta{
  constructor(varcabecerafin, vardetallefin ) {
    this.cabeceraventa= varcabecerafin;
    this.detalleventa = vardetallefin;
  }
}

let varobjdetalleCarrito = new detalleCarrito();
let nuevolistado = [];
let letproducto = new producto();

function extraerJson(){
$.ajax({
  method: "GET",
  dataType: "json",
  url: "listproducts.json",
  success: function (respuesta) {
    for (var i = 0; i < respuesta.length; i++) {
      nuevolistado.push(respuesta[i]);
    }
    agregarCards();
  },
});
}


function agregarCards() {
  let items = letproducto.getListadoProducto();
  const fragmento = document.createDocumentFragment();
  for (const item of items) {
    let contenedor = document.createElement("div");
    contenedor.innerHTML = `
  <div class="col mb-5">
  <div class="card h-100">
      <!-- Product image-->
      <img class="card-img-top" src="${item.imagen}" alt="..." />
      <!-- Product details-->
      <div class="card-body p-4">
          <div class="text-center">
              <!-- Product name-->
              <h5 class="fw-bolder">${item.descripcion}</h5>
              <!-- Product price-->
             <p>Dia: ${item.dia} </p>
            <p> Hora: ${item.hora}</p>
             <p>Instructor: ${item.instructor} </p>
             <h5>Precio: $${item.precio} </h5>
          </div>
      </div>
      <!-- Product actions-->
      <div class="card-footer p-4 pt-0 border-top-0 bg-transparent">
          <div class="text-center">
          <a class="btn btn-outline-dark  mt-auto mb-2"  href="#">Informacion</a>
          <a class="btn btn-success mt-auto mb-2" id='btncarro' value="" onclick="agregarProductoCar(${item.id})" href="#">Agregar</a>
          </div>
      </div>
  </div>
  </div>`;
    fragmento.append(contenedor);
  }
    $("#cards").append(fragmento);
}



function agregarProductoCar(idproducto) {
  varobjdetalleCarrito.agregarProductoCarrito(idproducto);
  cantDetalle = varobjdetalleCarrito.getdetalleCarrito().length;
  $("#btncartera").text(cantDetalle);
  $("#mensaje").fadeIn(1000, function () {
  $("#mensaje").fadeOut(3000);
  });
  borrarProductosCarrito();
}

function mostrarProductosCarrito() {
  let items = varobjdetalleCarrito.getdetalleCarrito();
  let varMontoTotal = 0;
  for (const item of items) {
    varMontoTotal = varMontoTotal + parseInt(item.selectprecio);
    $("#tableContenido").append(` <tr id="elemento">
    <td>${item.selectnombre}</td>
    <td>$${item.selectprecio}</td>
  </tr>`);
  }
  $("#montoTotal").text("$" + varMontoTotal);
}

function borrarProductosCarrito() {
  $("tbody tr").remove();
}

function nuevo(){

  $("#txtcorreo").val("");
  $("#txtnombcompleto").val("");
  borrarProductosCarrito();
  varobjdetalleCarrito.nuevoDetalleCarrito();
  $("#btncartera").text("0");
  $("#montoTotal").text("$ 0");
  $("#tableContenido").append(`<tr><td COLSPAN="2" style="text-align: center; color:gray;">No hay productos seleccionados</td></tr>`);
 

}

function registrarCompra(){
  if(varobjdetalleCarrito.detalleCarrito.length>0 && $("#txtcorreo").val()!=="" && $("#txtnombcompleto").val()!==""){
    let correo=$("#txtcorreo").val();
    let nombrecompletoss=$("#txtnombcompleto").val();
    let objcarrito = new cabeceracarrito(correo, nombrecompletoss);
    let variableventaFinal= new venta(objcarrito, varobjdetalleCarrito.getdetalleCarrito() );
    console.log(variableventaFinal);

    $("#mensajesuccess").fadeIn(1000, function () {
      $("#mensajesuccess").fadeOut(8000);
    });
    
    nuevo();

  }else if($("#txtcorreo").val()=="" || $("#txtnombcompleto").val()==""){
    $("#mensajewarning").fadeIn(1000, function () {
      $("#mensajewarning").fadeOut(8000);
    });
     }else{
    $("#mensajedanger").fadeIn(1000, function () {
      $("#mensajedanger").fadeOut(8000);
    });
  }
}

function init(){
extraerJson()
mostrarProductosCarrito();
$("#mensaje").hide();
$("#mensajedanger").hide();
$("#mensajesuccess").hide();
$("#mensajewarning").hide();
}

init();




