##### Revisão De Tópicos importantes que não se pode resolver decorando

### 1 - Authenticação do usuário

## Visão geral

* Primeiro ocorrerá a construção do token que será enviado como resposta **sessionController | *Back-end***

* Segundo ocorrerá o envio de uma requisição para criar o token **auth.j | *FRONT-END* x**

* Terceiro Ocorrerá a comprovação que o token foi gerado **unsureAuthentication.js | *Back-end: Middleware***

* Quarto ocorrerá o compartilhamento das informações pela aplicação toda **Todas as rotas | *Back-end***


## Construção do JWT

A criação do token JWT consiste em primeiramente  definir as configurações do Token.

Essa configuração pode ser feita em um objeto especificando o "secret" e o "expireIn"

    module.exports = {
        jwt{
            secret: "Default",
            expiresIn: "1d"
        }
    }

Agora vem a criação do TOKEN. A criação do token  consiste em uma funcionalidade que é criada dentro da bibliotéca do JWT.

Utilizando a funcionalidade "sign" criamos a partir dessa estrutura:

const {secret, expiresIn} = confJwt.jwt

const token = sign({}, secret, {
    subject: String(user.id),
    expiresIn
})

Dentro do token foi armazenado o id do usuario


## Envio da requisição para a criação do token

1° - Será enviado ao back-end os dados do usuario para comprovor que ele realmente consta no banco de dados

2° - Será feito uma tentativa de enviar os dados do usuario e receber uma responsta que fornecerá todos os dados de login do usuario e o token

3° - Será armazenado os dados do usario e o token no localStorage

4° - Será enviado para a *api.defaults.header.common["Authorization"]*o token formatado para `Bear ${token}`

- logo mais o `Bear` será descartado pelo back-end

## Recebendo a authorização no Middleware

1° - O middleware verá se realmente chegou alguma authorização para ele pela *requisicao.headers.authorizantion*

2° - Caso tenha a athorização, será removido o `Bear` e retirado somente o Token com a funcionalidade split

**cosnt [, token] = tokenVerify.split(" ")**

3° - Irá ocorrer a obtenção do user_id atravéz de uma funcionalidade da biblioteca do JWT *verify*, verificando o token retirado com o *secret* dentro das configurações do JWT

4° - Será criado dentro da requisição um novo campo chamdo *user* e esse campo terá uma propriedade chamada de *id*

## Compartilhamento do middlware em todas as rotas

O middlware será compartilhado em quase todas as rotas, tirando somente a rota de entrar na aplicação *SignIn* e a rota de criar um novo usuário *SingUp*

Para que o middleware seja compartilhado em todas as rotas automáticamente será usado um **rotas.use(unsureAuthenticate)** antes de todas as requisições *http*

Para utilizar o middleware em uma rota única, será necessário em na rota http e adicionar o middleware antes do Controller designado para aquela requisição **rota.post(unsureAuthenticate, rotaController.create)**.

## Como Recuperar O Id do Usuario Dentro Da Requisição

Como foi visto no tópico *Recebendo a authorização no Middleware* foi criado dentro do req uma noca área onde foi enviado o id do usuario, esse id pode ser recuperado utilizando o código: **const user_id = req.user.id** 
Assim o sistema não precissa ficar solicitando o id do usuário.

#####################################################################################################################


## 2 - Upload de Imagens

## Visão Geral

- Primeiro será feita a configuração do *Multer* e das pastas *TEMP_FOLDER* e *UPLOAD_FOLDER* **Upload.JS**

- Segundamente será criada a configuração de salvar e remover uma imagem **DiskStorage.js**

- Terceiro será feito o update do registro do usuário no banco de dados

## Configuração Do Upload

1° - Será criada a pasta temporaria que com ajuda do path.resolve será direcionada a criar uma nova pasta no sistema chamada de "temp"

2° - Será criada uma pasta de uploads que com ajuda do path.resolve será direcionada a uma nova pasta chamada "uploads" dentro da pasta"temp"

3° - Será feita a configuração do Multer (Multer é um Middleware que vai interceptar o arquivo e salva-lo em uma pasta do disco).
Dentro do multer tera uma propriedade *storage* e dentro dessa propriedade é onde vamos fazer as configurações do multer.

const MULTER = {
    //diskStorage é uma função de gerenciamento dentro do multer
    stroage: multer.diskStorage({
        
        //Se trata de onde o arquivo vai chegar para que o multer possa fazer a sua configuração
        destination: TEMP_FOLDER

        //função do multer para configurar o nome do arquivo
        filename(req, file, callback){

            //Criando uma sequencias de codigos aleátorios
            const fileHash = crypto.randomBytes(10).toString("hex)

            //Definindo um nome com o fileHash + o nome original
            const fileName = `${fileHas}-${file.originalname} `

            //Retornando para a função o novo nome
            return callback(null, filename)
        }
    })
}


## Configurando o Save e Remove das imagens

- Para manipularmos arquivos do computados vamos utilizar uma API integrada ao NodeJs chamada de *fs*

- Será criada uma classe que terá as propriedades: save e delete

- Na propriedade *save* será recebido o nome do arquivo e será utilizada uma estrutura do fs que utilizará uma funcionalidade chamada de *rename* essa funcionalidade é reponsável por mover arquivos de lugar.
Essa funcionalidade irá entra dentro das configurações de *Upload* e moverá os arquivos da pasta *TEMP_FOLDER* para a pasta *UPLOAD_FOLDER*

await fs.promisse.rename(
    path.resolve(configureUpload.TEMP_FOLDER, file)
    path.resolve(configureUpload.UPLOAD_FOLDER, file)
)
 

- Na propriedade *remove* será recebido o nome do arquivo, então será pego  arquivo pelo path e será verificado o estado do arquivo por uma funcionalidade *stat* do *fs*, logo depois será deletado o arquivo utilizando outra funcionalidade do *fs* o *unlink*

## Update do Avatar

O update de avatar consiste em averiguar se o usuário tem algum avatar em seu registro, caso tenha utilizaremos a propriedade *remove* da classe *DiskStorage* e apagaremos a determinada foto do sistema, caso o usuário não tenha nenhum avatar atrelado em seu registro, então vamos utilizar a propriedade *save* do *DiskStorage* e salvaremos a imagem dentro do sistema e logo após iremos fazer um update no banco de dados inserindo um novo avatar
