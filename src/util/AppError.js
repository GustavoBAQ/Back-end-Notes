//Tratamento de exeção. Essa classe foi criada para previnir que erros futuros não pare a aplicação

class AppError{
 message;
 statusCode

    constructor(message, statusCode = 400){
      this.message = message
        this.statusCode = statusCode
        
    }


}

//App error é como uma forma, ele irá criar a estrutura do código

module.exports = AppError