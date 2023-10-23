const knex = require("../database/knex")
const AppError = require("../util/AppError")
const { compare } = require("bcrypt")
const authJwt = require('../config/auth')
const {sign} = require("jsonwebtoken")


class SessionController {
    async create(req, res) {
        const { email, password } = req.body
        
        //Vamos filtrar na tabela users onde algum registro da coluna email corresponde com o valor enviado e sempre iremos obter o primeiro registro do resultado
        const user = await knex("users").where({ email }).first()
        
        if (!user) {
            throw new AppError("E-mail e/ou Senha incorreto(s)", 401)
        }
             
        console.log(email);
        console.log(password);
        const passwordMachted = await compare(password, user.password)
        // .catch(error => console.log(error))

        if (!passwordMachted) {
            throw new AppError("E-mail e/ou Senha incorreto(s)", 401)
        }

        //Se foi chegou até aqui quer dizer que o usuario esta verificado é pode criar uma sessão, logo vamos criar um JWT para que possa criar uma seção

        const {secret, expiresIn} = authJwt.jwt
        
        const token = sign({}, secret, {
            subject: String(user.id),
            expiresIn
        } )

        //Lembrese o subject esta enviando o user.id para dentro do token



        res.json({ user, token })

    }
}

module.exports = SessionController




