let comissionPercentage = 0.15;
var carro = [];

//Función que se utiliza para actualizar los costos de envío
function actualizarEnvio(){
    let comissionCostHTML = document.getElementById("comissionText");

    let comissionToShow = (Math.round(actualizarSubtotal() * comissionPercentage * 100) / 100);

    comissionCostHTML.innerHTML = comissionToShow;

    return comissionToShow;
};

function actualizarSubtotal(){
    var dolares = 0;

    let cantidad1 = document.getElementById("article0");
    let cantidad2 = document.getElementById("article1");

    let subtotal1 = document.getElementById("subtotal0");
    let subtotal2 = document.getElementById("subtotal1");

    let subtotal = document.getElementById("productCostText");

    var badge = document.getElementById("badge");

    if (cantidad1 === null && cantidad2 === null){
        subtotal.innerHTML = "0";
        badge.innerHTML = "0";

        return 0;
    }
    if (cantidad2 === null){
        if (carro[0].name == "Pino de olor para el auto"){
            dolares = cart.articles[0].unitCost / 40;

            var subTotal1 = cantidad1.value * dolares;
            subtotal.innerHTML = subTotal1;
            badge.innerHTML = cantidad1.value;

            return subTotal1;  
        };
        if (carro[0].name == "Suzuki Celerio"){
            var subTotal2 = cantidad1.value * carro[0].unitCost;
            subtotal.innerHTML = subTotal2;
            badge.innerHTML = cantidad1.value;

            return subTotal2;
        };
    }
    else {
        dolares = cart.articles[0].unitCost / 40;

        subtotal1.innerHTML = carro[0].currency + " " + cantidad1.value * carro[0].unitCost;
        subtotal2.innerHTML = carro[1].currency + " " + cantidad2.value * carro[1].unitCost;

        var subtotalNumerico = cantidad1.value * dolares + cantidad2.value * cart.articles[1].unitCost;

        subtotal.innerHTML = subtotalNumerico;
        valorBadge = parseInt(cantidad1.value) + parseInt(cantidad2.value);
        badge.innerHTML = valorBadge;

        return subtotalNumerico;
    };

};

function actualizarTotal(){
    let total = document.getElementById("totalCostText");

    total.innerHTML = (actualizarSubtotal() + actualizarEnvio()).toFixed(2); 
}

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.

document.addEventListener("DOMContentLoaded", function(e){
    document.getElementById("goldradio").addEventListener("change", function(){
        comissionPercentage = 0.15;
        actualizarEnvio();
        actualizarTotal();
    });
    
    document.getElementById("premiumradio").addEventListener("change", function(){
        comissionPercentage = 0.07;
        actualizarEnvio();
        actualizarTotal();
    });

    document.getElementById("standardradio").addEventListener("change", function(){
        comissionPercentage = 0.05;
        actualizarEnvio();
        actualizarTotal();
    });

    getJSONData(CART_INFO_URL_DESAFIATE).then(function(resultObj){
        if(resultObj.status === "ok")
        {
            cart = resultObj.data;
            carro = cart.articles;
            
            mostrar(carro);
        }
    });
});

function mostrar(carro){
    var HTML = `<table style="width: 70%" cellspacing="0">
            <tr>
            <th></th>
            <th>Nombre</th> 
            <th>Costo</th> 
            <th>Cantidad</th> 
            <th>Subtotal</th> 
            </tr>`
   
    for (i=0; i<carro.length; i++){
            
        HTML +=`<div id="item${i}"><tr><td><img src="` + carro[i].src + `" alt=""  width=50></td>
            <td> ${carro[i].name} </td>
            <td> ${carro[i].currency + ' ' + carro[i].unitCost} </td>
            <td> <input type="number" id="article${i}" name="quantity" min="1" value="${carro[i].count}" onchange ="actualizarSubtotal(); actualizarEnvio(); actualizarTotal();"></td>
            <td> <strong id="subtotal${i}">${carro[i].currency + ' ' + carro[i].count * carro[i].unitCost} </strong> </td>
            <td> <button class="btn btn-danger" onclick="borrar(${i})">X</button> </td>
            </tr></div>
            `
    }

    HTML += `</table>`
        
    let articulo1 = document.getElementById("cart-container");

    articulo1.innerHTML = HTML;
      
    actualizarSubtotal();
    actualizarEnvio();
    actualizarTotal();
    disableInput();
};

function borrar(i){
    var sound = new Audio ("kill-sound.mp3");

    sound.play();
    carro.splice(i, 1);
    mostrar(carro);
};

function validar(){
    var x = document.getElementsByName("input");
    let bankTransference = document.getElementById("bank-transference");
    var valido = true;

    if (bankTransference.checked) {
        x = document.getElementsByClassName("input");
    }
    
    for (i=0; i<x.length; i++){
        x[i].classList.remove('is-invalid');
        x[i].classList.remove('is-valid');
    
        if (x[i].value === "" || x[i].value === 0){
            x[i].classList.add('is-invalid');
            valido = false;
        }
        else {
            x[i].classList.add('is-valid');
        }
    };

    if (valido === false){
        alert("Complete los campos");
    }
    else {
        location.href = "inicio.html";
        alert("Su compra fue realizada con éxito!");
    };

};

function disableInput() {
    let x = document.getElementsByName("input");

    let creditCard = document.getElementById("credit-card");

    let cardNumber = document.getElementById("numerito");
    let securityCode = document.getElementById("seguridad");
    let cardExpiration = document.getElementById("vencimiento");

    let accountNumber = document.getElementById("number");

    if (creditCard.checked){
        accountNumber.disabled = true;
        cardNumber.disabled = false;
        securityCode.disabled = false;
        cardExpiration.disabled = false;

        x = document.getElementsByClassName("input");

        x[3].classList.remove('is-invalid');
        x[3].classList.remove('is-valid');
        x[3].value = "";
    }
    else {
        cardNumber.disabled = true;
        securityCode.disabled = true;
        cardExpiration.disabled = true;
        accountNumber.disabled = false;

        for (i=3; i<x.length; i++) {
            x[i].classList.remove('is-invalid');
            x[i].classList.remove('is-valid');
            x[i].value = "";
        }
    };
};









