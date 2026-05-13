# 📱 PokéPass - Gerador de Senhas Inteligente

<p align="center">
  <img src="https://raw.githubusercontent.com/PokeAPI/media/master/logo/pokeapi_256.png" alt="PokeAPI Logo" width="300"/>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/React_Native-0.83.6-61DAFB?logo=react&logoColor=white" alt="React Native Version" />
  <img src="https://img.shields.io/badge/Expo-55.0.0-000020?logo=expo&logoColor=white" alt="Expo Version" />
  <img src="https://img.shields.io/badge/API-PokeAPI-EF5350?logo=pokemon&logoColor=white" alt="PokeAPI" />
  <img src="https://img.shields.io/badge/License-MIT-green" alt="License" />
</p>

## 📝 Sobre o Projeto

O **PokéPass** é um aplicativo mobile desenvolvido com **React Native** e **Expo** que transforma dados reais do universo Pokémon em senhas seguras e divertidas. Ao invés de usar geradores de caracteres aleatórios convencionais, o app consome a **PokeAPI** para buscar características únicas de um Pokémon e aplica uma lógica de transformação "Leet Speak" para criar sua credencial.

Este projeto foi desenvolvido como um estudo prático de **Consumo de APIs REST**, **Gerenciamento de Estados** e **UI/UX Mobile**.

---

## ✨ Funcionalidades

- 🎲 **Geração Aleatória:** Sorteia um dos mais de 1000 Pokémon disponíveis na PokéAPI.
- 🔐 **Lógica Hacker (Leet):** Converte o nome do Pokémon em uma base de senha (ex: `a` -> `4`, `e` -> `3`).
- ⚖️ **Fator Peso:** Utiliza o peso real do Pokémon para garantir entropia na senha.
- 📋 **Copy-to-Clipboard:** Funcionalidade de cópia rápida com feedback visual (Toast/Modal).
- 🖼️ **Interface Dinâmica:** Exibe a arte oficial do Pokémon e seu tipo elemental.
- 🔄 **Hot Refresh:** Gere novas senhas instantaneamente com um toque.

---

## 🛠️ Tecnologias e Ferramentas

| Tecnologia | Finalidade |
| :--- | :--- |
| **React Native** | Framework base para desenvolvimento cross-platform. |
| **Expo SDK 55** | Conjunto de ferramentas e serviços para desenvolvimento React Native. |
| **PokeAPI** | API REST pública fornecendo dados detalhados sobre Pokémon. |
| **Expo Clipboard** | Módulo nativo para interação com a área de transferência do sistema. |
| **Fetch API** | Realização de requisições assíncronas para o backend. |

---

## ⚙️ A Lógica de Geração

A senha não é apenas um texto aleatório. Ela segue um algoritmo de 4 etapas:

1.  **Fetch:** Coleta `name` e `weight` de um Pokémon aleatório via API.
2.  **Leet Speak:** O nome é processado: `A→4`, `E→3`, `I→1`, `O→0`, `S→5`.
3.  **Capitalization:** A primeira letra é sempre maiúscula.
4.  **Security Mix:** Um símbolo especial aleatório (`!`, `@`, `#`, `$`, `%`) é inserido entre o nome processado e o peso.

**Exemplo:**
- **Pokémon:** Bulbasaur (Peso: 69)
- **Processamento:** `B` + `ulb454ur` + `@` + `69`
- **Resultado:** `Bulb454ur@69`

---

## 📡 Consumo da API

O projeto utiliza o endpoint oficial da **PokéAPI**:

```http
GET https://pokeapi.co/api/v2/pokemon/{id}
```

### Exemplo de Resposta (JSON)
O app extrai cirurgicamente os seguintes campos:
- `json.name`: Base para a senha.
- `json.weight`: Sufixo numérico.
- `json.sprites.front_default`: Identidade visual.
- `json.types`: Para classificação no card.

---

## 🚀 Como Executar o Projeto

### Pré-requisitos
- Node.js instalado.
- Celular com o aplicativo **Expo Go** (disponível na Play Store/App Store) ou um emulador configurado.

### Passo a Passo

1. **Clone o repositório:**
   ```bash
   git clone https://github.com/DevFalconszz/gerador-de-senha-pkemon.git
   cd gerador-de-senha-pkemon
   ```

2. **Instale as dependências:**
   ```bash
   npm install
   ```

3. **Inicie o servidor Expo:**
   ```bash
   npx expo start
   ```

4. **Abra o App:**
   - No celular: Leia o QR Code com o app Expo Go.
   - No emulador: Pressione `a` para Android ou `i` para iOS no terminal.

---

## 📸 Screenshots & Layout

<div align="center">
  <p><i>A interface apresenta um design "Dark Mode" inspirado em terminais hacker, com o destaque principal para o Pokémon sorteado.</i></p>
  
  <img src="https://raw.githubusercontent.com/PokeAPI/media/master/logo/pokeapi_256.png" width="150" alt="Exemplo API" />
  <br>
  <span>(A interface exibe dinamicamente o card do Pokémon e a senha em verde neon)</span>
</div>

---

## 👤 Autor

Desenvolvido por **DevFalconszz**.
Este projeto faz parte de um portfólio de estudos em desenvolvimento mobile.

---

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

---
<p align="center">
  <i>"Gotta catch 'em all (and keep your passwords safe)!"</i> ⚡
</p>
