# API de Usuários

## Endpoints

### 1. Registro de Usuário

- **Rota:** `/register`
- **Método:** `POST`
- **Descrição:** Registra um novo usuário no sistema.
- **Parâmetros do Corpo da Requisição:**
  - `name` (string, obrigatório): Nome do usuário
  - `email` (string, obrigatório): Email do usuário
  - `password` (string, obrigatório): Senha do usuário
  - `confirmpassword` (string, obrigatório): Confirmação da senha
  - `phone` (string, obrigatório): Telefone do usuário
  - `address` (string, obrigatório): Endereço do usuário
- **Resposta de Sucesso:**
  - **Status:** `201 Created`
  - **Corpo:** 
    ```json
    {
      "token": "jwt-token",
      "userId": "user-id"
    }
    ```
- **Resposta de Erro:**
  - **Status:** `422 Unprocessable Entity` ou `500 Internal Server Error`
  - **Corpo:**
    ```json
    {
      "error": "Mensagem de erro"
    }
    ```

### 2. Login de Usuário

- **Rota:** `/login`
- **Método:** `POST`
- **Descrição:** Realiza o login do usuário.
- **Parâmetros do Corpo da Requisição:**
  - `email` (string, obrigatório): Email do usuário
  - `password` (string, obrigatório): Senha do usuário
- **Resposta de Sucesso:**
  - **Status:** `200 OK`
  - **Corpo:** 
    ```json
    {
      "token": "jwt-token",
      "userId": "user-id"
    }
    ```
- **Resposta de Erro:**
  - **Status:** `401 Unauthorized` ou `500 Internal Server Error`
  - **Corpo:**
    ```json
    {
      "error": "Mensagem de erro"
    }
    ```

### 3. Obter Usuário Atual

- **Rota:** `/currentUser`
- **Método:** `GET`
- **Descrição:** Retorna os dados do usuário atual autenticado.
- **Autenticação:** Requer token JWT
- **Resposta de Sucesso:**
  - **Status:** `200 OK`
  - **Corpo:** 
    ```json
    {
      "user": {
        "name": "Nome do usuário",
        "email": "Email do usuário",
        "phone": "Telefone do usuário",
        "address": "Endereço do usuário",
        "image": "Nome do arquivo de imagem, se existir"
      }
    }
    ```
- **Resposta de Erro:**
  - **Status:** `401 Unauthorized` ou `500 Internal Server Error`
  - **Corpo:**
    ```json
    {
      "error": "Mensagem de erro"
    }
    ```

### 4. Atualizar Usuário Atual

- **Rota:** `/currentUser`
- **Método:** `PUT`
- **Descrição:** Atualiza os dados do usuário atual autenticado.
- **Autenticação:** Requer token JWT
- **Parâmetros do Corpo da Requisição:**
  - `name` (string, obrigatório): Nome do usuário
  - `email` (string, obrigatório): Email do usuário
  - `password` (string, obrigatório): Senha do usuário
  - `confirmpassword` (string, obrigatório): Confirmação da senha
  - `phone` (string, obrigatório): Telefone do usuário
  - `address` (string, obrigatório): Endereço do usuário
- **Parâmetros do Arquivo:**
  - `image` (arquivo, opcional): Imagem do usuário
- **Resposta de Sucesso:**
  - **Status:** `200 OK`
  - **Corpo:** 
    ```json
    {
      "user": {
        "name": "Nome do usuário",
        "email": "Email do usuário",
        "phone": "Telefone do usuário",
        "address": "Endereço do usuário",
        "image": "Nome do arquivo de imagem, se existir"
      }
    }
    ```
- **Resposta de Erro:**
  - **Status:** `422 Unprocessable Entity` ou `500 Internal Server Error`
  - **Corpo:**
    ```json
    {
      "error": "Mensagem de erro"
    }
    ```

# API de Produtos

## Endpoints

### 1. Criar Produto

- **Rota:** `/`
- **Método:** `POST`
- **Descrição:** Cria um novo produto.
- **Autenticação:** Requer token JWT
- **Parâmetros do Corpo da Requisição:**
  - `name` (string, obrigatório): Nome do produto
  - `description` (string, obrigatório): Descrição do produto
  - `state` (string, obrigatório): Estado do produto
  - `purchased_at` (date, obrigatório): Data de compra do produto
