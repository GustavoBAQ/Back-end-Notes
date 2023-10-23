//ARQUIVO DE CONFIGURAÇÃO DO UPLOADS DE IMAGENS

const path = require("path")
const multer = require("multer")
const crypto = require("crypto")

//PASTA TEMPORARIA ONDE OS ARQUIVOS IRÃO CHEGAR
const TMP_FOLDER = path.resolve(__dirname, "..", "..", "temp")

//PASTA ONDE IRÁ OCORRER O UPLOAD
const UPLOAD_FOLDER = path.resolve(TMP_FOLDER, "uploads")


const MULTER = {
    //Abrimos o armazenamento do multer e agora se deve configurar como vai operar
    storage: multer.diskStorage({
        //Destinação de onde chega os arquivos
        destination: TMP_FOLDER,
        //estrutura para montagem de nome para o arquivo evitando a repetição 
        filename(req, file, callback){
            //Criando um Hash com 10 bytes e transformando em uma string em formato hexadecimal
            const fileHash = crypto.randomBytes(10).toString("hex")
            //Construindo o nome do arquivo utilizando o crypto e o nome original do arquivo
            const fileName = `${fileHash}-${file.originalname.replaceAll("jpeg","png")}`

            //retornando a callback com o filename
            return callback(null, fileName)
        }

    })
}

module.exports = {
    TMP_FOLDER, 
    UPLOAD_FOLDER, 
    MULTER
}

