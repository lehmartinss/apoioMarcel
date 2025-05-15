/*******************************************************************************************************
 * Objetivo: Criar a comunicação com o Banco de Dados para fazer o CRUD de filmes
 * Data: 11/02/2025
 * Autor: Marcel
 * Versão: 1.0
 ******************************************************************************************************/
//import da biblioteca do prisma client para executar os scripts SQL
const { PrismaClient } = require('@prisma/client')

//Instancia (criar um objeto a ser utilizado) a biblioteca do prisma/client
const prisma = new PrismaClient()

//Função para inserir um novo Filme
const insertFilme = async function(filme){
  try {

      let sql = `insert into tbl_filme  ( nome,
                                          duracao,
                                          sinopse,
                                          data_lancamento,
                                          foto_capa,
                                          link_trailer,
                                          id_classificacao
                                        ) 
                                          values 
                                        (
                                          '${filme.nome}',
                                          '${filme.duracao}',
                                          '${filme.sinopse}',
                                          '${filme.data_lancamento}',
                                          '${filme.foto_capa}',
                                          '${filme.link_trailer}',
                                          '${filme.id_classificacao}'
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

//Função para atualizar um Filme existente
const updateFilme = async function(filme){
  try {
      let sql = `update tbl_filme set     nome            = '${filme.nome}',
                                          duracao         = '${filme.duracao}',
                                          sinopse         = '${filme.sinopse}',
                                          data_lancamento = '${filme.data_lancamento}',
                                          foto_capa       = '${filme.foto_capa}',
                                          link_trailer    = '${filme.link_trailer}',
                                          id_classificacao= '${filme.id_classificacao}'
                            where id = ${filme.id}                
                            `
      let resultFilme = await prisma.$executeRawUnsafe(sql)

      if(resultFilme)
        return true
      else
        return false
  } catch (error) {
    return false
  }
}

//Função para excluir um Filme existente
const deleteFilme = async function(id){
  try {
    let sql = `delete from tbl_filme where id = ${id}`

    let result = await prisma.$executeRawUnsafe(sql)

    if (result)
      return true
    else 
      return false
  } catch (error) {
    return false
  }
}

//Função para retornar todos os Filmes existentes
const selectAllFilme = async function(){

    try {
      //ScriptSQL para retornar todos os dados
      let sql = 'select * from tbl_filme order by id desc'

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

//Função para buscar um Filme pelo ID
const selectByIdFilme = async function(id){
  try {
    let sql = `select * from tbl_filme where id = ${id}`

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
    insertFilme,
    updateFilme,
    deleteFilme,
    selectAllFilme,
    selectByIdFilme
} 