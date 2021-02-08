let names = ["alvaro ramos", "fede gomez", "luna gomez", "Yara gomez", "Vera Martinez"];
let ages = [31, 60, 35, 32, 1];
let obj = { name: "Maite", surname: "Saiz", age: 60 };
let People = [];
let People_less18 = [];
let People_grt18 = [];
let Parents = [];


//funcion que se ejecuta al cargar la pagina, genera la lista de nombres ya almacenados en el array, 
//y crea el evento "click" para que cada vez que pulse el boton "submit de HTML" inserte el nuevo elemento.
window.onload = function () {
    //Generar un evento click cada vez que se pulse boton "save" para guardar una persona nueva
    const InputButtonSubmit = document.getElementById("InputButton");
    InputButtonSubmit.addEventListener("click", f_GetHTMLInput)
    f_ShowList(names, ages);

}

//Funcion que obtiene el nombre y edad introducido en HTML y llama a la funcion que lo introduce en la lita

function f_GetHTMLInput() {

    const InputName = document.querySelector("#InputName");
    if (InputName.value!= "" && InputAge.value>0) {
        names.push(InputName.value);
        const InputAge = document.getElementById("InputAge");
        ages.push(InputAge.value);
        f_PeopleListGenerator(InputName.value, InputAge.value);
    }
    console.log(InputName.value);
        console.log(InputAge.value);
}


//Funcion que convierte nombre, apellido , edad en un objeto con las claves {name:"",surname:"",age:""}, 
//los guada en el array People y luego los separa en otros dos arrays en funcion de la edad (>18)
function f_PeopleListGenerator(CompleteName, age) {

    let Fullname = f_fistletterToUpperCase(CompleteName);
    let name = Fullname[0];
    let surname = Fullname[1];

    People.push({ name: name, surname: surname, age: age });

    if (age < 18) {
        People_less18.push({
            lss18: "",
            name: name,
            surname: surname,
            age: age
        });
        SetInHTML(name, surname, age, "#less18List");
    }

    else {
        People_grt18.push({
            grt18: "",
            name: name,
            surname: surname,
            age: age
        });
        SetInHTML(name, surname, age, "#grt18List");
    }

    SetInHTML(name, surname, age, "#mainList")

}

//Funcion que divide string Nombre+Apellido en dos elementos independientes, 
//los convierte a minusculas y luego pone la primera letra mayuscula
function f_fistletterToUpperCase(string) {
    let StringToLowerCase = string.toLowerCase();
    let SplitName = StringToLowerCase.split(" ");
    let SplitName_Upper = [];

    for (let i = 0; i < SplitName.length; i++) {
        SplitName_Upper[i] =
            SplitName[i].charAt(0).toUpperCase() + SplitName[i].slice(1);
    }
    return SplitName_Upper;
}


//Funcion que se llama al cargar la pagina para cargar los elementos almacenados en el array People.
function f_ShowList(names, ages) {
    for (let i = 0; i < names.length; i++) {
        f_PeopleListGenerator(names[i], ages[i]);
    }
    f_DetectParent();
    console.log(Parents);
}


//Funcion que detecta descendientes, y añade a los padres un array que contenga a sus descendientes
function f_DetectParent() {

    for (let i = 0; i < People.length; i++) {
        let checkSurname = People[i].surname;
        let father = People[i];
        father.children = [];
        let isFather = false;

        for (let j = 0; j < People.length; j++) {
            let checkAge = 0;
            checkAge = People[i].age - People[j].age;
            if (checkSurname == People[j].surname && checkAge > 20) {
                father.children.push({ name: People[j].name, age: People[j].age })
                isFather = true;
            }
        }
        if (isFather) {
            Parents.push(father);
        }
    }
}


//Funcion que inserta una lista los objetos dentro de una lista en HTML
function SetInHTML(name, surname, age, id) {
    let NameList = document.createElement("tr");
    //<td id= "${name} ${surname}" type="button" data-toggle="modal" data-target="#exampleModal" data-whatever="${name} ${surname} : ${age} years">
    NameList.innerHTML = `
   <td id= "${name}" type="button" data-toggle="modal" data-target="#exampleModal" data-whatever="${name} ${surname} : ${age} years">
   
        ${name} 
    </td>    
            <td> ${surname}   </td>
            <td> ${age}   </td>`
    let HTMLList = document.querySelector(id);
    HTMLList.appendChild(NameList);
}


//funcion que recibe los datos desde el boton donde se lanza el modal y modifica su contenido

$('#exampleModal').on('show.bs.modal', function (event) {
    var button = $(event.relatedTarget) // Button that triggered the modal
    var recipient = button.data('whatever') // Extract info from data-* attributes
    // If necessary, you could initiate an AJAX request here (and then do the updating in a callback).
    // Update the modal's content. We'll use jQuery here, but you could use a data binding library or other methods instead.
    var modal = $(this)
    modal.find('.modal-title').text(recipient)

    //boton Delete
    const ModalButtonDelete = document.getElementById("ModalDeleteButton");
    ModalButtonDelete.addEventListener("click", () => {

        let Fullname = f_fistletterToUpperCase(recipient);
        let name = Fullname[0];
        let surname = Fullname[1];

        for (let i = 0; i < People.length; i++) {
            if (People[i].name == name && People[i].surname == surname) {
                People.splice(i, 1);
                id = "#" + name;
                //id = "#"+name+" "+surname;
                console.log(id);
                let getchild = document.querySelectorAll(id);
                getchild[0].parentElement.remove();
                getchild[1].parentElement.remove();
            }
        }
    })
})

/*
//Dado un objeto introducirlo en la lista HTML
function f_objectToHTML(p_obj) {
    let name = p_obj.name;
    let surname = p_obj.surname;
    let age = p_obj.age;
    SetInHTML(name, surname, age, "#mainList");
}
(f_objectToHTML(obj));*/