
//CLASE PRODUCTOS
class Productos{
    constructor(ident,name,brand,price,promotion,totalPrice,supermarket){
        this.ident = ident;
        this.name = name;
        this.brand = brand;
        this.price = price;
        this.promotion = promotion;
        this.totalPrice = totalPrice;
        this.supermarket= supermarket;

    }
    calculateTotal (){
        switch(this.promotion){
            case "SIN PROMOCION":
                this.totalPrice = this.price;
                return this.totalPrice;
            case "2X1":
                this.totalPrice = this.price /2;
                return this.totalPrice;
            case "3X2":
                this.totalPrice = this.price *2 /3;
                return this.totalPrice;
            case "50% OFF EN LA 2DA UNIDAD":
                this.totalPrice = this.price /2;
                return this.totalPrice;
            case "10% OFF":
                this.totalPrice = this.price * 0.9;
                return this.totalPrice;
            case "15% OFF":
                this.totalPrice = this.price * 0.85;
                return this.totalPrice;
            case "20% OFF":
                this.totalPrice = this.price * 0.8;
                return this.totalPrice;
            case "25% OFF":
                this.totalPrice = this.price *0.75;
                return this.totalPrice;
            case "30% OFF":
                this.totalPrice = this.price *0.70;
                return this.totalPrice;
            case "35% OFF":
                this.totalPrice = this.price *0.65;
                return this.totalPrice;
            case "40% OFF":
                this.totalPrice = this.price *0.6;
                return this.totalPrice
        }
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
        <th>Precio p/unidad aplicando promoción</th>
        <th>Supermercado</th></span>
        `;                              //RENDERIZO EL ENCABEZADO
    }
    for (let product of arr){                                       //RENDERIZO LOS PROD DEL ARRAY
        let listAProd = document.createElement("tr");
        listAProd.innerHTML = `<td><p>${product.ident}</p></td>
                            <td>${product.name}</td>
                            <td>${product.brand}</td>
                            <td>$${product.price}</td>
                            <td>${product.promotion}</td>
                            <td>$ ${product.totalPrice}</td>
                            <td>${product.supermarket}</td>
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

    Toastify({
        text:"Producto eliminado",
        gravity:"bottom",
        style:{
            background: "#5e0000"
        }
    }).showToast();

    let btnSupr = nodo.target;
    let boxNodo = btnSupr.parentNode.parentNode.parentNode.parentNode.parentNode;
    let boxName = boxNodo.querySelector("h4").innerText;
    let listNodo = boxNodo.querySelector(".listProd");

    let rowErase = btnSupr.parentNode.parentNode;
    let eraseID = rowErase.querySelector("p").textContent;

    let filtered;

    switch (boxName){
        case "Almacen":
            listNodo.innerHTML=``;
            filtered = marketArr.filter(product => product.ident != eraseID);
            marketArr = filtered;
            let marketJson = JSON.stringify(marketArr);
            localStorage.setItem("marketArr",marketJson);
            showProd(marketArr,boxNodo);
            break;
        case "Bebidas":
            listNodo.innerHTML=``;
            filtered = drinksArr.filter(product => product.ident != eraseID);
            drinksArr = filtered;
            let drinksJson = JSON.stringify(drinksArr);
            localStorage.setItem("drinksArr",drinksJson);
            showProd(drinksArr,boxNodo);
            break;       
        case "Limpieza":
            listNodo.innerHTML=``;
            filtered = cleaningArr.filter(product => product.ident != eraseID);
            cleaningArr = filtered;
            let cleaningJson = JSON.stringify(cleaningArr);
            localStorage.setItem("cleaningArr",cleaningJson);
            showProd(cleaningArr,boxNodo);
            break;  
        case "Cuidado Personal":
            listNodo.innerHTML=``;
            filtered = personalCareArr.filter(product => product.ident != eraseID);
            personalCareArr = filtered;
            let personalJson = JSON.stringify(personalCareArr);
            localStorage.setItem("personalCareArr",personalJson);
            showProd(personalCareArr,boxNodo);
            break;  
        }

}