- **Parâmetros do Arquivo:**
  - `images` (arquivos, obrigatório): Imagens do produto
- **Resposta de Sucesso:**
  - **Status:** `201 Created`
  - **Corpo:**
    ```json
    {
      "product": {
        "_id": "product-id",
        "name": "Nome do produto",
        "description": "Descrição do produto",
        "state": "Estado do produto",
        "purchased_at": "Data de compra do produto",
        "owner": "owner-id",
        "available": true,
        "images": ["imagem1.jpg", "imagem2.jpg"]
      }
    }
    ```
- **Resposta de Erro:**
  - **Status:** `422 Unprocessable Entity` ou `500 Internal Server Error`
  - **Corpo:**
    ```json
    {
      "error": "Mensagem de erro"
    }
    ```

### 2. Listar Produtos

- **Rota:** `/`
- **Método:** `GET`
- **Descrição:** Lista todos os produtos com paginação.
- **Parâmetros da Query:**
  - `page` (number, opcional): Número da página (padrão: 1)
  - `limit` (number, opcional): Limite de itens por página (padrão: 10)
- **Resposta de Sucesso:**
  - **Status:** `200 OK`
  - **Corpo:**
    ```json
    {
      "products": [
        {
          "_id": "product-id",
          "name": "Nome do produto",
          "description": "Descrição do produto",
          "state": "Estado do produto",
          "purchased_at": "Data de compra do produto",
          "owner": {
            "_id": "owner-id",
            "name": "Nome do proprietário"
          },
          "available": true,
          "images": ["imagem1.jpg", "imagem2.jpg"]
        },
        ...
      ]
    }
    ```
- **Resposta de Erro:**
  - **Status:** `500 Internal Server Error`
  - **Corpo:**
    ```json
    {
      "error": "Mensagem de erro"
    }
    ```

### 3. Listar Produtos do Usuário

- **Rota:** `/showUserProducts`
- **Método:** `GET`
- **Descrição:** Lista todos os produtos do usuário autenticado.
- **Autenticação:** Requer token JWT
- **Resposta de Sucesso:**
  - **Status:** `200 OK`
  - **Corpo:**
    ```json
    {
      "products": [
        {
          "_id": "product-id",
          "name": "Nome do produto",
          "description": "Descrição do produto",
          "state": "Estado do produto",
          "purchased_at": "Data de compra do produto",
          "owner": "owner-id",
          "available": true,
          "images": ["imagem1.jpg", "imagem2.jpg"]
        },
        ...
      ]
    }
    ```
- **Resposta de Erro:**
  - **Status:** `500 Internal Server Error`
  - **Corpo:**
    ```json
    {
      "error": "Mensagem de erro"
    }
    ```

### 4. Listar Produtos Recebidos pelo Usuário

- **Rota:** `/showRecieverProducts`
- **Método:** `GET`
- **Descrição:** Lista todos os produtos recebidos pelo usuário autenticado.
- **Autenticação:** Requer token JWT
- **Resposta de Sucesso:**
  - **Status:** `200 OK`
  - **Corpo:**
    ```json
    {
      "products": [
        {
          "_id": "product-id",
          "name": "Nome do produto",
          "description": "Descrição do produto",
          "state": "Estado do produto",
          "purchased_at": "Data de compra do produto",
          "owner": "owner-id",
          "available": true,
          "images": ["imagem1.jpg", "imagem2.jpg"]
        },
        ...
      ]
    }
    ```
- **Resposta de Erro:**
  - **Status:** `500 Internal Server Error`
  - **Corpo:**
    ```json
    {
      "error": "Mensagem de erro"
    }
    ```

### 5. Obter Produto por ID

- **Rota:** `/:id`
- **Método:** `GET`
- **Descrição:** Retorna um produto específico pelo ID.
- **Parâmetros da Rota:**
  - `id` (string, obrigatório): ID do produto
- **Resposta de Sucesso:**
  - **Status:** `200 OK`
  - **Corpo:**
    ```json
    {
      "product": {
        "_id": "product-id",
        "name": "Nome do produto",
        "description": "Descrição do produto",
        "state": "Estado do produto",
        "purchased_at": "Data de compra do produto",
        "owner": "owner-id",
        "available": true,
        "images": ["imagem1.jpg", "imagem2.jpg"]
      }
    }
    ```
