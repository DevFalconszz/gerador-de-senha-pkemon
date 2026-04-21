# 📱 PokéPass - Gerador de Senhas com PokeAPI

Este é um projeto desenvolvido em **React Native** utilizando **Expo SDK 55**. O objetivo do aplicativo é gerar senhas seguras e aleatórias baseando-se em dados consumidos da **PokeAPI**.

---

## 🚀 Como funciona?

O aplicativo realiza uma consulta na API externa de Pokémon e utiliza as informações retornadas para construir uma senha personalizada através de uma lógica de transformação de dados.

### Lógica de Geração:
1.  **Consumo de Dados:** O app sorteia um ID aleatório e busca o nome e o peso do Pokémon.
2.  **Leet Speak (Transformação):** O nome do Pokémon é transformado trocando letras por números (ex: `a` vira `4`, `e` vira `3`).
3.  **Símbolos:** Um caractere especial (`!`, `@`, `#`, etc) é adicionado para aumentar a segurança.
4.  **Concatenação:** O peso do Pokémon é adicionado ao final da string, garantindo que cada senha seja única baseada nos stats do bicho.

---

## 🛠️ Tecnologias Utilizadas

- **React Native** (Framework)
- **Expo** (Workflow)
- **PokeAPI** (Fonte de dados externa)
- **Expo Clipboard** (Para funcionalidade de cópia)

---

## 📸 Estrutura da API

A aplicação consome o endpoint:
`https://pokeapi.co/api/v2/pokemon/{id}`

Os dados utilizados são:
- `name`: Nome do Pokémon.
- `weight`: Peso para composição da senha.
- `sprites.front_default`: Imagem exibida no card.
- `types`: Tipo do Pokémon para estilização.

---

## 🏃 Como rodar o projeto

1.  Certifique-se de ter o **Node.js** instalado.
2.  Instale as dependências:
    ```bash
    npm install
    ```
3.  Inicie o servidor do Expo:
    ```bash
    npx expo start
    ```
4.  Abra o aplicativo no seu celular através do app **Expo Go** lendo o QR Code no terminal.

---

## 📝 Requisitos Atendidos

- [x] Consumo de API Externa.
- [x] Operação lógica/matemática com os dados consultados.
- [x] Interface autoral e funcional.
- [x] Atualizado para Expo SDK 55.

---
*Desenvolvido como atividade prática de desenvolvimento mobile.*
