const {Router} = require("express")
const userRouter = require("./user.routes")
const notesRouter = require("./notes.routes")
const tagsRouter = require("./tags.routes")
const sessionRouter = require("./session.routes")

const routes = Router()

routes.use("/users", userRouter)
//Quando for for enviado os dados no /users, sera executado o post do userRouter na raiz de seu contexto (No caso será /users), nesse post será utilizado a função creat do UserController

routes.use("/notes", notesRouter)
//Quando ocorrer algum evento na url "/notes" será usado o notesRouter

routes.use("/tags", tagsRouter)

routes.use("/session", sessionRouter)
module.exports = routes
//Estamos exportando o routes de maneira global