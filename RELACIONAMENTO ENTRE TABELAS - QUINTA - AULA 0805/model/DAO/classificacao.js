/*******************************************************************************************************
 * Objetivo: Criar a comunicação com o Banco de Dados para fazer o CRUD de Classificações
 * Data: 11/02/2025
 * Autor: Marcel
 * Versão: 1.0
 ******************************************************************************************************/
//import da biblioteca do prisma client para executar os scripts SQL
const { PrismaClient } = require('@prisma/client')

//Instancia (criar um objeto a ser utilizado) a biblioteca do prisma/client
const prisma = new PrismaClient()

//Função para inserir um novo classificacao
const insertClassificacao = async function(classificacao){
  try {

      let sql = `insert into tbl_classificacao  ( sigla,
                                          nome,
                                          descricao
                                          ) 
                                          values 
                                        (
                                          '${classificacao.sigla}',
                                          '${classificacao.nome}',
                                          '${classificacao.descricao}'
                                        )`
      //console.log(sql)

      //Executa o scriptSQL no banco de dados e aguarda o retorno do BD para 
      //saber se deu certo                                  
      let result = await prisma.$executeRawUnsafe(sql)

      if(result)
          return true
      else
          return false
  } catch (error) {
      return false
  }
}

//Função para atualizar um classificacao existente
const updateClassificacao = async function(classificacao){
  try {
      let sql = `update tbl_classificacao set     sigla             = '${classificacao.nome}',
                                                  nome              = '${classificacao.duracao}',
                                                  descricao         = '${classificacao.sinopse}'
                                            where id = ${classificacao.id}                
                            `
      let resultclassificacao = await prisma.$executeRawUnsafe(sql)

      if(resultclassificacao)
        return true
      else
        return false
  } catch (error) {
    return false
  }
}

//Função para excluir um classificacao existente
const deleteClassificacao = async function(id){
  try {
    let sql = `delete from tbl_classificacao where id = ${id}`

    let result = await prisma.$executeRawUnsafe(sql)

    if (result)
      return true
    else 
      return false
  } catch (error) {
    return false
  }
}

//Função para retornar todos os classificacaos existentes
const selectAllClassificacao = async function(){

    try {
      //ScriptSQL para retornar todos os dados
      let sql = 'select * from tbl_classificacao order by id desc'

      //Executa o scriptSQL no BD e aguarda o retorno dos dados
      let result = await prisma.$queryRawUnsafe(sql)

      if(result)
        return result
      else
        return false

    } catch (error) {
      return false
    }
}

//Função para buscar um classificacao pelo ID
const selectByIdClassificacao = async function(id){
  try {
    let sql = `select * from tbl_classificacao where id = ${id}`

    let result = await prisma.$queryRawUnsafe(sql)

    if (result)
      return result
    else 
      return false
  } catch (error) {
    return false
  }
}

module.exports = {
    insertClassificacao,
    updateClassificacao,
    deleteClassificacao,
    selectAllClassificacao,
    selectByIdClassificacao
} 