const btnComenzar = document.getElementById('btnComenzar');
const textArea = document.getElementById('textArea');
const content =document.getElementById('content');
const btnFour = document.getElementById('btnFour')
const btnProbar = document.getElementById('probar')
const numNivel = document.getElementById('num')

/* let cuatro = 0;
let avisoDeQueYaHayLosCuatrosCuatros = false */
class Juego{
    constructor(){
        this.instrucciones()
        this.inicializar()
        this.generarNiveles()
        /* this.calculadora() */
        this.siguienteNivel()
        this.subnivel;
    }
   
    instrucciones(){
        let instrucciones = 'Digite una expresión matemática '+
        'que de como resultado el nivel en el que está, solo serán 10 niveles. '+
        'No olvides que para cada nivel debes formular expresiones que usen '+
        'exactamente cuatros números aquellos sólo '+
        'serán cuatros... ! Pásala bien, buena suerte !'
        swal('INSTRUCCIONES',instrucciones,'info');
    }
    inicializar(){
        this.toogleBtnComenzar()
        this.cuatro = 0;
        this.visoDeQueYaHayLosCuatrosCuatros = false;
        this.calculadora();
        if(this.subnivel === 0){
            numNivel.innerHTML = '0'
        }
        else{
            this.subnivel= 0;
            numNivel.innerHTML = this.subnivel+1
        }
        this.crearBtnInstrucciones()
    }
    crearBtnInstrucciones(){
        let crearBtnInstrucciones = document.createElement('button')
        crearBtnInstrucciones.innerHTML = '<i class="fas fa-info-circle" data-info="info"></i>'
        /* crearBtnInstrucciones.classList.add('content__boton'); */
        crearBtnInstrucciones.classList.add('info')
        crearBtnInstrucciones.setAttribute('data-info','info')
        crearBtnInstrucciones.setAttribute('id','info')
        content.appendChild(crearBtnInstrucciones);
    }

    toogleBtnComenzar(){
        if(btnComenzar.classList.contains('hide')){
            btnComenzar.classList.remove('hide')
            btnFour.style.gridRow = "3/span 3"
            this.eliminarBtnBorrar()
            this.eliminarBtnParentesisIzquierdo()
            this.eliminarBtnParentesisDerecho()
        }
        else{
            btnComenzar.classList.add('hide')
            btnFour.style.gridRow = "3/span 2";
            this.crearBtnBorrar()
            this.crearBtnParentesisIzquierdo()
            this.crearBtnParentesisDerecho()
        }
    }

    crearBtnBorrar(){
        let btnBorrar = document.createElement('button')
        btnBorrar.innerHTML = 'Borrar'
        btnBorrar.classList.add('content__boton');
        btnBorrar.classList.add('content__boton--borrar')
        btnBorrar.setAttribute('data-borrar','borrar')
        btnBorrar.setAttribute('id','borrar')
        content.appendChild(btnBorrar);
    }
    crearBtnParentesisIzquierdo(){
        let crearBtnParentesis = document.createElement('button')
        crearBtnParentesis.innerHTML = '('
        crearBtnParentesis.classList.add('content__boton');
        crearBtnParentesis.classList.add('content__boton--parentesis-Izquierdo')
        crearBtnParentesis.setAttribute('data-operacion','parentesisIzquierdo')
        crearBtnParentesis.setAttribute('id','parentesisIzquierdo')
        content.appendChild(crearBtnParentesis);
    }
    crearBtnParentesisDerecho(){
        let crearBtnParentesis = document.createElement('button')
        crearBtnParentesis.innerHTML = ')'
        crearBtnParentesis.classList.add('content__boton');
        crearBtnParentesis.classList.add('content__boton--parentesis-Derecho')
        crearBtnParentesis.setAttribute('data-operacion','parentesisDerecho')
        crearBtnParentesis.setAttribute('id','parentesisDerecho')
        content.appendChild(crearBtnParentesis);
    }

    eliminarBtnBorrar(){
        let btnBorrar= document.getElementById('borrar');
        content.removeChild(btnBorrar)
    }
    eliminarBtnParentesisIzquierdo(){
        let parentesisIzquierdo= document.getElementById('parentesisIzquierdo');
        content.removeChild(parentesisIzquierdo)
    }
    eliminarBtnParentesisDerecho(){
        let parentesisDerecho= document.getElementById('parentesisDerecho');
        content.removeChild(parentesisDerecho)
    }
    
    generarNiveles(){
        this.numeroDeNiveles = 10;
        this.niveles=[];
        for(let i=0;i<this.numeroDeNiveles;i++){
            this.niveles[i] = i+1;
        }
    }

