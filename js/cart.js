let comissionPercentage = 0.15;

//Función que se utiliza para validar el tipo de pago
function validate(){
    let creditCard = document.getElementById("credit-card");
    let bankTransference = document.getElementById("bank-transference");

    let targetNumber = document.getElementById("numerito").value;
    let securityCode = document.getElementById("seguridad").value;
    let targetExpiration = document.getElementById("vencimiento").value;

    let accountNumber = document.getElementById("number").value;

    if (bankTransference.checked && accountNumber == ""){
        alert("Por favor ingrese el número de su cuenta bancaria");
        return false;
    }
    if ((creditCard.checked) && ((targetNumber == "") || securityCode == "" || targetExpiration == "")){
        alert("Por favor ingrese los datos de su tarjeta de crédito");
        return false;
    }
    else {
        alert("Su método de pago fue ingresado con éxito!");
        return true;
    }
};

//Función que se utiliza para actualizar los costos de envío
function actualizarEnvio(){
    let comissionCostHTML = document.getElementById("comissionText");
    let totalCostHTML = document.getElementById("totalCostText");

    let comissionToShow = (Math.round(actualizarSubtotal() * comissionPercentage * 100) / 100);

    comissionCostHTML.innerHTML = comissionToShow;

    return comissionToShow;
};

function actualizarSubtotal(){
    var dolares = cart.articles[0].unitCost / 40;

    let cantidad1 = document.getElementById("article0").value;
    let cantidad2 = document.getElementById("article1").value;

    let subtotal1 = document.getElementById("subtotal0");
    let subtotal2 = document.getElementById("subtotal1");

    subtotal1.innerHTML = carro[0].currency + " " + cantidad1 * carro[0].unitCost;
    subtotal2.innerHTML = carro[1].currency + " " + cantidad2 * carro[1].unitCost;

    let subtotal = document.getElementById("productCostText");
    let subtotalNumerico = cantidad1 * dolares + cantidad2 * cart.articles[1].unitCost;

    subtotal.innerHTML = subtotalNumerico;

    return subtotalNumerico;
};

function actualizarTotal(){
    let total = document.getElementById("totalCostText");

    total.innerHTML = (actualizarSubtotal() + actualizarEnvio()).toFixed(2); 
}

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
//document.addEventListener("DOMContentLoaded", function(e){

//});
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
            
            var HTML = `<table style="width: 70%" cellspacing="0">
            <tr>
            <th></th>
            <th>Nombre</th> 
            <th>Costo</th> 
            <th>Cantidad</th> 
            <th>Subtotal</th> 
            </tr>`

      
          for (i=0; i<carro.length; i++){
            HTML +=`<tr><td><img src="` + carro[i].src + `" alt=""  width=50></td>
            <td> ${carro[i].name} </td>
            <td> ${carro[i].currency + ' ' + carro[i].unitCost} </td>
            <td> <input type="number" id="article${i}" name="quantity" min="1" value="${carro[i].count}" onchange ="actualizarSubtotal(); actualizarEnvio(); actualizarTotal();"></td>
            <td> <strong id="subtotal${i}">${carro[i].currency + ' ' + carro[i].count * carro[i].unitCost} </strong> </td>
            </tr>
            `
        }
        
        HTML += `</table>`
        
        let articulo1 = document.getElementById("cart-container");

        articulo1.innerHTML = HTML;
      
        actualizarSubtotal();
        actualizarEnvio();
        actualizarTotal();
        }
    });
});








