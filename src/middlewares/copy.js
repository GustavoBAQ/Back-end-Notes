const jwtConfig = require("../config/auth")
const {verify} = require("jsonwebtoken")
const AppError = require("../util/AppError")

const unsureAuthentication = (req, res, next) =>{
    const tokenVerify = req.headers.authentication

    if(!tokenVerify){
        throw new AppError("Token inválido")
    }

    const [, token] = tokenVerify.aplit(" ")

    try{

        const {sub: user_id} = verify(token, jwtConfig.jwt.secret)

        req.user ={
            id: Number(user_id)
        }

        return next()
    }catch{

    }
}