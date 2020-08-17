/**variables */
const email = document.getElementById('email');
const asunto = document.getElementById('asunto');
const mensaje = document.getElementById('mensaje');
const btnEnviar =  document.getElementById('enviar');
const formEnviar =  document.getElementById('enviar-mail');
const btnReset =  document.getElementById('resetBtn');

/**event listener */
eventListener();


function eventListener(){
    /**Al cargar la app el btnEnviar estara deshabilitado */
    document.addEventListener('DOMContentLoaded', inicioApp);


    /**campos del formulario 
     * blur El evento blur es disparado cuando un elemento ha perdido su foco
     * https://developer.mozilla.org/es/docs/Web/Events/blur
    */
    email.addEventListener('blur', validarCampo);
    asunto.addEventListener('blur', validarCampo);
    mensaje.addEventListener('blur', validarCampo);

    /**Boton de enviar en el submit */
    formEnviar.addEventListener('submit', enviarEmail);

    /**Boton de reset */
    btnReset.addEventListener('click', resetForm);

}



/**funciones */

/**Deshabilitando el btnEnviar */
function inicioApp(){
    btnEnviar.disabled = true;
}

/**Valida que el campo tenga algo escrito */
function validarCampo(){
    /**Validando la logintud del texto y que no este vacio */
    validarLogintud(this);

    /**Validar formato de email */
    if (this.type == 'email') {//id => email 
        validarFormatoEmail(this);
    }


    let errores = document.querySelectorAll('error');

    if (email.value !== '' && asunto.value !== '' && mensaje.value !== '') {
        if (errores.length === 0) {
            btnEnviar.disabled = false;
        }
    }
}

function validarLogintud(campo){
    if (campo.value.length >0) {
        campo.style.borderBottomColor = 'green';
        campo.classList.remove('error');
    }else{
        campo.style.borderBottomColor = 'red';
        campo.classList.add('error');
    }
}

function validarFormatoEmail(campo){
    const mensaje = campo.value;
    /**
     * El método indexOf() retorna el primer índice en el que se puede encontrar un elemento dad
     *  en el array, ó retorna -1 si el elemento no esta presente.
     * https://developer.mozilla.org/es/docs/Web/JavaScript/Referencia/Objetos_globales/Array/indexOf
     */
    
    if (mensaje.indexOf('@')!== -1) {
        campo.style.borderBottomColor = 'green';
        campo.classList.remove('error');
    }else{
        campo.style.borderBottomColor = 'red';
        campo.classList.remove('error');
    }
}


function enviarEmail(e){
    /**Muesta el spinner al presionar el btnEnviar */
    const spinnerGif = document.querySelector('#spinner');
    spinnerGif.style.display = 'block';

    /**Gif que envia el email */
    const enviado = document.createElement('img');
    enviado.src = 'img/mail.gif';
    enviado.style.display = 'block';

    /**Ocultando spinner y muestra git de enviando */
    setTimeout(function(){
        spinnerGif.style.display = 'none';
        document.querySelector('#loaders').appendChild(enviado);

        /**Ocultando el git de enviado despues de 5 seg y reseteando el formulario*/
        setTimeout(function(){
            enviado.remove();
            formEnviar.reset();
        }, 5000);

    }, 3000);/**Milisegundos */
    e.preventDefault();
}

function resetForm(e){
    formEnviar.reset();
    e.preventDefault();
}