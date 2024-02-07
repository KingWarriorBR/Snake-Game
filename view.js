const readline = require('readline');
const Snake = require('./snake')

let Estado = Snake.estado()

readline.emitKeypressEvents(process.stdin);
process.stdin.setRawMode(true);
process.stdin.on('keypress', (str, key) => {
  if (key.ctrl && key.name === 'c') process.exit()
  switch (key.name.toUpperCase()) {
    case 'W': case 'K': case 'UP':    Estado = Snake.mudarMovimento(Estado, Snake.NORTE); break
    case 'A': case 'H': case 'LEFT':  Estado = Snake.mudarMovimento(Estado, Snake.OESTE);  break
    case 'S': case 'J': case 'DOWN':  Estado = Snake.mudarMovimento(Estado, Snake.SUL); break
    case 'D': case 'L': case 'RIGHT': Estado = Snake.mudarMovimento(Estado, Snake.LESTE);  break
  }
});

const atualizar = () => {
  Estado = Snake.novoEstado(Estado)
  return Estado
}

setInterval(() => {atualizar(),Snake.imprimirEstado(Estado) }, 500)

