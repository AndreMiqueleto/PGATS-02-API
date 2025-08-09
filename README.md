# API de Transferências (Node.js + Express)

Esta API permite registro, login, consulta de usuários e transferências de valores, com regras de negócio para aprendizado de testes e automação de APIs.

## Funcionalidades
- **Registro de usuário** (`/register`): Não permite usuários duplicados.
- **Login** (`/login`): Login e senha obrigatórios.
- **Consulta de usuários** (`/users`): Lista todos os usuários cadastrados.
- **Transferência de valores** (`/transfer`):
  - Só permite transferências acima de R$ 5.000,00 para favorecidos.
  - Favorecidos são definidos no cadastro do usuário.
- **Consulta de transferências** (`/transfers`)
- **Documentação Swagger** (`/api-docs`)

## Instalação

1. Clone o repositório ou copie os arquivos para uma pasta local.
2. Instale as dependências:

```bash
npm install express swagger-ui-express
```

## Como rodar

```bash
node server.js
```

A API estará disponível em `http://localhost:3000`.

## Endpoints principais

- `POST /register` — Cadastro de usuário
- `POST /login` — Login
- `GET /users` — Lista usuários
- `POST /transfer` — Realiza transferência
- `GET /transfers` — Lista transferências
- `GET /api-docs` — Documentação Swagger

## Exemplo de registro de usuário

```json
{
  "username": "joao",
  "password": "1234",
  "favorecidos": ["maria"]
}
```

## Exemplo de transferência

```json
{
  "from": "joao",
  "to": "maria",
  "amount": 4000
}
```

## Observações
- O banco de dados é em memória (os dados são perdidos ao reiniciar o servidor).
- O saldo inicial de cada usuário é R$ 10.000,00.
- Para testar com Supertest, importe o `app.js`.
# PGATS-02-API
