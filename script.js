
//CLASE PRODUCTOS
class Productos{
    constructor(ident,name,brand,price,promotion,totalPrice){
        this.ident = ident;
        this.name = name;
        this.brand = brand;
        this.price = price;
        this.promotion = promotion;
        this.totalPrice = totalPrice;
    }
    calculateTotal (){
        switch(this.promotion){
            case 1:
                this.totalPrice = this.price / 2;
                return this.totalPrice;
            case 2:
               this.totalPrice = this.price * 2 / 3;
                return this.totalPrice;
            case 3:
                this.totalPrice = this.price / 2;
                return this.totalPrice;
            default:
                this.totalPrice = this.price;
                return this.totalPrice;
        }
    }
}

    //FUNCION PARA MOSTRAR PROMOCIONES

function showProm (prom){
    switch(prom){
        case 1:
            return "2X1";
        case 2:
            return "3X2";
        case 3:
            return "50% OFF 2da unidad";
        default:
            return "Sin promociones";
    }
}

    //FUNCION PARA RENDERIZAR EL LISTADO DE PRODUCTOS

function showProd (arr, nod){
    let boxList = nod.querySelector(".listProd");       //CAPTURO LA LISTA
    let boxHeader = nod.querySelector(".header");       //CAPTURO EL ENCABEZADO

    if(arr.length == 0){
        boxHeader.innerHTML=``;
    }else{
        boxHeader.innerHTML=`<span><th>ID</th>
        <th>Nombre</th>
        <th>Marca</th>
        <th>Precio</th>
        <th>Promocion</th>
        <th>Precio p/unidad aplicando promoción</th></span>
        `;                              //RENDERIZO EL ENCABEZADO
    }
    for (let product of arr){                                       //RENDERIZO LOS PROD DEL ARRAY
        let listAProd = document.createElement("tr");
        listAProd.innerHTML = `<td><p>${product.ident}</p></td>
                            <td>${product.name}</td>
                            <td>${product.brand}</td>
                            <td>$${product.price}</td>
                            <td>${showProm(product.promotion)}</td>
                            <td>$${product.totalPrice}</td>
                            <td><button class="eraseProd">Borrar</button></td>
                            <br>`
        boxList.append(listAProd);
    }
    //BORRAR PRODUCTO ALL 

    //CAPTURA DE NODOS Y ASIGNACION DE EVENTOS

    let btnErase = document.querySelectorAll(".eraseProd");
    for (let bot of btnErase){
        bot.addEventListener("click", eraseProduct);   
    }
}

    //FUNCION PARA BORRAR PRODUCTO

function eraseProduct (nodo){

    let btnSupr = nodo.target;
    let boxNodo = btnSupr.parentNode.parentNode.parentNode.parentNode.parentNode;
    let boxName = boxNodo.querySelector("h4").innerText;
    let listNodo = boxNodo.querySelector(".listProd");

    let rowErase = btnSupr.parentNode.parentNode;
    let eraseID = rowErase.querySelector("p").textContent;

    function deleteProd(producto){
        return producto.ident != eraseID;
    }
    let filtered;
    acumulator--;
    let acumulatorJson = JSON.stringify(acumulator);
    localStorage.setItem("acumulator",acumulatorJson);
    switch (boxName){
        case "Almacen":
            listNodo.innerHTML=``;
            filtered = marketArr.filter(deleteProd);
            marketArr = filtered;
            let marketJson = JSON.stringify(marketArr);
            localStorage.setItem("marketArr",marketJson);
            showProd(marketArr,boxNodo);
            break;
        case "Bebidas":
            listNodo.innerHTML=``;
            filtered = drinksArr.filter(deleteProd);
            drinksArr = filtered;
            let drinksJson = JSON.stringify(drinksArr);
            localStorage.setItem("drinksArr",drinksJson);
            showProd(drinksArr,boxNodo);
            break;       
        case "Limpieza":
            listNodo.innerHTML=``;
            filtered = cleaningArr.filter(deleteProd);
            cleaningArr = filtered;
            let cleaningJson = JSON.stringify(cleaningArr);
            localStorage.setItem("cleaningArr",cleaningJson);
            showProd(cleaningArr,boxNodo);
            break;  
        case "Cuidado personal":
            listNodo.innerHTML=``;
            filtered = personalCareArr.filter(deleteProd);
            personalCareArr = filtered;
            let personalJson = JSON.stringify(personalArr);
            localStorage.setItem("personalArr",personalJson);
            showProd(personalCareArr,boxNodo);
            break;  
        }

}

    //FUNCION PARA NUEVO PRODUCTO TODAS LAS CATEGORIAS

