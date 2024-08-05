# authMiddleware.js

## Descrição
Este arquivo define um middleware de autenticação que verifica se o cabeçalho `admin` está presente e é igual a `admin`. Se a verificação falhar, o acesso é negado.

## Função

### `authMiddleware(req, res, next)`
Verifica se o cabeçalho `admin` está presente e é igual a `admin`. Se sim, permite o acesso; caso contrário, retorna um erro 403 (Acesso negado).

## Motivo
Este arquivo é necessário para proteger as rotas que requerem autenticação, garantindo que apenas usuários autorizados possam acessar essas rotas.