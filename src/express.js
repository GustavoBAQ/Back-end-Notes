//Importando a biblioteca responsavel por não quebrar o código após algum erro
require("express-async-errors")

//Importando o cors
const cors = require("cors")

//Importando o AppError para tratar os erros e não ocorrer a quebra do funcionamento do código
const AppError = require("./util/AppError")

//Importando as rotas 
const routes = require("./routes/")

//Importando o arquivo de conexão ao banco de dados
const migrationsRun = require("../src/database/sqlite/migrations")

//Estamos inportando o express com a funcionalidade require
const express = require("express")

//Recebendo as configurações de upload 
const uploadsConfig = require("./config/upload")

//Inicializando o express e passando suas propriedades para o server
const server = express()

//Habilitando o cors para atender as requisiçõs do front end !IMPORTANTE 
server.use(cors())

server.use(express.json())
//Estamos definindo ao express que iremos usar o formato JSON

//Definindo configuração de requisição estatica para demonstrar foto no insominia
server.use("/files", express.static(uploadsConfig.UPLOAD_FOLDER))

server.use( routes)
// o express estará iniciando "route" que está vindo do index na pasta routes

//Definindo a porta operante do express
const PORT = 3333;

//Executando o código de conexão com o banco de dados

migrationsRun()

//Criando estrura exclusiva para obter o erro e trata-lo com o AppError
server.use((error, requeste, response , next) =>{
    if(error instanceof AppError){
        console.log(error);
        console.log(AppError);
        return response.status(error.statusCode).json({
            status: "Error",
            message: error.message
        })
    }
    
    return response.status(500).json({
        status: "Error",
        message: "Internal Server Error"
    })
})


//Definindo para o express a porte em que irá operar
server.listen(process.env.SERVER_PORT || 3334, ()=> console.log(`Server ONLINE in Port: ${PORT}`))

