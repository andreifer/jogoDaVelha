import { StatusBar } from 'expo-status-bar';
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';
import React, { useState } from 'react';



export default function App() {
  const [tela, setTela] = useState('menu');
  const [jogadorAtual, setJogadorAtual] = useState('');
  const [tabuleiro, setTabuleiro] = useState([]);
  const [jogadas, setJogadas] = useState(0);
  const [ganhador, setGanhador] = useState('');

  function iniciarJogo(jogador) {
    setJogadorAtual(jogador);

    setJogadas(9);
    setTabuleiro([
      ['', '', ''],
      ['', '', ''],
      ['', '', ''],
    ]);

    setTela('jogo');
  }

  function jogar(linha, coluna) {
    tabuleiro[linha][coluna] = jogadorAtual;
    setTabuleiro([...tabuleiro]);

    setJogadorAtual(jogadorAtual == 'X' ? 'O' : 'X');
    verificarGanhador(tabuleiro, linha, coluna);
  }

  function verificarGanhador(tabuleiro, linha, coluna) {

    // Verificar Linha
    if (tabuleiro[linha][0] !== '' && tabuleiro[linha][0] == tabuleiro[linha][1] && tabuleiro[linha][0] == tabuleiro[linha][2]) {
      setGanhador(tabuleiro[linha][0]);
      setTela('ganhador');
    }

    // Verificar Coluna
    if (tabuleiro[0][coluna] !== '' && tabuleiro[0][coluna] == tabuleiro[1][coluna] && tabuleiro[0][coluna] == tabuleiro[2][coluna]) {
      setGanhador(tabuleiro[0][coluna]);
      setTela('ganhador');
    }

    // Verificar Diagonal 1
    if (tabuleiro[0][0] !== '' && tabuleiro[0][0] == tabuleiro[1][1] && tabuleiro[0][0] == tabuleiro[2][2]) {
      setGanhador(tabuleiro[0][0]);
      setTela('ganhador');
    }

    // Verificar Diagonal 2
    if (tabuleiro[0][2] !== '' && tabuleiro[0][2] == tabuleiro[1][1] && tabuleiro[0][2] == tabuleiro[2][0]) {
      setGanhador(tabuleiro[0][2]);
      setTela('ganhador');
    }

    // Verificar Empate
    setJogadas(jogadas - 1);
    if (jogadas == 1) {
      setGanhador('');
      setTela('ganhador');
    }
  }

  switch (tela) {
    case 'menu':
      return getTelaMenu();
    case 'jogo':
      return getTelaJogo();
    case 'ganhador':
      return getTelaGanhador();
  }

  function getTelaMenu() {
    return (
      <View style={styles.container}>
        <StatusBar style="auto" />
        <Text style={styles.titulo}>Jogo Da Velha</Text>
        <Text style={styles.subTitulo}>Selecione o Primeiro Jogador</Text>

        <View style={{ flexDirection: 'row' }}>
          <TouchableOpacity
            style={styles.boxJogador}
            onPress={() => iniciarJogo('X')}
          >
            <Text style={styles.jogadorX}>X</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.boxJogador}
            onPress={() => iniciarJogo('O')}
          >
            <Text style={styles.jogadorO}>O</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  function getTelaJogo() {
    return (
      <View style={styles.container}>
        <StatusBar style="auto" />
        <Text style={styles.titulo}>Jogo da Velha</Text>

        {
          tabuleiro.map((linha, numeroLinha) => {
            return (
              <View key={numeroLinha} style={{ flexDirection: 'row' }}>
                {linha.map((coluna, numeroColuna) => {
                  return (
                    <TouchableOpacity
                      key={numeroColuna}
                      style={styles.boxJogador}
                      onPress={() => jogar(numeroLinha, numeroColuna)}
                      disabled={coluna != ''}
                    >
                      {coluna == 'X' && <Text style={styles.jogadorX}>X</Text>}
                      {coluna == 'O' && <Text style={styles.jogadorO}>O</Text>}
                    </TouchableOpacity>
                  );
                })}
              </View>
            );
          })
        }

        <TouchableOpacity
          style={styles.botaoVoltar}
          onPress={() => setTela('menu')}
        >
          <Text style={styles.textBttVoltar}>Voltar ao Menu</Text>
        </TouchableOpacity>

      </View>
    );
  }

  function getTelaGanhador() {
    return (
      <View style={styles.container}>
        <StatusBar style="auto" />
        <Text style={styles.titulo}>Jogo Da Velha</Text>
        <Text style={styles.subTitulo}>Resultado Final</Text>

        {
          ganhador == '' &&
          <Text style={styles.ganhador}>Empate</Text>
        }

        {
          ganhador != '' &&
          <>
            <Text style={styles.ganhador}>Ganhador</Text>
            <View
              style={styles.boxJogador}
            >
              <Text style={ganhador == 'X' ? styles.jogadorX : styles.jogadorO}>{ganhador}</Text>
            </View>
          </>
        }

        <TouchableOpacity
          style={styles.botaoVoltar}
          onPress={() => setTela('menu')}
        >
          <Text style={styles.textBttVoltar}>Voltar ao Menu</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

  titulo: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#000',
  },

  subTitulo: {
    fontSize: 20,
    color: '#555',
    marginTop: 20,
  },

  boxJogador: {
    width: 80,
    height: 80,
    backgroundColor: '#ddd',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 5,
  },

  jogadorX: {
    fontSize: 40,
    color: '#553fda',
  },

  jogadorO: {
    fontSize: 40,
    color: '#da3f3f',
  },

  botaoVoltar: {
    marginTop: 20,
    backgroundColor: '#4e6fe4',
    padding: 10,
    borderRadius: 5,
  },

  textBttVoltar: {
    color: '#fff',
    fontSize: 15,
  },

  ganhador: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#000',
    marginTop: 20,
  },
});




/*export default function jogoDaVelha() {
  const currentPlayer = document.querySelector(".currentPlayer");

  let selected;
  let player = "X";

  let positions = [
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9],
      [1, 4, 7],
      [2, 5, 8],
      [3, 6, 9],
      [1, 5, 9],
      [3, 5, 7],
  ];

  function init() {
      selected = [];

      currentPlayer.innerHTML = `JOGADOR DA VEZ: ${player}`;

      document.querySelectorAll(".game button").forEach((item) => {
          item.innerHTML = "";
          item.addEventListener("click", newMove);
      });
  }

  init();

  function newMove(e) {
      const index = e.target.getAttribute("data-i");
      e.target.innerHTML = player;
      e.target.removeEventListener("click", newMove);
      selected[index] = player;

      setTimeout(() => {
          check();
      }, [100]);

      player = player === "X" ? "O" : "X";
      currentPlayer.innerHTML = `JOGADOR DA VEZ: ${player}`;
  }

  function check() {
      let playerLastMove = player === "X" ? "O" : "X";

      const items = selected
          .map((item, i) => [item, i])
          .filter((item) => item[0] === playerLastMove)
          .map((item) => item[1]);

      for (pos of positions) {
          if (pos.every((item) => items.includes(item))) {
              alert("O JOGADOR '" + playerLastMove + "' GANHOU!");
              init();
              return;
          }
      }

      if (selected.filter((item) => item).length === 9) {
          alert("DEU EMPATE!");
          init();
          return;
      }
  }
}*/