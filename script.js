//Dados iniciais

let quadro = {
    a1: '',a2: '',a3: '',
    b1: '',b2: '',b3: '',
    c1: '',c2: '',c3: ''
};

let vez = '';

let msg = '';

let rodando = false;


//Eventos

document.querySelector('.reset').addEventListener('click', reset);
document.querySelectorAll('.item').forEach(item =>{
    item.addEventListener('click', itemClick);
});

 reset();
//Funções 

function itemClick(event){
    let item = event.target.getAttribute('data-item');
    console.log(item);
    if(rodando && quadro[item]===''){
        quadro[item] = vez;
        renderQuadro();
        alternarJogador();
    }
}

function reset (){
    msg = '';
    let aleatorio = Math.floor(Math.random() * 2);
    vez = (aleatorio === 0) ? 'x' : 'o';
    
    /*if(aleatorio === 0){
        vez = 'X';
    }else{
        vez = 'O'
    }*/

    for(let i in quadro){
        quadro[i] = '';
    }

    rodando = true;

    renderQuadro();
    renderInfo();
}

function renderQuadro(){
    for(let i in quadro){
        let item = document.querySelector(`div[data-item=${i}]`);
        item.innerHTML = quadro[i];

    }

    checkJogo();

}

function renderInfo(){
    document.querySelector('.vez').innerHTML = vez;
    document.querySelector('.resultado').innerHTML = msg;
}

function alternarJogador(){
    if(vez === 'x'){
        vez = 'o'
    }else{
        vez = 'x';
    }
    renderInfo();
}

function checkJogo(){
    if(checkGanhadorFor('x')){
        msg = 'O "X" venceu!';
        rodando = false;
    }else if(checkGanhadorFor('o')){
        msg = 'O "O" venceu!';
        rodando = false;
    }else if(isFull()){
        msg = 'Deu empate';
        rodando = false;
    }
}

function checkGanhadorFor(vez){
    let pos = [
        'a1,a2,a3',
        'b1,b2,b3',
        'c1,c2,c3',

        'a1,b1,c1',
        'a2,b2,c2',
        'a3,b3,c3',

        'a1,b2,c3',
        'a3,b2,c1'
    ];

    for(let w in pos){
        let pArray = pos[w].split(',');
        let hasWon = pArray.every(option => quadro[option] === vez);
        if(hasWon){
            return true;
        }
    }return false;
}

function isFull(){
    for(let i in quadro){
        if(quadro[i] === ''){
            return false;
        }
    }return true;
}