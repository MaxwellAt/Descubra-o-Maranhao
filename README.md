# Descubra o Maranhão

Um sistema que cria uma API para cadastro de destinos turísticos no Maranhão.

Publicação no [linkedin!](https://www.linkedin.com/feed/update/urn:li:activity:7226967930062700544/)
## Pré-requisitos

- Node.js (versão 14.x ou superior)
- npm (versão 6.x ou superior) ou yarn (versão 1.x ou superior)

## Instalação

1. Clone o repositório:
    ```bash
    git clone https://github.com/seu-usuario/seu-repositorio.git
    ```
2. Navegue até o diretório do projeto:
    ```bash
    cd seu-repositorio
    ```
3. Instale as dependências:
    ```bash
    npm install
    ```
    ou
    ```bash
    yarn install
    ```

## Configuração do Banco de Dados

1. Configure as variáveis de ambiente criando um arquivo [`.env`](command:_github.copilot.openRelativePath?%5B%7B%22scheme%22%3A%22file%22%2C%22authority%22%3A%22%22%2C%22path%22%3A%22%2Fworkspaces%2FDescubra-o-Maranhao%2F.env%22%2C%22query%22%3A%22%22%2C%22fragment%22%3A%22%22%7D%5D "/workspaces/Descubra-o-Maranhao/.env") na raiz do projeto com as seguintes informações:
    ```env
    DB_HOST=localhost
    DB_USER=seu_usuario
    DB_PASSWORD=sua_senha
    DB_NAME=nome_do_banco
    ```

2. Configure o banco de dados:
    ```bash
    npm run setup-db
    ```
    ou
    ```bash
    yarn setup-db
    ```

3. Crie um usuário administrador:
    ```bash
    npm run create-admin
    ```
    ou
    ```bash
    yarn create-admin
    ```

4. Insira os destinos turísticos:
    ```bash
    npm run insert-destinos
    ```
    ou
    ```bash
    yarn insert-destinos
    ```

## Executando o Projeto

Para iniciar o projeto, execute o seguinte comando:

```bash
npm start
```
ou 
```bash
yarn start
```

# Aviso Importante

Este projeto inclui um middleware de autenticação que exige um cabeçalho específico para acessar rotas protegidas. Para operações de CRUD na tabela de clientes, o mesmo cabeçalho e valor são necessários.

## Por favor, note:

- **Autenticação Necessária**: Apenas usuários autenticados com o cabeçalho `admin: admin` poderão realizar operações de CRUD.
- **Inserção de Clientes**: A funcionalidade de inserção de clientes é restrita para garantir que apenas administradores possam adicionar novos clientes, evitando que usuários não autorizados possam cadastrar clientes ou manipular destinos turísticos.
- **Foco do Projeto**: A escolha de não incluir uma página de cadastramento de clientes reflete o foco principal do projeto na criação e gerenciamento de destinos turísticos. Assim, a criação de clientes é gerida diretamente via API para manter a integridade e a segurança do sistema.

