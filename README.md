# E-commerce Fullstack

Este projeto é uma aplicação fullstack de e-commerce que permite aos usuários visualizar, filtrar, adicionar produtos ao carrinho e finalizar pedidos. A aplicação integra dados de dois fornecedores distintos (um brasileiro e um europeu), normaliza essas informações e oferece uma experiência unificada para o usuário final.

## Estrutura do Projeto

O repositório é organizado em duas pastas principais:

- `frontend/` — Aplicação web desenvolvida em React.
- `backend/` — API REST desenvolvida com NestJS.

---

## Tecnologias Utilizadas

### Backend

- [NestJS](https://nestjs.com/) 
- [Prisma ORM](https://www.prisma.io/)
- [SQLite](https://www.sqlite.org/index.html) 

### Frontend

- [React](https://reactjs.org/)
- [React Router DOM](https://reactrouter.com/)
- [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vitejs.dev/) 
- [Tailwind CSS](https://tailwindcss.com/) 

---

## Funcionalidades

### Integração com Fornecedores

- Integração com dois fornecedores externos:
  - **Fornecedor Brasileiro**: `http://616d6bdb6dacbb001794ca17.mockapi.io/devnology/brazilian_provider`
  - **Fornecedor Europeu**: `http://616d6bdb6dacbb001794ca17.mockapi.io/devnology/european_provider`
- Normalização dos dados entre os dois formatos distintos.

### API - Endpoints

#### Produtos

- `GET /products`  
  Retorna todos os produtos unificados e normalizados.

- `GET /products/:id`  
  Retorna os dados de um produto individual com base no seu ID.

#### Pedidos

- `POST /orders`  
  Cria um novo pedido com os produtos selecionados e o total da compra.

- `GET /orders`  
  Retorna todos os pedidos registrados.

- `DELETE /orders/:id`  
  Exclui um pedido específico com base no ID.

---

## Como rodar o projeto

### 1. Clonar o repositório

```bash
git clone https://github.com/seu-usuario/seu-repositorio.git
cd seu-repositorio
```

### 2. Rodar o Backend

```bash
cd backend
npm install
npx prisma migrate dev --name init
npm run start:dev
```

> O servidor será iniciado em `http://localhost:3000`

### 3. Rodar o Frontend

```bash
cd frontend
npm install
npm run dev
```

> A aplicação web estará disponível em `http://localhost:5173`

---

##  Decisões Técnicas

- **NestJS + Prisma** foram escolhidos pela produtividade no desenvolvimento e pela robustez na modelagem e consulta de dados.
- **SQLite** foi utilizado por ser simples e adequado ao escopo local da aplicação.
- **Normalização de dados**: cada fornecedor possui uma estrutura distinta de produto, então foi criada uma camada de transformação para padronizar os dados.
- **Vite + React + Tailwind** oferecem um setup moderno, rápido e produtivo para construção da interface web.

---

## Layout

A interface é responsiva, com foco em usabilidade e performance. A experiência do usuário é otimizada com carregamentos visuais (`skeletons`) e feedbacks ao interagir com o carrinho e os pedidos.
