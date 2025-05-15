/**********************************************************************************
 * Objetivo: Criar um API para realizar o CRUD do sistema de controle de Filmes
 * Data: 11/02/2025
 * Autor: Marcel
 * Versão: 1.0
 * Observação: 
 *          Para criar a API precisamos instalar:
 *              express         npm install express --save
 *              cors            npm install cors --save
 *              body-parser     npm install body-parser --save
 * 
 *          Para criar a integração com o Banco de Dados precisamos instalar
 *              prisma          npm install prisma --save (para fazer a conexão com o BD)
 *              prisma/client   npm install @prisma/client --save (para rodar os scripts SQL)
 * 
 *          Após a instalação do prisma e do prisma client, devemos:
 *              npx prisma init
 *          Você deverá configurar o arquivo .env e schema.prisma com as credenciais do BD
 *          Após essa configuração deverá rodar o seguinte comando:
 *              npx prisma migrate dev
 *********************************************************************************/

//Import das bibliotecas para configurar a API
const express       = require('express')
const cors          = require('cors')
const bodyParser    = require('body-parser')

//Manipular o body da requisição para chegar apenas JSON
const bodyParserJSON = bodyParser.json()

//Cria o objeto app com referencias do express para criar a API
const app = express()

//Configurações de acesso do CORS para a API
app.use((request, response, next)=>{
    response.header('Access-Control-Allow-Origin', '*')
    response.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')

    app.use(cors())
    next()
})

//Import da Controller
const controllerFilme = require('./controller/filme/controllerFilme.js')

app.post('/v1/controle-filmes/filme', cors(), bodyParserJSON, async function(request, response){
    
    //Recebe o content type da requisição
    let contentType = request.headers['content-type']
    
    //Recebe do body da requisição os dados encaminhados
    let dadosBody = request.body

    let resultFilme = await controllerFilme.inserirFilme(dadosBody, contentType)

    response.status(resultFilme.status_code)
    response.json(resultFilme)
    
})

app.get('/v1/controle-filmes/filme', cors(), async function(request, response){
    //chama a função para retornar os filmes
    let resultFilme = await controllerFilme.listarFilme()

    response.status(resultFilme.status_code)
    response.json(resultFilme)
})

app.get('/v1/controle-filmes/filme/:id', cors(), async function(request, response){
    //Recebe o ID da requisição
    let idFilme = request.params.id

    let resultFilme = await controllerFilme.buscarFilme(idFilme)

    response.status(resultFilme.status_code)
    response.json(resultFilme)
})

app.delete('/v1/controle-filmes/filme/:id', cors(), async function(request, response){
    let idFilme = request.params.id

    let resultFilme = await controllerFilme.excluirFilme(idFilme)

    response.status(resultFilme.status_code)
    response.json(resultFilme)
})

app.put('/v1/controle-filmes/filme/:id', cors(), bodyParserJSON, async function(request, response){

    //Recebe o content-type da requisição
    let contentType = request.headers['content-type']
    //Recebe o ID da requisição
    let idFilme = request.params.id
    //Recebe os dados da requisição pelo body
    let dadosBody = request.body

    let resultFilme = await controllerFilme.atualizarFilme(idFilme, dadosBody, contentType)

    response.status(resultFilme.status_code)
    response.json(resultFilme)

})

app.listen(8080, function(){
    console.log('Servidor aguardando requisições na porta 8080');
})