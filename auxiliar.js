//Testa se os pontos são iguais
const pontosIguais = ([x,y],[w,z]) => x === w && y === z ? true : false

//Soma pontos
const somaPontos = ([x,y],[w,z]) => [x+w,y+z]

//Valores randon dentro no limite do campo
const numAleatorio = (min = 0,max) => Math.floor(Math.random() * (max - min) + min)

//Adciona um novo elemento no array e retira o ultimo elemnto.
const adcionarEExcluir = (ponto,array) => [ponto].concat(array.slice(0,-1))

//Filtrar elemenetos iguais dentro do array e dizaer a quantidade
const filtrar = (ponto,array) => array.filter(n => pontosIguais(n,ponto)).length

//Detectar se ouve colisão na snake.
const colisao = array => {
    let head = array[0]
    return filtrar(head,array.slice(1)) > 0 ? true : false
} 

//Gerar nova posição
const posicaoRnd = (n1,n2) => [numAleatorio(0,n1),numAleatorio(0,n2)]

module.exports = {pontosIguais, somaPontos, numAleatorio, adcionarEExcluir, colisao, posicaoRnd, filtrar}


