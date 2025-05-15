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

//Função para inserir um novo Genero
const insertGenero = async function(Genero){
  try {

      let sql = `insert into tbl_genero  ( 
                                          nome
                                          
                                          ) 
                                          values 
                                        (
                                        
                                          '${Genero.nome}'
                                       
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

//Função para atualizar um Genero existente
const updateGenero = async function(Genero){
  try {
      let sql = `update tbl_genero set     
                                                  nome              = '${Genero.duracao}'
                                                  
                                            where id = ${Genero.id}                
                            `
      let resultGenero = await prisma.$executeRawUnsafe(sql)

      if(resultGenero)
        return true
      else
        return false
  } catch (error) {
    return false
  }
}

//Função para excluir um Genero existente
const deleteGenero = async function(id){
  try {
    let sql = `delete from tbl_genero where id = ${id}`

    let result = await prisma.$executeRawUnsafe(sql)

    if (result)
      return true
    else 
      return false
  } catch (error) {
    return false
  }
}

//Função para retornar todos os Generos existentes
const selectAllGenero = async function(){

    try {
      //ScriptSQL para retornar todos os dados
      let sql = 'select * from tbl_genero order by id desc'

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

//Função para buscar um Genero pelo ID
const selectByIdGenero = async function(id){
  try {
    let sql = `select * from tbl_genero where id = ${id}`

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
    insertGenero,
    updateGenero,
    deleteGenero,
    selectAllGenero,
    selectByIdGenero
} 