const {Router} = require("express")

//Importando o Controller
const NotesController = require("../controllers/notesController")

//Importando Middleware
const unsureAuthenticate = require("../middlewares/unsureAuthenticate")


//Recebendo os métodos da funcionalidade Router do express
const notesRoutes = Router()

//Executando um novo NotesController
const notesController = new NotesController()

//Utilizando middleware em todas as rotas de uma vez
notesRoutes.use(unsureAuthenticate)


//Após ocorrer algum evento na url "/notes" e ser enviado para cá. Se o evento for um método post será executado o notesController.creat
notesRoutes.post("/", notesController.create)

//Caso ocorra algum evento relacionado ao get, será redirecionado ao notesController
notesRoutes.get("/:id", notesController.show)

//Caso ocorra algum evento relacionado a delete, serpa redirecionado para o notesController.delete
notesRoutes.delete("/:id", notesController.delete)

//Caso ocorra algum evento relacionado ao get sem que seja passado algum parametro, será redirecionado para notesController.index
notesRoutes.get("/", notesController.index)
module.exports = notesRoutes