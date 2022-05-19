----------------------------------------------------------------------

PARA RODAR O PROJETO COM DOCKER

CRIANDO A IMAGEM DOCKER
docker build -t exame/backend .

CRIANDO O CONTAINER
docker run -dp 3333:3333 exame/backend

----------------------------------------------------------------------

CASO PREFIRA RODAR O PROJETO SEM O DOCKER 

UTILIZAR "npm install" PARA BAIXAR AS DEPENDENCIAS

UTILIZAR "npm run knex:migrate" PARA CRIAR A BASE DE DADOS

UTILIZAR "npm run dev" PARA INICIAR O SERVIDOR

O PROJETO ESTARA RODANDO NA PORTA 3333

----------------------------------------------------------------------

PARA REALIZAR OS TESTES NO BACKEND SEM O FRONTEND UTILIZAR INSOMNIA, POSTMAN OU OUTRO TESTE DE API.

----------------------------------------------------------------------

POST/session -> VERIFICA SE USUÁRIO EXISTE NO SISTEMA PELO E-MAIL E SENHA.

EXEMPLO: POST http://localhost:3333/session

{
    "email": "teste@teste.com",
    "password": "123456",
}

----------------------------------------------------------------------

GET/users -> LISTA TODOS OS USUÁRIOS (PARA FINS DE TESTES)

EXEMPLO: GET http://localhost:3333/users

----------------------------------------------------------------------

POST/create -> CRIA UM NOVO USUÁRIO NO SISTEMA 

EXEMPLO: POST http://localhost:3333/create

{
	"email": "teste@teste.com",
	"phone": "12999999999",
	"fullName": "Usuario Teste",
	"passwordVerification": "123456",
	"confirmPassword": "123456"
}

----------------------------------------------------------------------

OBS: TODOS OS MÉTODOS ABAIXO PRECISAM TER O HEADERS AUTHORIZATION COM O VALOR DO ID DO USUÁRIO QUE ESTÁ "LOGADO",
SE O TOKEN OU O ID FOR DIFERENTE DO QUE FOI ENVIADO PARA O USUÁRIO APARECERA TOKEN INVALIDO.

PASSAR Authorization E O NÚMERO DO ID DO USUÁRIO NO HEADER

----------------------------------------------------------------------

POST/token -> VERIFICA SE O TOKEN FORNECIDO ESTÁ CORRETO - VALIDO PARA O WHATSAPP E EMAIL

EXEMPLO: POST http://localhost:3333/token

{
    "token": "123456",
}

----------------------------------------------------------------------

GET/sendEmail -> ENVIA E-MAIL PARA O USUÁRIO LOGADO

EXEMPLO: GET http://localhost:3333/sendEmail

----------------------------------------------------------------------

GET/whatsapp -> ENVIA WHATSAPP PARA O USUÁRIO LOGADO

EXEMPLO: GET http://localhost:3333/whatsapp

----------------------------------------------------------------------

GET/qrcode -> CRIA O QRCODE PARA O USUÁRIO LOGADO

EXEMPLO: GET http://localhost:3333/qrcode

----------------------------------------------------------------------

POST/qrcode -> ESSA ROTA VERIFICA O TOKEN DO QRCODE

EXEMPLO: POST http://localhost:3333/qrcode

----------------------------------------------------------------------

GET/users/:id -> EXIBE APENAS 1 USUÁRIO 

EXEMPLO: POST http://localhost:3333/users/1

----------------------------------------------------------------------

PUT/users/:id -> ATUALIZA OS DADOS DO USUÁRIO 

EXEMPLO: POST http://localhost:3333/users/1

{
	"email": "teste@teste.com",
	"phone": "15151515",
	"fullName": "Teste Usuário",
}


----------------------------------------------------------------------

DELETE/delete/:id -> DELETA UM USUÁRIO DO SISTEMA

EXEMPLO: DELETE http://localhost:3333/delete/1

----------------------------------------------------------------------