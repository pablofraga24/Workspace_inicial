const inpFile = document.getElementById("inpFile");
const previewContainer = document.getElementById("image-preview");
const previewImage = previewContainer.querySelector(".image-preview__image");
const previewDefaultText = previewContainer.querySelector(".image-preview__default-text");
let firstName = document.getElementById("firstName");
let secondName = document.getElementById("secondName");
let firstSurname = document.getElementById("firstSurname");
let secondSurname = document.getElementById("secondSurname");
let age = document.getElementById("age");
let email = document.getElementById("email");
let contactNumber = document.getElementById("contactNumber");
let data = {};

//Guardo los datos del perfil utilizando localStorage
function guardarDatos() {
    data.firstName = firstName.value;
    data.secondName = secondName.value;
    data.firstSurname = firstSurname.value;
    data.secondSurname = secondSurname.value;
    data.age = age.value;
    data.email = email.value;
    data.contactNumber = contactNumber.value;
    data.img = previewImage.src;

    localStorage.setItem("data", JSON.stringify(data));
};

function mostrarDatos() {
    let dataReceived = JSON.parse(localStorage.getItem("data"));

    if (dataReceived !== null) {
        firstName.value = dataReceived.firstName;
        secondName.value = dataReceived.secondName;
        firstSurname.value = dataReceived.firstSurname;
        secondSurname.value = dataReceived.secondSurname;
        age.value = dataReceived.age;
        email.value = dataReceived.email;
        contactNumber.value = dataReceived.contactNumber;

        if(dataReceived.img !== null) {
            previewDefaultText.style.display = "none";
            previewImage.style.display = "inline";
            previewContainer.style.border = "none";
            previewImage.src = dataReceived.img;
        };
    };
};

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {
    mostrarDatos();
});

inpFile.addEventListener("change", function() {
    const file = this.files[0];

    if (file) {
        const reader = new FileReader();

        previewDefaultText.style.display = "none";
        previewImage.style.display = "inline";
        previewContainer.style.border = "none";

        reader.addEventListener("load", function() {
            previewImage.setAttribute("src", this.result);
        });

        reader.readAsDataURL(file);
    } else {
        previewDefaultText.style.display = null;
        previewImage.style.display = null;
        previewImage.setAttribute("src", "");
    };
});