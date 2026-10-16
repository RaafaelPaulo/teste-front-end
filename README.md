# Vitrine de produtos | Econverse

Aplicação de catálogo desenvolvida para o teste de Front-End da Econverse. A página consulta os produtos fornecidos pelo teste, apresenta preço em reais e abre um modal com os detalhes do item selecionado.

## Tecnologias

- React e TypeScript
- Vite
- Sass

## Requisitos

- Node.js e npm instalados

## Como executar

1. Instale as dependências:

   ```bash
   npm install
   ```

2. Inicie o servidor de desenvolvimento:

   ```bash
   npm run dev
   ```

3. Abra no navegador o endereço local indicado pelo Vite.

O servidor de desenvolvimento encaminha `/api/produtos` para o JSON disponibilizado pela Econverse. A descrição do produto é ocultada no cartão e no modal quando repete o nome do item, evitando texto duplicado.

## Verificações

- Gerar a versão de produção: `npm run build`
- Executar o ESLint: `npm run lint`
- Visualizar a versão compilada: `npm run preview`

## Enunciado

As especificações completas do desafio estão em [README-ECONVERSE.md](./README-ECONVERSE.md).
