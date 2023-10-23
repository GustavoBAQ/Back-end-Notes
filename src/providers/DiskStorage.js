
//API integrada ao nodeJS que permite a minipulação de arquivos do computador
const fs = require("fs")
const path = require("path")
const configUpload = require("../config/upload")
const AppError = require("../util/AppError")


class DiskStorage{
    async save(file){
        //O fs esta executando uma função chamada rename e essa função é responsável por mudar arquivos de lugar
        await fs.promises.rename(
            path.resolve(configUpload.TMP_FOLDER, file),
            path.resolve(configUpload.UPLOAD_FOLDER, file)
        )
        //Acima esta ocorrendo a transferencia do "file" de TMP_FOLDER para UPLOADS_FOLDER

        return file
    }

    async delete(file){
        //recuperando o caminho em que o "file" está e o recuperando
        const fileName = path.resolve(configUpload.UPLOAD_FOLDER, file)

        //Grave na mémoria: SEMPRE QUE FOR TRABALHAR COM MANIPULAÇÃO DE DADOS, USE TRY E CATCH PARA TRATAMENTO DE EXEÇÕES
        try{
            //Verifica o status do arquivo, caso de algum erro entrará no catch como medida de prevenção    
            await fs.promises.stat(fileName)
        }catch{
            return
        }

        //Caso não de nenhum erro o arquivo será excluido
        await fs.promises.unlink(fileName)


        
    }

}

module.exports = DiskStorage


