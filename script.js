
//CLASE PRODUCTOS
class Productos{
    constructor(name,brand,price,promotion){
        this.name = name;
        this.brand = brand;
        this.price = price;
        this.promotion = promotion;
    }

    doesExist (producto){
        return producto.name == this.name && producto.brand == this.brand;
    }
}

//FUNCION PARA CALCULAR TOTAL DEL PRECIO PRODUCTO EN BASE A PROMOCION
function calculateTotal(producto){
    switch(producto.promotion){
        case 0:
            return producto.price / 2;
        case 1:
            return producto.price * 2 / 3;
        case 2:
            return producto.price / 2;
    }
}

function newProduct (producto){
    
}

function eraseProduct (producto){
    let childProduct = producto.target;
    let fatherProduct = childProduct.parentNode;
    fatherProduct.remove();
}

//COMIENZO COD GRAL
//LECTURA E INICIALIZACION DE MARKET
let arrayAuxMarket = localStorage.getItem("marketArr"); 
let boxMarket = document.getElementById("marketID");

if(arrayAuxMarket != null){
    marketArr = JSON.parse(arrayAuxMarket);
    for (let product of marketArr){
        
    }
}else{
    let marketArr = []; 
    let noMarketProd = document.createElement("div");
    noMarketProd.innerHTML =`<p>La lista de precios de productos de almacen aún se encuentra vacía</p>
                            <p>¿Desea agregar un producto nuevo?</p>`
    boxMarket.append(noMarketProd);
}


//LECTURA E INICIALIZACION DE DRINKS
let arrayAuxDrinks = localStorage.getItem("drinksArr");
let boxDrinks = document.getElementById("drinksID");

if(arrayAuxDrinks != null){
    drinksArr = JSON.parse(arrayAuxDrinks);
}else{
    let drinksArr = []; 
    let noDrinksProd = document.createElement("div");
    noDrinksProd.innerHTML =`<p>La lista de precios de productos de bebidas aún se encuentra vacía</p>
                            <p>¿Desea agregar un producto nuevo?</p>`
    boxDrinks.append(noDrinksProd);
}

//LECTURA E INICIALIZACION DE CLEANING
let arrayAuxCleaning = localStorage.getItem("cleaningArr");
let boxCleaning = document.getElementById("cleaningID");

if(arrayAuxCleaning != null){
    cleaningArr = JSON.parse(arrayAuxCleaning);
}else{
    let cleaningArr = []; 
    let noCleaningProd = document.createElement("div");
    noCleaningProd.innerHTML =`<p>La lista de precios de productos de limpieza aún se encuentra vacía</p>
                            <p>¿Desea agregar un producto nuevo?</p>`
    boxCleaning.append(noCleaningProd);
}

//LECTURA E INICIALIZACION DE PERSONALCARE
let arrayAuxPersonal = localStorage.getItem("personalCareArr");
let boxPersonal = document.getElementById("personalCareID");

if(arrayAuxPersonal != null){
    personalCareArr = JSON.parse(arrayAuxPersonal);
}else{
    let personalCareArr = []; 
    let noPersonalProd = document.createElement("div");
    noPersonalProd.innerHTML =`<p>La lista de precios de productos de cuidados personales aún se encuentra vacía</p>
                            <p>¿Desea agregar un producto nuevo?</p>`
    boxPersonal.append(noPersonalProd);
}

