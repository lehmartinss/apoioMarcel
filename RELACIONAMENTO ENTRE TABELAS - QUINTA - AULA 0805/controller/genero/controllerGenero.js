/**********************************************************************************
 * Objetivo: Controller responsável pela regra de negócio referente ao CRUD de genero
 * Data: 11/02/2025
 * Autor: Marcel
 * Versão: 1.0
 **********************************************************************************/

//Import do arquivo de mensagens e status code do projeto
const message = require('../../modulo/config.js')

//Import do aquivo para realizar o CRUD de dados no Banco de Dados
const generoDAO = require('../../model/DAO/genero.js')

//Função para tratar a inserção de um novo genero no DAO
const inserirGenero = async function(genero, contentType){
    try {
        if(String(contentType).toLowerCase() == 'application/json')
        {
                if (genero.nome              == ''           || genero.nome               == undefined    || genero.nome          == null || genero.nome.length > 80
                   
                )
                {
                    return message.ERROR_REQUIRED_FIELDS //400
                }else{
                    //Chama a função para inserir no BD e aguarda o retorno da função
                    let resultgenero = await generoDAO.insertgenero(genero)

                    if(resultgenero)
                        return message.SUCCESS_CREATED_ITEM //201
                    else
                        return message.ERROR_INTERNAL_SERVER_MODEL //500
                }
        }else{
            return message.ERROR_CONTENT_TYPE //415
        }
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }
}

//Função para tratar a atualização de um genero no DAO
const atualizarGenero = async function(id, genero, contentType){
    try {
        if(String(contentType).toLowerCase() == 'application/json')
            {
                if (id                              == ''           || id                       == undefined    || id                    == null || isNaN(id)  || id  <= 0   ||
                    genero.nome              == ''           || genero.nome               == undefined    || genero.nome          == null || genero.nome.length > 80
                )
                {
                    return message.ERROR_REQUIRED_FIELDS //400
                }else{
                    //Validação para verificar se o ID existe no BD
                    let resultgenero = await generoDAO.selectByIdgenero(parseInt(id))

                    if(resultgenero != false || typeof(resultgenero) == 'object'){
                        if(resultgenero.length > 0 ){
                            //Update
                            //Adiciona o ID do genero no JSON com os dados
                            genero.id = parseInt(id)

                            let result = await generoDAO.updateGenero(genero)

                            if(result){
                                return message.SUCCESS_UPDATED_ITEM //200
                            }else{
                                return message.ERROR_INTERNAL_SERVER_MODEL //500
                            }
                        }else{
                            return message.ERROR_NOT_FOUND //404
                        }
                    }else{
                        return message.ERROR_INTERNAL_SERVER_MODEL //500
                    }
                }
            }else{
                return message.ERROR_CONTENT_TYPE //415
            }
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }
}

//Função para tratar a exclusão de um genero no DAO
const excluirGenero = async function(id){
    try {
        if(id == '' || id == undefined || id == null || isNaN(id) || id <=0){
            return message.ERROR_REQUIRED_FIELDS //400
        }else{

            //Funcção que verifica se  ID existe no BD
            let resultgenero = await generoDAO.selectByIdGenero(parseInt(id))

            if(resultgenero != false || typeof(resultgenero) == 'object'){
                //Se existir, faremos o delete
                if(resultgenero.length > 0){
                    //delete
                    let result = await generoDAO.deleteGenero(parseInt(id))

                    if(result){
                        return message.SUCCESS_DELETED_ITEM //200
                    }else{
                        return message.ERROR_INTERNAL_SERVER_MODEL //500
                    }
                }else{
                    return message.ERROR_NOT_FOUND //404
                }
            }else{
                return message.ERROR_INTERNAL_SERVER_MODEL //500
            }
        }
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }
}

//Função para tratar o retorno de uma lista de generos do DAO
const listarGenero = async function(){
    try {
        //Objeto do tipo JSON
        let dadosgenero = {}
        //Chama a função para retornar os generos cadastrados
        let resultgenero = await generoDAO.selectAllGenero()

        if(resultgenero != false || typeof(resultgenero) == 'object'){
            if(resultgenero.length > 0){
                //Criando um JSON de retorno de dados para a API
                dadosgenero.status = true
                dadosgenero.status_code = 200
                dadosgenero.items = resultgenero.length
                dadosgenero.films = resultgenero

                return dadosgenero
            }else{
                return message.ERROR_NOT_FOUND //404
            }
        }else{
            return message.ERROR_INTERNAL_SERVER_MODEL //500
        }
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }
}

//Função para tratar o retorno de um genero filtrando pelo ID do DAO
const buscarGenero = async function(id){
    try {
        if(id == '' || id == undefined || id == null || isNaN(id) || id <=0){
            return message.ERROR_REQUIRED_FIELDS //400
        }else{
            dadosgenero = {}

            let resultgenero = await generoDAO.selectByIdgenero(parseInt(id))
            
            if(resultgenero != false || typeof(resultgenero) == 'object'){
                if(resultgenero.length > 0){
                     //Criando um JSON de retorno de dados para a API
                    dadosgenero.status = true
                    dadosgenero.status_code = 200
                    dadosgenero.genero = resultgenero

                    return dadosgenero //200
                }else{
                    return message.ERROR_NOT_FOUND //404
                }
            }else{
                return message.ERROR_INTERNAL_SERVER_MODEL //500
            }
        }

    } catch (error) {
        return message.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }
}



module.exports = {
    inserirGenero,
    atualizarGenero,
    excluirGenero,
    listarGenero,
    buscarGenero
} 