function newProduct (nod){

    //CAPTURA DE NODOS
    
    let btnNod = nod.target;
    let boxNod = btnNod.parentNode;
    let nameBox = boxNod.querySelector("h4").innerText;
    let listNod = boxNod.querySelector(".listProd");
    let aux2 = boxNod.querySelector(".aux");
    let inputs = boxNod.querySelector(".inputs");

    //CAPTURA DE INPUTS

    let prodName = inputs.querySelector(".nameProduct").value;
    let prodBrand = inputs.querySelector(".brandProduct").value;
    let prodPrice = Number(inputs.querySelector(".priceProduct").value);
    let prodProm = Number(inputs.querySelector(".promotionProduct").value);

    prodName = prodName.trim();
    prodBrand = prodBrand.trim();
    //VALIDACION DE INGRESO, SI INGRESA MAL NO TENDRIA QUE PUSHEAR NI GRABAR

    if (prodName == "" || prodBrand == "" || prodPrice == "" || prodProm == "" || typeof prodPrice == 'string' || typeof aux3 == 'string'){
        document.body.innerHTML=`<h2>Uno o más datos ingresados fueron incorrectos.</h2>
                                <p>Por favor, ingrese los datos correctamente.</p>
                                <button><a href="index.html">Volver</a></button>`
    }else if(prodProm == 1 || prodProm ==2 || prodProm == 3){
        
        //CREACION DEL PRODUCTO

        acumulator++;
        let acumulatorJson = JSON.stringify(acumulator);
        localStorage.setItem("acumulator",acumulatorJson);
        let producto = new Productos (acumulator,prodName, prodBrand, prodPrice, prodProm, 0);
        producto.totalPrice = producto.calculateTotal();
        aux2.innerHTML=``; 
        switch (nameBox){
            case "Almacen":
                listNod.innerHTML=``;
                marketArr.push(producto);
                let marketJson = JSON.stringify(marketArr);
                localStorage.setItem("marketArr",marketJson);          
                showProd(marketArr,boxNod);
                break;
            case "Bebidas":
                listNod.innerHTML=``;
                drinksArr.push(producto);
                let drinksJson = JSON.stringify(drinksArr);
                localStorage.setItem("drinksArr",drinksJson);
                showProd(drinksArr,boxNod);
                break;
            case "Limpieza":
                listNod.innerHTML=``;
                cleaningArr.push(producto);
                let cleaningJson = JSON.stringify(cleaningArr);
                localStorage.setItem("cleaningArr",cleaningJson);
                showProd(cleaningArr,boxNod);
                break;
            case "CuidadoPersonal":
                listNod.innerHTML=``;
                personalArr.push(producto);
                let personalJson = JSON.stringify(personalArr);
                localStorage.setItem("personalArr",personalJson);
                showProd(personalArr,boxNod);
                break;
            }
        }else{
            document.body.innerHTML=`<h2>Las promociones deben ser</h2>
                                <p>0 para 2x1</p>
                                <p>1 para 3x2</p>
                                <p>2 para 50% off en la 2da unidad</p>
                                <button><a href="index.html">Volver</a></button>`
        }
    }

//TODO MARKET

    // CAPTURA NODOS MARKET

let marketBox = document.getElementById("market");
let auxMarket = marketBox.querySelector(".aux");


    //LECTURA E INICIALIZACION MARKET

    let marketArr = [];

    showProd(marketArr,marketBox);

    if(localStorage.getItem("marketArr") == null){
        let marketJson = JSON.stringify(marketArr);
        localStorage.setItem("marketArr",marketJson);
        let emptyMarket = document.createElement("div");
        emptyMarket.innerHTML =`<p>La lista de precios de productos de almacen aún se encuentra vacía</p>
                                <p>¿Desea agregar un producto nuevo?</p>`
        auxMarket.append(emptyMarket);
    }else{
        marketArr = localStorage.getItem("marketArr");
        marketArr = JSON.parse(marketArr);
        if(marketArr.length == 0){        
            let emptyMarket = document.createElement("div");
            emptyMarket.innerHTML =`<p>La lista de precios de productos de almacen aún se encuentra vacía</p>
                                    <p>¿Desea agregar un producto nuevo?</p>`
            auxMarket.append(emptyMarket);
        }else{
            auxMarket.innerHTML=``;
            showProd(marketArr,marketBox);
        }
    }

