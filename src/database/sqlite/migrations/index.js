//Importando arquivo de conexão com o banco de dados
const sqliteConect = require("../../sqlite")

//importando arquivo que possui os dados para a criação de tabela
const creatUsers = require("./creatUsers")

//função que vai fazer as migrations serem inicializadas
async function migrationsRun(){
    //Variavel que irá armazenar as tabelas do bd
    const schmeas = [
        creatUsers
    ].join('');
    //Join esta agrupando os dados e os separando com espaços

    //Estamos executando o arquivo de conexão do banco de dados e em sua resposta estamos executando os arquivos das tabelas
    
    sqliteConect()
    .then(db => db.exec(schmeas))
    .catch(error => console.error(error))
}

module.exports = migrationsRun