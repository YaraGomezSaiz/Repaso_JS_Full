
//como generar un objeto pasando la clave como parametro

let names=['yara','alvaro','fede'];
let array=[];
let key="name";

for(let i=0;i<names.length;i++){

let obj={}; // es muy importante que obj este definido ahi, porque si no apuntaría siempre a la utlima posicion -variable por referencia
obj[key]=names[i];
array[i]=obj;

}

console.log(array);

