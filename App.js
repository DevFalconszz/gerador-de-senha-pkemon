import React, { useState, useEffect } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  Image, 
  TouchableOpacity, 
  ActivityIndicator, 
  SafeAreaView,
  Modal,
  Alert
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import * as Clipboard from 'expo-clipboard';

export default function App() {
  // Estados da aplicação
  const [estaCarregando, setEstaCarregando] = useState(false);
  const [dadosPokemon, setDadosPokemon] = useState(null);
  const [senhaGerada, setSenhaGerada] = useState('');
  const [mostrarModal, setMostrarModal] = useState(false);

  // Função para criar a senha misturando os dados da API
  function criarSenha(nome, peso) {
    let nomeMinusculo = nome.toLowerCase();
    
    // Trocando letras por números (estilo hacker iniciante)
    let novaSenha = nomeMinusculo
      .replace(/a/g, '4')
      .replace(/e/g, '3')
      .replace(/i/g, '1')
      .replace(/o/g, '0')
      .replace(/s/g, '5');

    // Pegando a primeira letra e deixando maiúscula
    let primeiraLetra = novaSenha.charAt(0).toUpperCase();
    let restoDaSenha = novaSenha.slice(1);
    
    // Símbolo aleatório para ficar forte
    const simbolos = ['!', '@', '#', '$', '%'];
    const simboloSorteado = simbolos[Math.floor(Math.random() * simbolos.length)];

    // Retorna Nome + Simbolo + Peso do pokemon (usando a info da API)
    return primeiraLetra + restoDaSenha + simboloSorteado + peso;
  }

  // Buscando os dados na PokeAPI
  async function buscarPokemon() {
    setEstaCarregando(true);
    setMostrarModal(false);
    
    try {
      // Sorteia um ID de pokemon (tem até o 1010 na API)
      let idSorteado = Math.floor(Math.random() * 1000) + 1;
      
      const resposta = await fetch('https://pokeapi.co/api/v2/pokemon/' + idSorteado);
      const json = await resposta.json();

      // Gera a senha usando o nome e o peso do bicho
      const senhaFinal = criarSenha(json.name, json.weight);

      setDadosPokemon({
        nome: json.name.toUpperCase(),
        foto: json.sprites.front_default,
        tipo: json.types[0].type.name
      });
      
      setSenhaGerada(senhaFinal);

    } catch (erro) {
      Alert.alert("Erro", "Deu ruim na conexão com a API!");
    } finally {
      setEstaCarregando(false);
    }
  }

  // Função para copiar para o celular
  async function copiarSenha() {
    await Clipboard.setStringAsync(senhaGerada);
    setMostrarModal(true);
    
    // Fecha o aviso depois de 2 segundos
    setTimeout(() => {
      setMostrarModal(false);
    }, 2000);
  }

  // Carrega um pokemon logo que o app abre
  useEffect(() => {
    buscarPokemon();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />
      
      <Text style={styles.tituloApp}>MEU GERADOR POKÉMON</Text>
      <Text style={styles.subtitulo}>A senha vem dos dados da API!</Text>

      <View style={styles.boxPrincipal}>
        {estaCarregando ? (
          <ActivityIndicator size="large" color="#FF0000" />
        ) : dadosPokemon && (
          <View style={{ alignItems: 'center', width: '100%' }}>
            <Image 
              source={{ uri: dadosPokemon.foto }} 
              style={styles.imagemPoke} 
            />
            
            <Text style={styles.nomePokemon}>{dadosPokemon.nome}</Text>
            
            <View style={styles.boxTipo}>
              <Text style={styles.textoTipo}>{dadosPokemon.tipo.toUpperCase()}</Text>
            </View>

            <View style={styles.containerSenha}>
              <Text style={styles.labelSenha}>SENHA CRIADA:</Text>
              <View style={styles.inputSenha}>
                <Text style={styles.textoSenha}>{senhaGerada}</Text>
              </View>
            </View>

            <TouchableOpacity style={styles.botaoCopiar} onPress={copiarSenha}>
              <Text style={styles.textoBotao}>COPIAR SENHA</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.botaoNovo} onPress={buscarPokemon}>
              <Text style={styles.textoBotao}>GERAR OUTRO</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>

      {/* Modal de aviso de cópia */}
      <Modal visible={mostrarModal} transparent={true} animationType="fade">
        <View style={styles.fundoModal}>
          <View style={styles.caixaAviso}>
            <Text style={styles.textoAviso}>Copiado com sucesso!</Text>
          </View>
        </View>
      </Modal>

      <Text style={styles.rodape}>Trabalho de Consumo de API - Expo</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#222',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  tituloApp: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#FF0000',
    marginBottom: 5,
  },
  subtitulo: {
    color: '#ccc',
    fontSize: 14,
    marginBottom: 25,
  },
  boxPrincipal: {
    backgroundColor: '#333',
    width: '100%',
    padding: 20,
    borderRadius: 15,
    alignItems: 'center',
    minHeight: 400,
    justifyContent: 'center',
  },
  imagemPoke: {
    width: 140,
    height: 140,
  },
  nomePokemon: {
    fontSize: 22,
    color: '#FFF',
    fontWeight: 'bold',
  },
  boxTipo: {
    backgroundColor: '#444',
    padding: 5,
    borderRadius: 5,
    marginTop: 5,
    marginBottom: 20,
  },
  textoTipo: {
    color: '#FF0000',
    fontSize: 12,
    fontWeight: 'bold',
  },
  containerSenha: {
    width: '100%',
    marginBottom: 20,
  },
  labelSenha: {
    color: '#999',
    fontSize: 12,
    textAlign: 'center',
    marginBottom: 5,
  },
  inputSenha: {
    backgroundColor: '#000',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  textoSenha: {
    color: '#00FF00', // Verde estilo terminal
    fontSize: 18,
    fontWeight: 'bold',
  },
  botaoCopiar: {
    backgroundColor: '#28a745',
    width: '100%',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 10,
  },
  botaoNovo: {
    backgroundColor: '#dc3545',
    width: '100%',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  textoBotao: {
    color: '#FFF',
    fontWeight: 'bold',
  },
  fundoModal: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.8)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  caixaAviso: {
    backgroundColor: '#28a745',
    padding: 20,
    borderRadius: 10,
  },
  textoAviso: {
    color: '#FFF',
    fontWeight: 'bold',
  },
  rodape: {
    marginTop: 30,
    color: '#666',
    fontSize: 12,
  }
});
