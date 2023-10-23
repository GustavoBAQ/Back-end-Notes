const config = require("../../../knexfile")
const knex = require("knex")

//Criando conexão Knex e inserindo as configuração de conxão
const connection = knex(config.development)

module.exports = connection