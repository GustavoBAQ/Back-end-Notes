const knex = require("../database/knex")

class tagsController{
    async index(req, res){
        const user_id = req.user.id
        const viewTags = await knex("tags").where({user_id}).groupBy("name")

        return res.json(viewTags)
    }
}

module.exports = tagsController