    calculadora(){
        /* if(!content) return */
        let that = this;

        content.addEventListener('click',(e)=>{
            const t = e.target,
                  d = t.dataset;

            /* console.log(d);  */        //PRUEBAAAAAA DE TARGETT
    
            /*Comprobar si es un numero*/
            if(d.num){
                writeFour(this.cuatro)
            }

            /*Comprobar si es una operacion*/
            if(d.operacion){
                writeOperation(d.operacion);
            }
           
            /*Comprobar si se borra*/
            if(d.borrar){
                borrar()
            }

            /*Darle un listener al boton info */
            if(d.info){
                this.instrucciones()
            }
        })

        function writeFour(numCuatro){
            if(numCuatro>4) return      //ME ASEGURO QUE SE BOLQUEE EL CONTADOR
                                        //CUANDO NO ESTA EN EJUEGO
            if(textArea.textContent === '' ){
                textArea.textContent = '4' 
                that.cuatro++
            }
            else
            {
                if(numCuatro < 4){
                    textArea.textContent += '4'
                    that.cuatro++
                    that.avisoDeQueYaHayLosCuatrosCuatros = false;
                }
                if(that.cuatro === 4){
                    that.avisoDeQueYaHayLosCuatrosCuatros = true
                }
            }
        }

        function writeOperation(operacion){
            let contenido = textArea.textContent;
            if(operacion === 'parentesisIzquierdo'){
                textArea.textContent += '('
                return
            }
            else if(operacion === 'parentesisDerecho')
            {
                textArea.textContent += ')'
                return
            }
            function convertirASigno(operacion){
                switch(operacion){
                    case 'suma':
                        return '+';
                    break;
                    case 'resta':
                        return '-';
                    break;
                    case 'multiplicacion':
                        return '*';
                    break;
                    case 'division':
                        return '/';
                    break;
                }
            }
            function comprobarElUltimoCaracterEsUnSigno(ultimoCaracter){
                if(ultimoCaracter === '+' || ultimoCaracter === '-' || ultimoCaracter === '*' || ultimoCaracter === '/'){
                    return true
                }
            }
            if(textArea.textContent === '' || comprobarElUltimoCaracterEsUnSigno(contenido.charAt(contenido.length -1)) || that.avisoDeQueYaHayLosCuatrosCuatros) return
            
            textArea.textContent += convertirASigno(operacion);
        }

        function borrar(){
            if(textArea.textContent.charAt(textArea.textContent.length - 1) === '4'){
                that.cuatro--;
                that.avisoDeQueYaHayLosCuatrosCuatros = false
            }
            textArea.textContent = textArea.textContent.slice(0, -1);
        }
    }
    siguienteNivel(){
        this.agregarEventoAlBtnProbar()
    }
    agregarEventoAlBtnProbar(){
        btnProbar.addEventListener('click',this.comprobarRespuesta.bind(this))
    }
    comprobarRespuesta(){
        let resultadoDelUsuario
        if(this.cuatro>4)return         //ME ASEGURO QUE SE BOLQUEE EL CONTADOR
                                        //CUANDO NO ESTA EN EJUEGO
        //Comprobar si el usuario uso todos los 4
        if(textArea.textContent === '') {
            swal('Escriba una expresión','Este campo no puede estar vacío','info')
            return
        }
        else if(this.cuatro != 4){
            if(this.cuatro === 3){
                swal('Debe usar cuatro números',`Quedan ${4 - this.cuatro} cuatro por usar`,'warning')
            }
            else{
                swal('Debe usar cuatro números',`Quedan ${4 - this.cuatro} cuatros por usar`,'warning')
            }
            return
        }
        //Calcular el resultado del usuario
        try
        {
            resultadoDelUsuario = eval(textArea.textContent)

            if(resultadoDelUsuario === this.niveles[this.subnivel]){
                this.subnivel++;
                //LLEGO AL FINALLL
                if(this.subnivel === this.numeroDeNiveles){
                    swal('Felicidades, has ganado!!','Gracias por jugarlo','success')
                    textArea.textContent = ''
                    this.subnivel = 0;
                    this.inicializar()
                    this.cuatro = 5;
                    setTimeout(() => {
                        location.reload()
                    }, 2200);
                }
                //SUBIR DE NIVELLL
                else{
                    numNivel.innerHTML = this.niveles[this.subnivel];
                    textArea.textContent = ''
                    this.cuatro = 0;
                    this.avisoDeQueYaHayLosCuatrosCuatros = false
                }
            }
            else
            {
                swal('Respuesta incorrecta',`Su respuesta debe ser: ${this.niveles[this.subnivel]}`,'error')
            }
        }
        catch(error){
            /* console.error(error) */
            swal('UUUPS!! Esta expresión es inválida',"Reformule una nueva",'error')
        }
        
    
        
        
       
        
    }
}

function comenzarJuego(){
    let juego = new Juego();
}

btnComenzar.addEventListener('click',comenzarJuego);