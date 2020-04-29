const btnComenzar = document.getElementById('btnComenzar');
const textArea = document.getElementById('textArea');
const content =document.getElementById('content');
const btnProbar = document.getElementById('probar')
const numNivel = document.getElementById('num')

class Juego{
    constructor(){
        this.inicializar()
        this.generarRespuestas()
        this.calculadora()
        this.siguienteNivel()
        this.cambiarNivel
    }
    /* cambiarNivel(){
        this.subnivel++;
    } */
    inicializar(){
        btnComenzar.classList.add('hide');
        this.crearBtnBorrar();
        this.subnivel = 0;
        numNivel.innerHTML = this.subnivel+1
    }
    crearBtnBorrar(){
        var btnBorrar = document.createElement('button')
        btnBorrar.innerHTML = 'Borrar'
        btnBorrar.classList.add('content__boton');
        btnBorrar.classList.add('content__boton--borrar')
        btnBorrar.setAttribute('data-borrar','borrar')
        content.appendChild(btnBorrar);
    }
    generarRespuestas(){
        this.numeroDeNiveles = 1;

        this.niveles=[];
        for(let i=0;i<this.numeroDeNiveles;i++){
            this.niveles[i] = i+1;
        }
    }
    calculadora(){
        function contarCuatro(){

        }
        function writeFour(){
            textArea.textContent === ''
            ?textArea.textContent = '4' 
            :textArea.textContent += '4';
        }

        function writeOperation(operacion){
            let contenido = textArea.textContent;
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
            function comprobarElUltimoCaracter(ultimoCaracter){
                if(ultimoCaracter === '+' || ultimoCaracter === '-' || ultimoCaracter === '*' || ultimoCaracter === '/'){
                    return true
                }
            }
            
            if(textArea.textContent === '' || comprobarElUltimoCaracter(contenido.charAt(contenido.length -1))) return
            
            textArea.textContent += convertirASigno(operacion);
        }

        function calcularResultado(){
            let contenido = textArea.textContent
            let ultimoCaracter = contenido.charAt(contenido.length -1);

            if(ultimoCaracter === '4'){
                var expresionMatematica = eval(textArea.textContent)
                return expresionMatematica
                console.log(expresionMatematica);
                siguienteNivel();
            }
            else
            {
                console.log('expresion no valida')
            }
            
        }

        function borrar(){
            textArea.textContent = textArea.textContent.slice(0, -1);
        }
        /*FUNCION PRINCIPAL*/
        function calculadora(){
            if(!content) return
            content.addEventListener('click',(e)=>{
                const t = e.target,
                      d = t.dataset;
                      console.log(d);
                /*Comprobar si es un numero*/
                if(d.num){
                    writeFour()
                }
                /*Comprobar si es una operacion*/
                if(d.operacion){
                    writeOperation(d.operacion);
                }
                /* btnProbar.addEventListener('click',()=>{
                    console.log('kk')
                })
                if(d.probar){
                    
                    t.addEventListener('click',()=>{
                        console.log('kk')
                    })
                    let resultadoDelUsuario = calcularResultado()
                    siguienteNivel(resultadoDelUsuario);
                } */
                if(d.borrar){
                    borrar()
                }
            })
        }
        let resultadoDelUsuario = calculadora();
        function siguienteNivel( resultadoDelUsuario){
            if(!resultadoDelUsuario) return
            console.log(Juego.niveles)
            /* if(resultadoDelUsuario === Juego.niveles[3]){
                console.log('aqui estoy')
            } */
        }
    }
    siguienteNivel(){
        this.agregarEventoAlBtnProbar()
    }
    agregarEventoAlBtnProbar(){
        btnProbar.addEventListener('click',this.comprobarRespuesta.bind(this))
    }
    comprobarRespuesta(){
        
        function calcularResultado(){
            let contenido = textArea.textContent
            let ultimoCaracter = contenido.charAt(contenido.length -1);

            if(ultimoCaracter === '4'){
                var expresionMatematica = eval(textArea.textContent)
                return expresionMatematica
                console.log(expresionMatematica);
                siguienteNivel();
            }
            else
            {
                console.log('expresion no valida')
            }
            
        }
        let resultadoDelUsuario = calcularResultado()
        if(!resultadoDelUsuario) return
        console.log(this.niveles);
        if(resultadoDelUsuario === this.niveles[this.subnivel]){
            console.log('bien')
            this.subnivel++;
            if(this.subnivel === this.numeroDeNiveles){
                console.log('Llego al final')
                this.inicializar()
            }
            else{
                console.log(this.niveles[this.subnivel]);
                num.innerHTML = this.niveles[this.subnivel];
                textArea.textContent = ''
            }
            
        }
        
    }
}

function comenzarJuego(){
    var juego = new Juego();
}

btnComenzar.addEventListener('click',comenzarJuego);