//TODO DRINKS

    // CAPTURA NODOS DRINKS

let drinksBox = document.getElementById("drinks");
let auxDrinks = drinksBox.querySelector(".aux");


    //LECTURA E INICIALIZACION MARKET

    let drinksArr = [];


    if(localStorage.getItem("drinksArr") == null){
        let drinksJson = JSON.stringify(drinksArr);
        localStorage.setItem("drinksArr",drinksJson);
        let emptyDrinks = document.createElement("div");
        emptyDrinks.innerHTML =`<p>La lista de precios de productos Bebibles aún se encuentra vacía</p>
                                <p>¿Desea agregar un producto nuevo?</p>`
        auxDrinks.append(emptyDrinks);
    }else{
        drinksArr = localStorage.getItem("drinksArr");
        drinksArr = JSON.parse(drinksArr);
        if(drinksArr.length == 0){        
            let emptyDrinks = document.createElement("div");
            emptyDrinks.innerHTML =`<p>La lista de precios de productos Bebibles aún se encuentra vacía</p>
                                    <p>¿Desea agregar un producto nuevo?</p>`
            auxDrinks.append(emptyDrinks);
        }else{
            auxDrinks.innerHTML=``;
            showProd(drinksArr,drinksBox);
        }
    }

//TODO CLEANING

    // CAPTURA NODOS CLEANING

    let cleaningBox = document.getElementById("cleaning");
    let auxCleaning = cleaningBox.querySelector(".aux");
    
    
        //LECTURA E INICIALIZACION CLEANING
    
        let cleaningArr = [];
    
    
        if(localStorage.getItem("cleaningArr") == null){
            let cleaningJson = JSON.stringify(cleaningArr);
            localStorage.setItem("cleaningArr",cleaningJson);
            let emptyCleaning = document.createElement("div");
            emptyCleaning.innerHTML =`<p>La lista de precios de productos de Limpieza aún se encuentra vacía</p>
                                    <p>¿Desea agregar un producto nuevo?</p>`
            auxCleaning.append(emptyCleaning);
        }else{
            cleaningArr = localStorage.getItem("cleaningArr");
            cleaningArr = JSON.parse(cleaningArr);
            if(cleaningArr.length == 0){        
                let emptyCleaning = document.createElement("div");
                emptyCleaning.innerHTML =`<p>La lista de precios de productos de Limpieza aún se encuentra vacía</p>
                                        <p>¿Desea agregar un producto nuevo?</p>`
                auxCleaning.append(emptyCleaning);
            }else{
                auxCleaning.innerHTML=``;
                showProd(cleaningArr,cleaningBox);
            }
        }

//TODO PERSONALCARE

    // CAPTURA NODOS PERSONAL CARE

    let personalBox = document.getElementById("personalCare");
    let auxPersonal = personalBox.querySelector(".aux");
    
    
        //LECTURA E INICIALIZACION PERSONAL CARE
    
        let personalArr = [];
    
    
        if(localStorage.getItem("personalArr") == null){
            let personalJson = JSON.stringify(personalArr);
            localStorage.setItem("personalArr",personalJson);
            let emptyPersonal = document.createElement("div");
            emptyPersonal.innerHTML =`<p>La lista de precios de productos de Cuidado personal aún se encuentra vacía</p>
                                    <p>¿Desea agregar un producto nuevo?</p>`
            auxPersonal.append(emptyPersonal);
        }else{
            personalArr = localStorage.getItem("personalArr");
            personalArr = JSON.parse(personalArr);
            if(personalArr.length == 0){        
                let emptyPersonal = document.createElement("div");
                emptyPersonal.innerHTML =`<p>La lista de precios de productos de Cuidado personal aún se encuentra vacía</p>
                                        <p>¿Desea agregar un producto nuevo?</p>`
                auxPersonal.append(emptyPersonal);
            }else{
                auxPersonal.innerHTML=``;
                showProd(personalArr,personalBox);
            }
        }
    


//NUEVO PRODUCTO ALL

let acumulator = 0;

if (localStorage.getItem("acumulator")==null){
    let acumulatorJson = JSON.stringify(acumulator);
    localStorage.setItem("acumulator",acumulatorJson);
}else{
    acumulator = localStorage.getItem("acumulator");
    acumulator = JSON.parse(acumulator);
}

    //CAPTURA DE NODOS Y ASIGNACIÓN DE EVENTOS

let btnNewProd = document.querySelectorAll(".btnNewProd");
for (let boton of btnNewProd){
    boton.addEventListener("click", newProduct);
}




