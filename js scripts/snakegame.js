let canvas = document.getElementById("snakeboard");                 // Criação da variável 'canvas' que representa um chamado do elemento HTML '<canvas>' pelo  seu id 'snakeboard'.
let context = canvas.getContext("2d");                              // Criação da variável 'context' que chama o método 'getContext' da variável anterior 'canvas', que representa o conceito de renderização bidimensional.
let box = 16;                                                       // Criação da variável 'box' com um valor numérico inteiro. Este nº representa o tamanho do bloco em pixels.

let cobra = []                                                      // Criação da variável 'cobra' que é uma matriz que representa a "cobrinha" do jogo.
cobra[0] = {                                                        // Define a posição inicial da cobra através do primeiro elemento da Array 'cobra'.
    x: box * 16,
    y: box * 16
}

let direction = "right";

let comida = {                                                        // Variável objeto 'food' que representa a comida da 'cobrinha'. É definido com uma posição randômica dentro do limite da borda da tela (configurável pelo usuário).
    x: Math.floor(Math.random() * 39 + 1) * box,
    y: Math.floor(Math.random() * 29 + 1) * box
}

// Função de criação do campo do jogo.
function board() {
    context.fillStyle = "#e0b3ff";                                  // Define a cor de preenchimento do campo do jogo.
    context.fillRect(0, 0, box * 40, box * 30);                     // Desenha o campo à partir da posição (15, 15) com o valor de 'box'* 55 pixels de largura e 'box'* 30 de altura.
}

// Função de criação da "cobrinha".
function snake() {
    for (let i = 0; i < cobra.length; i++) {                        // Cria uma um Loop For que define a composição da "cobrinha" no campo.
        context.fillStyle = "#187426";                              // Define a cor de preenchimento da "cobrinha".
        context.fillRect(cobra[i].x, cobra[i].y, box, box);         // Desenha a "cobrinha" à partir da posição "índice atual da array 'cobra' de (x, y)" com o valor de 'box' pra largura e altura.
    }
}

// Função de aparição da comida da "cobrinha".
function spawnFood() {
    context.fillStyle = "#e51528";
    context.fillRect(comida.x, comida.y, box, box);
}

document.addEventListener('keydown', update);

// Função que define as 'setas' do teclado como atalho pra movimento.
function update(event) {
    if (event.keyCode == 37 && direction != "right") { direction = "left" };
    if (event.keyCode == 38 && direction != "down") { direction = "up" };
    if (event.keyCode == 39 && direction != "left") { direction = "right" };
    if (event.keyCode == 40 && direction != "up") { direction = "down" };
}

// Função geral que engloba todas as outras e que inicia o jogo.
function startGame() {

    // Loop de Repetição 'for' que define a colisão da cabeça da "cobrinha" com o próprio corpo.
    for (let i = 1; i < cobra.length; i++) {
        if (cobra[0].x == cobra[i].x && cobra[0].y == cobra[i].y) {
            clearInterval(jogo)
            alert('VOCÊ PERDEU !!! Tente outra vez !')
        }
    }

    // Condicionais que habilitam a "cobrinha" à 'sair' do outro lado quando atingir o limite da borda.
    if (cobra[0].x > 39 * box && direction == "right") { cobra[0].x = 0 };
    if (cobra[0].x < 0 * box && direction == "left") { cobra[0].x = box * 39 };
    if (cobra[0].y > 29 * box && direction == "down") { cobra[0].y = 0 };
    if (cobra[0].y < 0 * box && direction == "up") { cobra[0].y = box * 29 };

    board();
    snake();
    spawnFood();

    let cobraX = cobra[0].x;                                // Configura a posição inicial da "cobrinha" no eixo X.
    let cobraY = cobra[0].y;                                // Configura a posição inicial da "cobrinha" no eixo Y.

    // Condicionais que configuram o movimento da "cobrinha".
    if (direction == "right") { cobraX += box };
    if (direction == "left") { cobraX -= box };
    if (direction == "up") { cobraY -= box };
    if (direction == "down") { cobraY += box };

    // Condicional que 'absorve' a comida pro corpo da "cobrinha".
    if (cobraX != comida.x || cobraY != comida.y) {
        cobra.pop();
    } else {
        comida.x = Math.floor(Math.random() * 29 + 1) * box
        comida.y = Math.floor(Math.random() * 29 + 1) * box
    }

    let newHead = {
        x: cobraX,
        y: cobraY
    }

    cobra.unshift(newHead);
}

let jogo = setInterval(startGame, 85);    // Configura a velocidade de movimentação da "cobrinha".