- **Resposta de Erro:**
  - **Status:** `404 Not Found` ou `500 Internal Server Error`
  - **Corpo:**
    ```json
    {
      "error": "Mensagem de erro"
    }
    ```

### 6. Atualizar Produto

- **Rota:** `/:id`
- **Método:** `PUT`
- **Descrição:** Atualiza um produto específico pelo ID.
- **Autenticação:** Requer token JWT
- **Parâmetros da Rota:**
  - `id` (string, obrigatório): ID do produto
- **Parâmetros do Corpo da Requisição:**
  - `name` (string, obrigatório): Nome do produto
  - `description` (string, obrigatório): Descrição do produto
  - `state` (string, obrigatório): Estado do produto
  - `purchased_at` (date, obrigatório): Data de compra do produto
  - `reciever` (string, opcional): ID do receptor do produto
- **Parâmetros do Arquivo:**
  - `images` (arquivos, obrigatório): Imagens do produto
- **Resposta de Sucesso:**
  - **Status:** `200 OK`
  - **Corpo:**
    ```json
    {
      "product": {
        "_id": "product-id",
        "name": "Nome do produto",
        "description": "Descrição do produto",
        "state": "Estado do produto",
        "purchased_at": "Data de compra do produto",
        "owner": "owner-id",
        "available": true,
        "images": ["imagem1.jpg", "imagem2.jpg"]
      }
    }
    ```
- **Resposta de Erro:**
  - **Status:** `422 Unprocessable Entity` ou `500 Internal Server Error`
  - **Corpo:**
    ```json
    {
      "error": "Mensagem de erro"
    }
    ```

### 7. Excluir Produto

- **Rota:** `/:id`
- **Método:** `DELETE`
- **Descrição:** Exclui um produto específico pelo ID.
- **Autenticação:** Requer token JWT
- **Parâmetros da Rota:**
  - `id` (string, obrigatório): ID do produto
- **Resposta de Sucesso:**
  - **Status:** `204 No Content`
- **Resposta de Erro:**
  - **Status:** `404 Not Found` ou `500 Internal Server Error`
  - **Corpo:**
    ```json
    {
      "error": "Mensagem de erro"
    }
    ```

### 8. Agendar Produto

- **Rota:** `/schedule/:id`
- **Método:** `PATCH`
- **Descrição:** Agenda um produto para doação.
- **Autenticação:** Requer token JWT
- **Parâmetros da Rota:**
  - `id` (string, obrigatório): ID do produto
- **Resposta de Sucesso:**
  - **Status:** `200 OK`
  - **Corpo:**
    ```json
    {
      "message": "A visita foi agendada com Sucesso, entre em contato com [nome do proprietário], pelo telefone [telefone do proprietário]"
    }
    ```
- **Resposta de Erro:**
  - **Status:** `404 Not Found` ou `400 Bad Request` ou `500 Internal Server Error`
  - **Corpo:**
    ```json
    {
      "error": "Mensagem de erro"
    }
    ```

### 9. Concluir Doação

- **Rota:** `/concludeDonation/:id`
- **Método:** `PATCH`
- **Descrição:** Conclui a doação de um produto.
- **Autenticação:** Requer token JWT
- **Parâmetros da Rota:**
  - `id` (string, obrigatório): ID do produto
- **Resposta de Sucesso:**
  - **Status:** `200 OK`
  - **Corpo:**
    ```json
    {
      "message": "Doação concluída com sucesso."
    }
    ```
- **Resposta de Erro:**
  - **Status:** `404 Not Found` ou `400 Bad Request` ou `500 Internal Server Error`
  - **Corpo:**
    ```json
    {
      "error": "Mensagem de erro"
    }
    ```

## Como Executar a API

### Pré-requisitos

- Node.js
- npm

### Instalação

1. Clone o repositório:
   ```sh
   git clone https://github.com/alessandravgs/bazar.git

2. Instale as dependências:
   ```sh
   npm install

3. Inicie o servidor:
   ```sh
   npm run start