    //FUNCION BUSCAR PRODUCTO
    

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

    let prodName = inputs.querySelector(".nameProduct").value.toUpperCase();
    let prodBrand = inputs.querySelector(".brandProduct").value.toUpperCase();
    let prodPrice = Number(inputs.querySelector(".priceProduct").value);
    let prodProm = inputs.querySelector(".promotions").value.toUpperCase();
    let prodSuper = inputs.querySelector(".supermarkets").value.toUpperCase();
    



    prodName = prodName.trim();
    prodBrand = prodBrand.trim();
    //VALIDACION DE INGRESO, SI INGRESA MAL NO TENDRIA QUE PUSHEAR NI GRABAR

    if (prodName == "" || prodBrand == "" || prodPrice == "" || prodSuper == "" || typeof prodPrice == 'string'){
        Swal.fire({
            title: "Producto no agregado",
            text: "Todos los campos deben estar completos",
            icon: "error",
            confirmButtonText:"Volver",
            color: "rgb(209, 255, 255)",
            background:"#4d4d4d",
            showClass: {
                popup:"animate__animated animate__zoomIn"
            },
            hideClass:{
                pop:"animate__animated animate__zoomOut"
            }
        });
    }else{
        
        let allowMarket = marketArr.find(prod => prod.name === prodName && prod.brand === prodBrand && prod.supermarket === prodSuper);
        let allowDrinks = drinksArr.find(prod => prod.name === prodName && prod.brand === prodBrand && prod.supermarket === prodSuper);
        let allowCleaning = cleaningArr.find(prod => prod.name === prodName && prod.brand === prodBrand && prod.supermarket === prodSuper);
        let allowPersonal = personalCareArr.find(prod => prod.name === prodName && prod.brand === prodBrand && prod.supermarket === prodSuper);

        if(allowMarket === undefined && allowDrinks === undefined && allowCleaning === undefined && allowPersonal === undefined){
            
                //CREACION DEL PRODUCTO
            acumulator++;
            let acumulatorJson = JSON.stringify(acumulator);
            localStorage.setItem("acumulator",acumulatorJson);
            let producto = new Productos (acumulator,prodName, prodBrand, prodPrice, prodProm, 0, prodSuper);
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
                case "Cuidado Personal":
                    listNod.innerHTML=``;
                    personalCareArr.push(producto);
                    let personalJson = JSON.stringify(personalCareArr);
                    localStorage.setItem("personalCareArr",personalJson);
                    showProd(personalCareArr,boxNod);
                    break;
                }
            Toastify({
                text:"Producto agregado",
                gravity:"bottom",
                style:{
                    background: "#00610d"
                }
            }).showToast();
        }else{
            Swal.fire({
                title: "Producto no agregado",
                text: "El producto ya existe",
                icon: "error",
                confirmButtonText:"Volver",
                color: "rgb(209, 255, 255)",
                background:"#4d4d4d",
                showClass: {
                    popup:"animate__animated animate__zoomIn"
                },
                hideClass:{
                    pop:"animate__animated animate__zoomOut"
                }
            });
        }
    }
}

//FIRST VISIT


