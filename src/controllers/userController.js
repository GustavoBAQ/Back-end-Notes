const AppError = require("../util/AppError")

//Importando Função de conxão ao banco de dados
const sqliteConect = require("../database/sqlite")

//Importando funcionalidade dentro da biblioteca bcrypt
const {hash, compare} = require("bcrypt")

//UserControler é uma classe que recebe os dados e administra-os
class UserController{
   
    async create(request, response){
        const {name, email, password} = request.body

        // //Caso não seja enviado o name o código ira lançar para o AppError uma mensagem de erro
        // if(!name){
        //     throw new AppError("Nome obrigátorio")
        // }
        console.log(name);

        //Recuperando a resposta da função que é o arquivo database, responsavel pela administração do banco
        const database = await sqliteConect()

        //Varivel responsavel por verificar no banco de dados se existe algum registro com meesmo email
        const userCheck = await database.get("SELECT * FROM users WHERE email = (?)", [email])
        //No Js se consiste o método em que é criado essa interrogação que será substituida pelos elementos do vetor, caso haja mais de uma interrogação significa que terá mais de um arquivo para que ela seja substituida, a substituição consiste baseado na order nos arquivos no vetor

        //Caso encontre algum registro acionará o App erro que responderá que existe o registro
        if(userCheck){
            throw new AppError("Esse email já está em uso!")
        }

        //Cryptografando senha e a passando para a varivel
        const hashedPassword = await hash(password, 8)
        //Dentro do hash existe dois fatores, o primeiro é a senha e o segundo é o grau de complexidade da cryptografia

        await database.run("INSERT INTO users (name, email, password) VALUES (?,?,?)", [name, email, hashedPassword])




        //Caso não haja registro, será retornado o statusCode de criado e um json vazio
        return response.status(201).json()
    }

    async update(request, response){
      
        //Recebendo a requisição via body
        const {name, email, password, old_password} = request.body
        
       //RECEBENDO ID PELO user_id que foi inplementado no request pelo middlware
       const user_id = request.user.id
        
        //Conectando com o banco de dados
        const database = await sqliteConect()

        //Verficando se existe esse ususário no banco de dados
        const userVerifc = await database.get("SELECT * FROM users WHERE id = (?)", [user_id])
        
        //Caso não tenha o usuário irá acionar o AppError
        if(!userVerifc){
           
            throw new AppError("Usuário não foi encontrado")
        }

        //Verificando se o email que ela deseja alterar não esta em uso
        const emailVerific = await database.get("SELECT * FROM users WHERE email = (?)", [email])

        //Se o emailVerific existir e ele for diferente ao que o usuario está utilizando
        if(emailVerific && emailVerific.id !== userVerifc.id){
            throw new AppError("Email já esta sendo utilizado por outra pessoa")
        }

        //Caso o email seja do usuario que enviou, será atualizado os componentes


        // O usuário deve informa a nova senha e a sua senha antiga para a troca
        if(password && !old_password){
            //Caso a senha antiga não seja inserida
            throw new AppError("Ensira sua senha atual para confirmação")
        }
        

        //Caso ele insira as duas senhas 
        if(password && old_password){

            //compare é uma função bcrypt na qual tem o poder de comparar uma string não cryptografada com uma string cryptografada
            const passComapare = await compare(old_password, userVerifc.password)
            
            //Caso a comparação seja falsa
            if(!passComapare){
                throw new AppError("A senha atual está incorreta")
            }

            //Caso a nova senha seja idêntica a senha anterior
            if(password == userVerifc.password){
                throw new AppError("A nova senha é a mesma que a antiga, caso queira mudar, escolha outra")
            }

            //Caso nenhuma das condicionais não sejam verdadeiras, userVerific.password receberá a nova senha cryptografada 
            userVerifc.password = await hash(password, 8)
        }


        //Norma utilizada em vídeo, utiizando somente o name e o email tbm funcionou
        userVerifc.name = name
        userVerifc.email = email

        //Realizando o Update
        await database.run(`
            UPDATE users SET 
            name = ?,
            email = ?,
            password = ?,
            update_at = DATETIME('now')
            WHERE id = ?
        `, [userVerifc.name, userVerifc.email,userVerifc.password, user_id])



        response.json()
        

    }
}

module.exports = UserController