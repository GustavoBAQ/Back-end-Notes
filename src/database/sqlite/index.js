//importar os arquivos necessários para o banco de dados
const sqlite = require("sqlite")
const sqlite3 = require("sqlite3")

//importar funcionalidade do node responsável por cuidar de rotas
const patch = require("path")

//Criar função assíncrona, pois estamos tratando de uma conexão que pode haver algum delay
async function sqliteConect(){

    //Vamos abrir a conexão com o banco de dados
const database = sqlite.open({
        //criar arquivo necessário para armazenar dados no banco de dados
        filename: patch.resolve(__dirname, "..", "database.db"),
        //Patch está resolvendo a rota. Com "__dirname" ele está espcíficando o local que o arquivo esta, com o ".." está saindo desse diretório e caso não hajá o arquivo database.db, ele será criado 

        //defindo os drivers do database
        driver: sqlite3.Database
    })

    //vamos retornar o arquivo que esta ocorrendo a conexão para fazer operações no database
    return database
}

module.exports = sqliteConect