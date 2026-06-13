<h1 align="center">⚡ FastFeet</h1>

<p align="center">
  Aplicativo mobile da transportadora fictícia <strong>FastFeet</strong> — a visão do
  <strong>entregador</strong>. Login, listagem de entregas pendentes/feitas e
  retirada de pacotes.
</p>

<p align="center">
  <img alt="Expo SDK 56" src="https://img.shields.io/badge/Expo-56-000?logo=expo" />
  <img alt="React Native 0.85" src="https://img.shields.io/badge/React%20Native-0.85-61DAFB?logo=react" />
  <img alt="TypeScript" src="https://img.shields.io/badge/TypeScript-6-3178C6?logo=typescript&logoColor=white" />
  <img alt="License MIT" src="https://img.shields.io/badge/license-MIT-green" />
</p>

---

## ✨ Funcionalidades

- **Splash animada** — logo pulsante (~4s) enquanto carrega fontes.
- **Login** — máscara de CPF (`000.000.000-00`), toggle de visibilidade da senha,
  validação e overlay de erro ("Senha ou CPF incorretos.") com auto-dismiss.
- **Dashboard de entregas** — abas **Pendentes** / **Feitas**, filtro por bairro e
  cards com *stepper* de status (`AGUARDANDO → RETIRADO → ENTREGUE`).
- **Detalhes do pedido** — dados do destinatário, situação e datas, com ação
  **Retirar pacote** e overlay de confirmação ("Pacote retirado.").

## 🛠 Stack

- [Expo](https://expo.dev/) SDK 56 + [React Native](https://reactnative.dev/) 0.85
- [React](https://react.dev/) 19 + [TypeScript](https://www.typescriptlang.org/)
- [React Navigation](https://reactnavigation.org/) 7 (native-stack)
- [styled-components](https://styled-components.com/) (theme tipado)
- [react-native-svg](https://github.com/software-mansion/react-native-svg) — logos e ícones vetoriais
- Fontes [Inter](https://fonts.google.com/specimen/Inter) e [Roboto](https://fonts.google.com/specimen/Roboto) via `@expo-google-fonts`

## 🚀 Como rodar

> Requer [Node.js](https://nodejs.org/) LTS e o app **Expo Go** (ou um simulador iOS/Android).

```bash
# 1. instalar dependências
npm install

# 2. iniciar o Metro bundler
npm start

# ou abrir direto em um simulador:
npm run ios       # iOS  (macOS + Xcode)
npm run android   # Android (Android Studio)
npm run web       # navegador
```

Leia o QR Code com o app **Expo Go** ou pressione `i` / `a` no terminal para abrir
no simulador.

### 🔑 Credenciais de teste

O login usa autenticação *mock*:

| Campo | Valor              |
| ----- | ------------------ |
| CPF   | `086.259.149-02`   |
| Senha | `1234`             |

Qualquer outra combinação dispara o overlay de erro.

## 📁 Estrutura

```
src/
├── components/      # Button, Input, Header, Stepper, DeliveryCard, ícones SVG…
├── screens/         # Splash, SignIn, Dashboard, Details, ForgotPassword
├── routes/          # navegação (native-stack)
├── theme/           # cores, fontes e tamanhos
└── @types/          # tipagens (styled-components)
```

## 🧭 Fluxo de telas

```
Splash → SignIn → Dashboard → Details
                     │            └─ Retirar pacote
                     └─ Pendentes / Feitas
```

## 🧪 Scripts

| Comando             | Descrição                       |
| ------------------- | ------------------------------- |
| `npm start`         | Inicia o Metro bundler          |
| `npm run ios`       | Abre no simulador iOS           |
| `npm run android`   | Abre no emulador Android        |
| `npm run web`       | Abre no navegador               |
| `npm run typecheck` | Checagem de tipos (`tsc`)       |

## 🎨 Design

Layout baseado no Figma do desafio:
[FastFeet no Figma](https://www.figma.com/file/hn0qGhnSHDVst7oaY3PF72/FastFeet?node-id=44%3A1193)

## 📄 Licença

[MIT](https://choosealicense.com/licenses/mit/)
