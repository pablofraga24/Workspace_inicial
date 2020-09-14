var product = {};
var comment = {};
const comentarios = [];
const formulario = document.getElementById('formulario');

//AQUÍ SE ALMACENARÁ LA FECHA Y HORA DEL COMENTARIO

var fecha = new Date();
var dia = fecha.getDate();
var mes = fecha.getMonth() + 1;
var año = fecha.getFullYear();
var hora = fecha.getHours();
var minutos = fecha.getMinutes();
var segundos = fecha.getSeconds();
var fechaCompleta = año + "-" + mes + "-" + dia;
var horaCompleta = hora + ":" + minutos + ":" + segundos;
var fechaYHora = fechaCompleta + " " + horaCompleta;

//-------------------------------------------------------------------------------------

function showImagesGallery(array){

    let htmlContentToAppend = "";

    for(let i = 0; i < array.length; i++){
        let imageSrc = array[i];

        htmlContentToAppend += `
        <div class="col-lg-3 col-md-4 col-6">
            <div class="d-block mb-4 h-100">
                <img class="img-fluid img-thumbnail" src="` + imageSrc + `" alt="">
            </div>
        </div>
        `

        document.getElementById("productImagesGallery").innerHTML = htmlContentToAppend;
    }
}

function agregarComentario(comentario, puntos) {
    let coment = {}
    coment.comentario = comentario;
    coment.puntos = puntos;

    comentarios.push(coment);
}

function mostrar() {

    document.getElementById('comentarios').innerHTML =``;
    for (let coment of comentarios) {
        document.getElementById('comentarios').innerHTML += `<p> <strong> ${usuario} </strong> - ${fechaYHora} - Puntuación: ${coment.puntos} <span> </p> <p> ${coment.comentario} <span> </p> <hr class="my-3">`;
    }
}

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(PRODUCT_INFO_URL).then(function(resultObj){
        if (resultObj.status === "ok")
        {
            product = resultObj.data;

            let productNameHTML  = document.getElementById("productName");
            let productPriceHTML = document.getElementById("productPrice");
            let productDescriptionHTML = document.getElementById("productDescription");
            let productCountHTML = document.getElementById("productsSold");
        
            productNameHTML.innerHTML = product.name;
            productPriceHTML.innerHTML = product.currency + " " + product.cost;
            productDescriptionHTML.innerHTML = product.description;
            productCountHTML.innerHTML = product.soldCount;

            //Muestro las imagenes en forma de galería
            showImagesGallery(product.images);
        }
    });

    getJSONData(PRODUCT_INFO_COMMENTS_URL).then(function(resultObj){
        if (resultObj.status === "ok")
        {
            comment = resultObj.data;

            //RECORDATORIO: REDUCIR LAS SIGUIENTES LÍNEAS UTILIZANDO FOR (SI SE PUEDE)

            let comment1UserHTML  = document.getElementById("comment1User");
            let comment1DescriptionHTML = document.getElementById("comment1Description");
        
            comment1UserHTML.innerHTML = '<strong>' + comment[0].user + '</strong>' + " - " + comment[0].dateTime + " - Puntuación: " + comment[0].score;
            comment1DescriptionHTML.innerHTML = comment[0].description;

            let comment2UserHTML  = document.getElementById("comment2User");
            let comment2DescriptionHTML = document.getElementById("comment2Description");
        
            comment2UserHTML.innerHTML = '<strong>' + comment[1].user + '</strong>' + " - " + comment[1].dateTime + " - Puntuación: " + comment[1].score;
            comment2DescriptionHTML.innerHTML = comment[1].description;

            let comment3UserHTML  = document.getElementById("comment3User");
            let comment3DescriptionHTML = document.getElementById("comment3Description");
        
            comment3UserHTML.innerHTML = '<strong>' + comment[2].user + '</strong>' + " - " + comment[2].dateTime + " - Puntuación: " + comment[2].score;
            comment3DescriptionHTML.innerHTML = comment[2].description;

            let comment4UserHTML  = document.getElementById("comment4User");
            let comment4DescriptionHTML = document.getElementById("comment4Description");
        
            comment4UserHTML.innerHTML = '<strong>' + comment[3].user + '</strong>' + " - " + comment[3].dateTime + " - Puntuación: " + comment[3].score;
            comment4DescriptionHTML.innerHTML = comment[3].description;
        }
    });
});

formulario.addEventListener('submit', function(e) {
    e.preventDefault();

    let comentarios1 = document.getElementById('comentario').value;
    let puntos1 = document.getElementById('puntos').value;
    
    agregarComentario(comentarios1, puntos1);
    mostrar();
})