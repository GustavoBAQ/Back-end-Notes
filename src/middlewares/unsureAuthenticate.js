const {verify} = require("jsonwebtoken")
const AppError = require("../util/AppError")
const authJwt = require("../config/auth")

const unsureAuthenticate = (req, res, next) =>{

    //Verificando se existe o token dentro do header
    const tokenVerify = req.headers.authorization
    
    if(!tokenVerify){
        throw new AppError("Token Incorreto")
    }
    //Caso exista transforme oque tem dentro dele em um vetor determinado por espaço
    //dentro do tokenVerify = "bearer" "xxxxx" <-token
    //bearer é um método do insominia para adicionar o token e verifica-lo nas rotas
    const [, token] = tokenVerify.split(" ")
    try{
        
        //Verificando a integridade do token, caso seja verdadeiro respondera com um id
        const {sub: user_id} = verify(token, authJwt.jwt.secret)

        //Esta criando dentro do request um local chamado user e enviando a informação como um number
        req.user ={
            id: Number(user_id)
        }

        console.log(user_id)


        return next()

    }catch{
        throw new AppError("Token Inválido")
    }
    


}

module.exports = unsureAuthenticate