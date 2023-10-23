const {Router} = require("express")
const TagsController = require("../controllers/tagsController")

//Importando Middleware
const unsureAuthenticate = require("../middlewares/unsureAuthenticate")


const tagsRouter =  Router()

const tagsController = new TagsController()

tagsRouter.get("/",unsureAuthenticate, tagsController.index)

module.exports = tagsRouter