if(localStorage.getItem("firstVisit") == null){
    let firstVisit=true;
    let firstJson = JSON.stringify(firstVisit);
    localStorage.setItem("firstVisit",firstJson);
    Swal.fire({
        title: "Bienvenido a Changuito",
        text: "Aquí podrás ver productos de distintos supermercados junto a sus promociones. Los datos se generan a partir de los usuarios de la aplicación ¡Comienza ahora a agregar productos y comparte con el resto tu conocimiento!",
        icon: "info",
        confirmButtonText:"Comenzar",
        color: "rgb(209, 255, 255)",
        background:"#4d4d4d",
        showClass: {
            popup:"animate__animated animate__zoomIn"
        },
        hideClass:{
            pop:"animate__animated animate__zoomOut"
        }
    });
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
        emptyMarket.innerHTML =`<div class="emptyList">
                                <p>La lista de precios de productos de Almacen aún se encuentra vacía</p>
                                <p>¿Desea agregar un producto nuevo?</p>
                                </div>`
        auxMarket.append(emptyMarket);
    }else{
        marketArr = localStorage.getItem("marketArr");
        marketArr = JSON.parse(marketArr);
        if(marketArr.length == 0){        
            let emptyMarket = document.createElement("div");
            emptyMarket.innerHTML =`<div class="emptyList">
                                    <p>La lista de precios de productos de Almacen aún se encuentra vacía</p>
                                    <p>¿Desea agregar un producto nuevo?</p>
                                    </div>`
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
        emptyDrinks.innerHTML =`<div class="emptyList">
                                <p>La lista de precios de productos de Bebidas aún se encuentra vacía</p>
                                <p>¿Desea agregar un producto nuevo?</p>
                                </div>`
        auxDrinks.append(emptyDrinks);
    }else{
        drinksArr = localStorage.getItem("drinksArr");
        drinksArr = JSON.parse(drinksArr);
        if(drinksArr.length == 0){        
            let emptyDrinks = document.createElement("div");
            emptyDrinks.innerHTML =`<div class="emptyList">
                                    <p>La lista de precios de productos de Bebidas aún se encuentra vacía</p>
                                    <p>¿Desea agregar un producto nuevo?</p>
                                    </div>`
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
            emptyCleaning.innerHTML =`<div class="emptyList">
                                    <p>La lista de precios de productos de Limpieza aún se encuentra vacía</p>
                                    <p>¿Desea agregar un producto nuevo?</p>
                                    </div>`
            auxCleaning.append(emptyCleaning);
        }else{
            cleaningArr = localStorage.getItem("cleaningArr");
            cleaningArr = JSON.parse(cleaningArr);
            if(cleaningArr.length == 0){        
                let emptyCleaning = document.createElement("div");
                emptyCleaning.innerHTML =`<div class="emptyList">
                                        <p>La lista de precios de productos de Limpieza aún se encuentra vacía</p>
                                        <p>¿Desea agregar un producto nuevo?</p>
                                        </div>`
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
    
        let personalCareArr = [];
    
    
        if(localStorage.getItem("personalCareArr") == null){
            let personalJson = JSON.stringify(personalCareArr);
            localStorage.setItem("personalCareArr",personalJson);
            let emptyPersonal = document.createElement("div");
            emptyPersonal.innerHTML =`<div class="emptyList">
                                    <p>La lista de precios de productos de Cuidado personal aún se encuentra vacía</p>
                                    <p>¿Desea agregar un producto nuevo?</p>
                                    </div>`
            auxPersonal.append(emptyPersonal);
        }else{
            personalCareArr = localStorage.getItem("personalCareArr");
            personalCareArr = JSON.parse(personalCareArr);
            if(personalCareArr.length == 0){        
                let emptyPersonal = document.createElement("div");
                emptyPersonal.innerHTML =`<div class="emptyList">
                                        <p>La lista de precios de productos de Cuidado personal aún se encuentra vacía</p>
                                        <p>¿Desea agregar un producto nuevo?</p>
                                        </div>`
                auxPersonal.append(emptyPersonal);
            }else{
                auxPersonal.innerHTML=``;
                showProd(personalCareArr,personalBox);
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

//MOSTRAR CLIMA HOY

let boxWeather = document.querySelector(".weather");

function showWeather (clientPosition){

    let lat = clientPosition.coords.latitude;
    let long = clientPosition.coords.longitude;
    let apiKey = "4de9a81f4a89b43687bddc615941a605";

    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${apiKey}&units=metric&lang=es`)
        .then(response => response.json())
        .then(data=>{
            boxWeather.innerHTML=`<p>${data.name}</p>
                                <div>
                                    <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png"> 
                                    <p>${data.main.temp}° ${data.weather[0].description}</p>
                                </div>`
        })
}

navigator.geolocation.getCurrentPosition(showWeather);


