# Bolão Brasil x Noruega

SPA em React + Vite + Firestore para organizar o bolão da torcida do jogo Brasil x Noruega (05/07/2026, 17h).

## O que tem aqui

- Contador regressivo estilo painel de placar (split-flap) até o início do jogo
- Formulário de palpite (Brasil `_` x `_` Noruega) com limite de 2 pessoas por placar, garantido por transação atômica no Firestore
- Modal com instruções de Pix (R$ 10,00) após confirmar o palpite
- Dashboard público: total confirmado + lista de todos os palpites com status (🟡 aguardando Pix / 🟢 confirmado)
- Painel do organizador (senha fixa) para marcar pagamentos como confirmados e lançar o placar final
- Card de encerramento que mostra o placar final e os ganhadores automaticamente
- Rodapé fixo "Desenvolvedora: Zuvinha"

## 1. Configurar o Firebase

1. Crie um projeto em https://console.firebase.google.com
2. Ative o **Firestore Database** (modo produção)
3. Em **Regras**, cole o conteúdo do arquivo `firestore.rules` deste projeto
4. Em **Configurações do projeto > Seus apps**, crie um app Web e copie as credenciais
5. Copie `.env.example` para `.env` e preencha com essas credenciais:

```bash
cp .env.example .env
```

## 2. Rodar localmente

```bash
npm install
npm run dev
```

## 3. Ajustar configurações do bolão

Tudo fica centralizado em `src/config.js`:

- `dataJogoISO` — data/hora limite dos palpites
- `chavePix` / `nomeRecebedor` — dados do Pix
- `valorAposta` — valor da aposta
- `limitePorPlacar` — quantas pessoas podem repetir o mesmo placar
- `adminPassword` — senha do painel do organizador (**troque antes de compartilhar o link**)

## 4. Deploy no Vercel

1. Suba este projeto para um repositório no GitHub
2. Importe o repositório em https://vercel.com/new
3. Configure as variáveis de ambiente (as mesmas do `.env`) em **Settings > Environment Variables**
4. Deploy — a Vercel detecta automaticamente que é um projeto Vite

## Observação sobre segurança do admin

O login do painel do organizador usa uma senha fixa no código (sem Firebase Auth), para simplicidade e velocidade de entrega. Isso significa que a senha fica visível para quem inspecionar o código-fonte do site. Para um bolão entre amigos isso costuma ser suficiente, mas não é uma segurança forte — se quiser reforçar depois, dá para migrar para Firebase Auth.
