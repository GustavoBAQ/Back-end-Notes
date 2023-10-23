const {Router} = require("express")
//Estamos importando a função Router do express

const UserController = require("../controllers/userController")
const UserAvatarController = require("../controllers/userAvatarController")

const unsureAuthenticate = require("../middlewares/unsureAuthenticate")

const multer = require("multer")
const uploadConfig = require("../config/upload")

const userRouter = Router()
//Inicializando a função router

const upload = multer(uploadConfig.MULTER)

//importando controler responsavel pelo controle de dados da rota /users

const userController = new UserController()
//definindo as propriedades e métodos da classe UserControler em uma váriavel

const userAvatarController = new UserAvatarController()

//Utilizando o POST para mandar uma resposta para a request do  Insominia
userRouter.post("/", userController.create)
// Na raiz da rota em que o userRouter estará, será executada a função create do UserControler

//Definindo metodo http e resgantando o parametro
userRouter.put("/", unsureAuthenticate ,userController.update)
//Se na rota users for utilizado o metodo put, o middleware vai entrar em ação e caso seja correto vai enviar o percurso ao controller
// com o middleware não é necessário enviar o id do usuario, pois o middlewar o resgato no token

//Aqui estamos utilizando a rota "avatar", authenticando com o JWT, fazendo o upload da foto na TMP_FOLDER apenas uma vez e chamando a função para administrar
userRouter.patch("/avatar", unsureAuthenticate, upload.single("avatar"), userAvatarController.update )


module.exports = userRouter
//estamos exportando o user