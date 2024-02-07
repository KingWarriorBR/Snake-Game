const auxiliar = require('./auxiliar')

//Constantes de movimentação
const NORTE = [0,-1]
const SUL = [0,1]
const LESTE = [1,0]
const OESTE = [-1, 0]

//Estado
const estado = () => ({
    linha: 14,
    coluna: 20,
    snake: [[10,12]],
    apple: {x : 10 , y: 10},
    move: [NORTE],
    derrota: false
})

//Gerar apple
const gerarApple = obj => {
    let posicao = auxiliar.posicaoRnd(obj.coluna,obj.linha)
    auxiliar.filtrar(posicao, obj.snake) > 0 ? gerarApple(obj) : 
    (obj.apple.x = posicao[0],obj.apple.y = posicao[1])
}
//Coletar apple
const coletar = obj => {
    obj.snake.unshift(auxiliar.somaPontos(obj.snake[0],obj.move[0]))
    gerarApple(obj)
    return obj
}

//Detectar se está fora do limite do campo
const detectarLimite = obj => obj.snake[0][0] > obj.coluna ||  obj.snake[0][0] < 1 ||
                       obj.snake[0][1] > obj.linha || obj.snake[0][1] < 1? true : false



//Mudar movimento
const mudarMovimento = (obj,movi=obj.move) => {
    obj.move.push(movi)
    obj.move.shift()
    return obj
}

//Verificar se so deve mudar de posição ou coletar apple
const movimentar = obj => {
    let p = auxiliar.somaPontos(obj.move[0], obj.snake[0]);
    let a = [obj.apple.x,obj.apple.y]
    switch(auxiliar.pontosIguais(p,a)){
        case true: return coletar(obj)
        case false: 
            obj.snake = auxiliar.adcionarEExcluir(p, obj.snake)
            return obj
    }    
}
//Verificar se perdeu
const verificarDerrota = (obj) => detectarLimite(obj) || auxiliar.colisao(obj.snake) ? true : false

//Gera o campo do jogo.
const  gerarCampo = (numLinhas , numColunas) => {
    let linhas = []
    for (let i = 0; i < numLinhas; i++){
        let coluna = []
        for(let i = 0; i < numColunas; i++){
            coluna.push('.')
        }
        linhas.push(coluna)
    }
    return linhas
}

//Insere # em todo array quando se perde o jogo
const derrota = array => array.map(n => n.map(x => x = '#')) 

//Insere a snake
const inserirSnake = (snake,campo) => {
   for ( let i in snake){
    let x = snake[i][0]
    let y = snake[i][1]
    campo[y][x] = 'X'
   }
   return campo 
}

//Inserr a apple
const inserirApple = (apple,campo) => {
    let x = apple.x
    let y = apple.y
    campo[y][x] =  'O'
    return campo
}

//Insere elementos do jogo no campo do jogo
const inserirElem = obj => {
    let campo = gerarCampo(obj.linha,obj.coluna)
    campo = inserirApple(obj.apple,campo)
    campo = inserirSnake(obj.snake,campo)
    obj.derrota ? derrota(campo) : campo
    return campo      
}
//Verificar se perdeu para poder inserir elementos
const verificarInserir = obj =>{
    let campoErro = gerarCampo(14,20)
    obj.derrota ? derrota(campoErro) : inserirElem(obj)
}
//Função que imprime o jogo
const imprimirEstado = (estado) => {
    console.clear()
    let campo = inserirElem(estado)
    for(let i in campo){
        console.log(campo[i].join(''))
    } return ''
}

//Novo estado 
const novoEstado = obj => verificarDerrota(obj) ? estado(): movimentar(obj) 




module.exports = {NORTE , SUL , LESTE ,OESTE ,estado ,movimentar, novoEstado ,mudarMovimento ,verificarDerrota, verificarInserir,imprimirEstado}

