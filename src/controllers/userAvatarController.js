const knex = require("../database/knex")
const DiskStorage = require("../providers/DiskStorage")
const AppError = require("../util/AppError")

class UserAvatarController{
    async update(req, res){
        
        const user_id = req.user.id
        const fileAvatar = req.file.filename
        const diskStorage = new DiskStorage()
        
        const user = await knex("users").where({id: user_id}).first()
        
        if(!user){
            throw new AppError("Usuário não authenticado")
        }
        
        if(user.avatar){
            console.log(user.avatar);
            await diskStorage.delete(user.avatar)
        }
        
        // console.log(fileAvatar);
        const fileNameAvatar = await diskStorage.save(fileAvatar)
        user.avatar = fileNameAvatar

        await knex("users").update(user).where({id: user_id})

        res.json(user)
    }
}

module.exports = UserAvatarController