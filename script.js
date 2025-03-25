const senha = document.querySelector('.senha');
const imgCopiar = document.querySelector('#imgCopiar');
const form = document.querySelector('form');
const inputsCheckbox = Array.from(document.querySelectorAll('input[type=checkbox]'));
const inputTamanho = document.querySelector('#caracteres');
const spanTamanho = document.querySelector('#qtdCaracteres');
const inputMinusculas = document.querySelector('#minus');
const inputMaiusculas = document.querySelector('#maius');
const inputNumeros = document.querySelector('#num');
const inputSimbolos = document.querySelector('#sim');
const btnGerarSenha = document.querySelector('.formulario__botao');

spanTamanho.textContent = inputTamanho.value;
inputTamanho.addEventListener('input', () => {
    spanTamanho.textContent = inputTamanho.value;
})

imgCopiar.addEventListener('click', async function(){
    const senhaTexto = senha.textContent;
    try {
        if (senhaTexto) {
            navigator.clipboard.writeText(senhaTexto);
            alert('Senha copiada');
        } else {
            alert('Nenhuma senha gerada para copiar.');
        }
    } catch(error) {
        console.error('Erro ao copiar a senha: ', error);
        alert('Ocorreu um erro ao copiar a senha.');
    }
});

function GerarSenha(inputMinusculas, inputMaiusculas, inputNumeros, inputSimbolos, tamanhoValor){
    const maiusculas = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const minusculas = "abcdefghijklmnopqrstuvwxyz";
    const numeros = "0123456789";
    const simbolos = "!@#$%^&*()_+{}[]:;<>,.?/~`|\\";

    let caracteres = '';
    if(inputMinusculas) caracteres += minusculas;
    if(inputMaiusculas) caracteres += maiusculas;
    if(inputNumeros) caracteres += numeros;
    if(inputSimbolos) caracteres += simbolos;

    const tamanho = parseInt(tamanhoValor);

    if(tamanho === 0) {
        alert('Insira um tamanho válido');
        return
    } else if(tamanho <= 8){
        alert('Senha curta');
    }

    const senhaGerada = Array.from({ length: tamanho }, () => {
        return caracteres[Math.floor(Math.random() * caracteres.length)];
    }).join(''); 

    return senhaGerada;
}

btnGerarSenha.addEventListener('click', (evento) => {
    evento.preventDefault();
    const algumChecked = inputsCheckbox.some((input) => input.checked);
    if (!algumChecked) {
        alert('Escolha pelo menos uma das opções abaixo');
        return; 
    }

    const tamanhoValor = inputTamanho.value;
    const senhaGerada = GerarSenha(inputMinusculas.checked, inputMaiusculas.checked, inputNumeros.checked, inputSimbolos.checked, tamanhoValor);

    senha.textContent = senhaGerada;
})
