/*****************************************************************************************
 * Objetivo: Arquivo de configuração para padronizar mensagens e status code da API
 * Data: 18/02/2025
 * Autor: Marcel
 * Versão: 1.0
 *****************************************************************************************/

/****************************** STATUS CODE DE MENSAGENS DE ERRO *************************/
const ERROR_REQUIRED_FIELDS             = {status: false, status_code: 400, message: "Não foi possível realizar a requisição, pois existem campos obrigatórios que não foram preenchidos ou não atendem a quantidade de caracteres!!!"}
const ERROR_INTERNAL_SERVER_MODEL       = {status: false, status_code: 500, message: "Devido a erros internos no servidor da MODEL, não foi possivel processar a requisição!!!"}
const ERROR_INTERNAL_SERVER_CONTROLLER  = {status: false, status_code: 500, message: "Devido a erros internos no servidor da CONTROLLER, não foi possivel processar a requisição!!!"}
const ERROR_CONTENT_TYPE                = {status: false, status_code: 415, message: "Não foi possível processar a requisição, pois, o tipo de dado encaminhando não é processado pelo servidor. Favor encaminhar dados apenas no formato JSON !!!"}
const ERROR_NOT_FOUND                   = {status: false, status_code: 404, message: "Não foram encontrados itens de retorno!!!"}
/***************************** STATUS CODE DE MENSAGENS DE SUCESSO **********************/
const SUCCESS_CREATED_ITEM              = {status: true, status_code: 201, message: "Item criado com sucesso!!!"}
const SUCCESS_DELETED_ITEM              = {status: true, status_code: 200, message: "Item excluído com sucesso!!!"}
const SUCCESS_UPDATED_ITEM              = {status: true, status_code: 200, message: "Item atualizado com sucesso!!!"}

module.exports = {
    ERROR_REQUIRED_FIELDS,
    ERROR_INTERNAL_SERVER_CONTROLLER,
    ERROR_INTERNAL_SERVER_MODEL,
    ERROR_CONTENT_TYPE,
    ERROR_NOT_FOUND,
    SUCCESS_CREATED_ITEM,
    SUCCESS_DELETED_ITEM,
    SUCCESS_UPDATED_ITEM
} 