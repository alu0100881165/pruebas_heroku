function validar_formulario(){
  
  var nombre = document.getElementById("nombre").value;
  var v_email = /\w\w+@\w\w\w+\.[a-z][a-z]+/;
  var email=document.getElementById("e_mail").value;
  
  if(nombre === ""){
    alert("Error al escribir el nombre");
    return false;
  } 
  
  else if (!v_email.test(email)){
    alert("La dirección de e_mail " + email + " no es válida");
    return false;
  }
  
  return true;
}