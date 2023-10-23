## 1- Precimos que a nossa aplicação seja capaz de receber requisições, processa-las e reponder, utilizaremos o framework web express para lidar com requisições http e web (Mais utilizado para lidar com requisições):

npm i express --save

## 2- Utilizando o express
    Para utilizar o express é necessário passar por alguns passos: importa-lo com o require; Inicializa-lo; definir em qual porta ele irá operar com listen
    *Pode ser observado no src/express.js*

## 2.1 - Executando o Express
    Para executar o express, precisamos executar o arquivo no qual ele foi definido que nesse caso é o "express.js"

    npm /src/express.js

    Ou podemos criar um script pré definido no package.json

    "run": "./src/express.js"

## 3- Rotas http
    As rotas são um meio de comunicação entre o front End e a API. A rota possui 5 métodos: Get (leitura), Post(criação/postar), Put(Atualização), Patch(Atualização parcial) e Delete(Exclusão)

## 3.1 - Implementação do método get no express 
    Após e fazer tudo acima, averá uma varivel contento o express executado, pegaremos essa varivel e faremos o seguinte;

    const servidor = express()

        servidor.get("/", (req, res) =>{
            res.send("Bom dia")
        })
    *Significa que a resposta dada ao servior ao fazer a requisição será aquela mensagem*

## 4 - Params
##     4.1 - Rout Params
        Rout Params consistem na transferência de dados pela URL

        ex: http://www.products/5
         //   o 5 pode ser considereado o id de um produto e será passado junto com a requisição do navegador

        O parâmetro pode ser capturado assim: req.params.nome_do_parâmetro

        const serv = express()

            serv.get("/products/:id", (req, res) =>{
                res.send(`O id do seu prduto é: ${req.params.id`})
            
            })
        
        No exemplo acima demonstra que o parâmetro pode ser definido com ":id" esse método é utilizado para diferenciar um parâmetro de alguma caminho de rota

   ## 4.2 - Query Params
        Query Params é outra maneira de Enviar valores a API
    
    ex da URL: https://www.livros/user?pages=5&limit=2## 1

    O Query Params é atribuido após um sinal de interrogação por uma ou mais váriaveis, para adicionar mais de uma é necessário utilizar o &

    O parâmetro pode ser capturado da seguinte forma:

        const sever = express()

        server.get("/users", (req, res) =>{
            const {pages, limit } = req.query
            res.send(`A pagina ${pages}. Com o limite de ${limit})
        })

   ## 4.3 - Diferença entre Rout Params e Query Params
        Como o Rout Params é inserido no intuito de ser enviado, ele acaba se tornando essencial para que a resposta seja enviada. Já o Query Params não é obrigátorio para o funcionamento do site, ele acaba se tornando opcional

## 5 - Utilizando nodemon
    nodemon pode ser consideredo uma depêndencia de desenvolvimento, ou seja, ele é utilizado somente quando o código está em desenvolvimento.
    O nodemon é uma depêndencia que proporciona um auxílio na hora de recarregar o site, ou seja, após fazer uma alteração no código o nodemon recarrega o servidor automáticamente, sendo disnecessário parar o servidor e aciona-lo novamente.
    Para poder utilizar é necessário o definir no script do package.json na parte de script

        "dev":"nodemon ./src/express.js
    
    Para roda-lo é nescessário utilizar a função "run", pois ele não é a inicialização padrão

        npm run dev

## 6- Utilizando o método POST
    
        Por padrão o navegador não reconhece o método POST, apenas o GET.
        POST é um método de tranferência de dados, pode ser comparado com as requests do GET, porém seus dados não ficam presentes na URL o tornando um pouco mais seguro, porém com uma maior demora

        utilização:
            const servidor = express()

            servidor.post("/users", (res, res) =>{

            })'

##   6.1- Body Params
        body Parmas é um tipo de parâmetro recebido pelo POST e geralmente se encontra no formato JSON,logo para utilizar esse tipo de parâmetro é necessário informar ao express que estamos utilizando o formato JSON em nossas aplicações:

            const server = express()
            server.use(express.json())

            server.post("/user", (req, res)=>{
                const {login, email, passeword} = req.body
                res.send({login, email, passeword})
            })

        Acima estamos recebendo os dados em formato JSON e após receber, estamos devolvendo novamente os dados em JSON
    
## 7 - Reorganizando o código
    **Oque fizemos com o código?**
        Criamos uma pasta chamada "src" onde iremos estruturar o código, nesta pasta criamos outra chamada "routes", na pasta routes iremos definir todas as rotas da aplicação.

#     Estruturação das pastas route
    
    DENTRO DO ARQUIVO USER.ROUTES:
    
    Definimos um arquivo js como "user.routes", ele será responsável pela rota de usuários. Nele importamos o {Router} dentro do express e inicializamos por meio de uma váriavel chamada "userRoutes", logo após definimos um post que receberá as informações e exportamos a varivel "userRoutes" em meio ao <module.export = userRoutes>

    import {Router} = require('express')

    const userRouter = Router

    userRouter.post("/", (req, res) =>{
        const {login, email. password} = req.body
        res.send({login, email. password})
    })

    module.export = userRouter

    DENTRO DO INDEX:
        O index está servindo como ponto de agrupamento para todas as funcionalidades das rotas.
        No index está sendo feita novamente a importação do Router dentro do express e da variacel userRouter do user.routes.js, executando o Router em uma variavel chamada "routes" e sendo feita a construção que será passada para o express.js

        const {Router} = require("express")
        const {userRouter} = require("./user.routes.js")

        const routes = Router()

        routes.use("/users", userRouter) 

        modules.export = routes

    DENTRO DO EXPRESS.JS:

        Dentro do express.js estariamos importando o "routes" e somante utilizando um ".use"

        const express = require("express")
        const routes = require("./src/routes/)
        const app = express()

        app.use(routes)

## 8 - Controllers
    Oque são Controlles? São classes que agrupam métodos especificos para a gerencia daquele assunto, padronizadamente os controllers sempre devem ter no máximo 5 métodos e caso seja preciso mais métodos é recomendável a criação de um novo controler.

    Por padrão o controller deverá ter 5 métodos e eles são:


    class userController {
        
        *index - GET -> lista os registros
        *show - GET -> lista um registro espécifico
        *creat - POST -> cria um registro
        *update - PUT -> atualiza um registro
        *delete - DELETE -> remove um registro
    }

    Esses métodos do controller devem ser respeitados


## 9 - User Controller 
    Outra reorganização do código. Em vez de lidar com as informações diretamente do user.routes.js , foi criado o userController e passado a tarefa de lidar com os requests e responses

#        DENTRO DO user.routes.js:

        import {Router} = require("express")
        import {UserControler} = require("../controllers/userController)

        const userRoutes = Router()

        const userController = new UserController()

        userRoutes.post("/", userControler.create)
        
## 10 - HTTP CODES
    Os códigos HTTP remetem a ação entre o servidor e cliente, sendo classificados por faixas:

   ## 100 - Informativo (Ocorre quando ainda ocorre o processamento)

    200 - Sucessos (Caso a trânsferencia seja um sucesso)

    300 - Redirecionamento (Caso ocorra algum direcionamento da dados)

    400 - Erro do cliente (Caso a requisição ocorra algum erro, não autorizamento e não haja oque foi requisitado)

    500 - Erro no servidor (Caso o servidor falhe em conluir a solicitação)

    ex de utulização:

    userRoutes.status(20## 1).send("/users)


## 11 - Middleware

    Oque é um middleware? Middleware é como se fosse um segurança que atua na rota entre a requisição e a função final.
    É uma função que possui controle sobre a requisição, sobre a resposta e até mesmo sobre a função que executará.

    Os middlewares podem: 
     
    * Executar qualquer código
    * Fazer mudanças nos objetos na requisição e resposta 
    * Encerrar o ciclo de solicitação-resposta
    * Chamar o próximo middleware na pilha

 ## 11.1 - Como utilizar o middleware
    O middler deve ser declarado como uma função comum
    O middleware irá receber a requisição, o direito de responde-la caso necessário e o next, que seria a próxima função que ele vai executar após middleware

    function myMiddleware(request, response, next){

        if(!request.body.isAdmin){
            return response.send({message: "Você não possui autorização para cadastrar usuários"})
                Caso o usuário não possua autorização o middleware irá retornar uma resposta e acabar com o código
        }


        next()
        É necessário executar a próxima função no middler, porque ela não iria mais executar
    }

    userRouter.post("/", myMiddleware, userControler.creat)
        Aqui estamos utilizando o middleware em uma função específica


## 12 - tratamento de exceções
    O tratamento de exceções consiste em prevenir que nenhum erro infurtunio acabe destruindo a aplicação, fazendo assim uma prevenção.

    Método base: 
    *Criar pasta util, para as utilidades
    *Criar o arquivo AppError.js
    *Definir uma classe AppError e trabalhar em cima dela

    DENTRO DO AppError.js:

    class AppError{
        message;
        statsCode;
        //Declarando para que o código saiba e tenha acesso a essas variaveis

        //contructor é uma função que será rodada automaticamente ao utilizar a class
        constructor(message, statsCode = 404){
            this.message = message;
            this.statsCode = statsCode

        }

    }

## 12.2 - Utilizando o tratamento de exceções

    Para trabalhar com tratamentos de exceções é necessário a biblioteca do express chamada de express-async-errors

    npm i express-async-errors --save

    Após instala-la é necessário importa-la no documento centrar da aplicação que seria o express.js. Essa biblioteca é necessária junto com o AppError que ira definir o erro.


    Dentro do express é necessário a definição de uma propriedade bem exclusiva do express para a obtenção do erro, ela seria:


    require("express-async-errors)
    const AppError = require("../utils/AppError)
    const express = require("express")
    
    const app = express()

        //Essa estrutura deve ser criada nesse formato exclusivo
    app.use((error, request, response,next)=>{

        //Verifica se o error vem de uma extensão AppError
        // Se error for vier com a mesma instancia de AppError
        if(error instanceof AppError ){
            return response.status(error.statusCode).json({
                status: "error",
                message: error.mensage
            })
        }

        //Caso a instancia do error seja diferente do AppError, o erro provavelmente será da parte do servidor
        return response.status(500).json({
            status: "Server Error"
            messa: "Internal server error"
        })
    })


## 13. Criando e conectando com o banco de dados

- Nessa aplicação será utilizada o banco de dados relacional sqlite

Primeiramente será instalado as duas bibliotecas do sql-lite que são: sqlite & sqlite3
sqlite será responsável pela conexão e o sqlite3 será o driver 

npm sqlite sqlite3 --save


Após instalar as duas biblíotecas, será criada duas pastas. Uma pasta será para o armazenamento dos bancos de dados (database) e a outra (sqlite) será responsável por armazenar o banco de dados sqlite

## 13.2 - Conectando ao banco de dados

Dentro da pasta sqlite será criado um arquivo index para melhor desempenho do código, nessa pasta terá uma function async no qual fará a conexão com o database

 const sqlite = require("sqlite")
 const sqlite3 = require("sqlite3")
 
 const path = require("path")

    async function sqliteConnection(){
        const databse = sqlite.open({
            //propriedade que irá salvar os dados para o banco
            filename: patch.resolve(__dirname, "..", database.db)

        })

        driver: sqlite3.Database
        //específica o driver que será utilizado 
    }

// Patch é uma bibliotieca que pode resolver algumas questões baseadas no caminho das pastas. Acima mandamos o patch resolver, no __dirname será obtido o arquivo no qual está, os ".." representa que estamos saindo desta pasta e pegando a pasta sqlite e o último arquivo significa que será inserido no database.db, caso não tenha será criado

modules.exports = sqliteConnect 

- Agora essa função será iniciada no arquivo main (express.js)

## 14.SGBD

SGBD - Sistema Gerenciador de Banco de Dados

Ferramenta para gerenciamento do banco de dados =b

Vm usar o beekeeper pq já ta instalado 

## 15 - Criando tabela usuário

create table usuarios (
    id INT AUTOINCREMENT PRIMARY KEY, 
    name VARCHAR(50), 
    email VARCHAR(## 100),
    password VARCHAR, 
    avatar VARCHAR NULL, 
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP CURRENT_TIMESTAMP
) 

Coisa nova: CURRENT_TIMESTAMP faz que o registro seja salvo na data e hora atual automáticamente

## 16 - SQL

SQL - Struction Query Linguage
Linguagem de Consulta estruturada

SQL é uma linguagem padrão utilizada pelos bancos de dados relacionais, bancos de dados relacionais são banco de dados que possuem ou podem relacionar tabelas entre sí

## 16.2 - SDT

    Create - criar
    drop - deletar
    alter - atualizar (necessário para alterações na tabela. ex: RENAME, DROP e ADD)

## 17 - Migrations

As migrations é um esquema para a criação de tabelas automatizadas, serve como um esquema que cria uma ou mais tabelas caso a mesma não exista no banco de dados

-Primeiro iremos criar a pasta migration dentro da pasta sqlite

- iremos criar o arquivo (creatUser) que ficara armazenado o código na pasta migration para a criação da tabela e iremos exporta-lo

- iremos criar um index na pasta migration e esse index ficará responsável por armazenar todos os schmeas (código de criação de tabelas) para ter um código mais organizado

Dentro do index.js :


//Importando o arquivo de conexão ao banco de dados
const sqlConnect = require("../../sqlite")
//Importando o código onde é armazenado as informações da tabela "users"
const creatUser = require("./creatUser")

async function migrationRun(){

    //Variavel que armazenará os arquivos das tabelas
    const schmeas = [
        creatUser
    ].join("")
    //join agrupa os códigos e os omologa por nada

    //Executando a função e recuperando a sua resposta que sera a varivel database
    sqlConnect()
    .then(db => db.exec(schmeas))
    .catch(error => console.log(error))
}

module.exports = migrationRun

## 18 - Utilizando SELECT em verificação

 Como o controller userController está responsalvel pela criação do usuário dentro dele temos que fazer uma verificação na qual irá identificar se algum registro do banco de dados corresponde ao email em que o usuário enviou para nossa rota /users

 DENTRO DO userController.js:

 const appError = require("../utils/appError")
 //Importando arquivo de conexão ao banco de dados
 const sqliteConect = require("../utils/database/sql")


 class userController{
    //a função irá se tornar assíncrona por conta da espera há resposta do banco de dados
     async create(request, response){
        const {name, email, password} = require.body

        //Variavel que irá esperar a resposta vinda da função sqliteConect, a resposta será o arquivo responsavel pelo gerênciamento do database
        const database = await sqliteConect()


        //Essa varivel vai receber se existe algum registro com o mesmo email enviado pelo usuario
        
#        const checkUser = await database.get("SELECT * FROM users WHERE email = (?)", [email])

        //No JS o método de consulta consiste em sinalizar quanda irá ser utilizado alguma variavel por sinais de interrogação, esses sinais serão substituidos em ordem de acordo com o vetor declarado ao a direita

        //Caso haja algum registro com o mesmo e-mail será criado um novo appError que irá informar ao usuário que ocorreu um erro
        if(checkUser){
            throw new appError("Esse e-mail já está em uso")
        }

        //Caso não haja nenhum registro identico, será enviado umjson vazio e um statusCode de criado 
        return response.status(201).json()

    }
 }

 ##  19- Inserindo registros no banco de dados

  DENTRO DO userController.js:

  // Vamos utilizar a varivel database que já esta recebendo o database de aqliteConect

  wait database.run("INSERT INTO users (name, email, password) VALUES (?,?,?)", [name, email, password])

  //Os dados name, email, password estão vindo da request.body

## 20 - Cryptografando a senha

    Para cyptogravar a senha será necessário o uso de uma biblioteca node chamada bcrypto.

    npm i bcrypto --save

    Uso: 

    const {hash} = require("bcrypto")

    const hashedPassword = await hash(password , 8)

## 21 - Funções do banco de dados

    O banco de dados possui funções diversificadas como o JS

    Utilizando a função DATATIME

    update_at = DATETIME ('now')

## 22 - Nullish Operator

    Nullish operator é um operador que alterna entre dois valores que se sobresaem por conta de seus contéudos.
    Caso a primeira variavel possua valor, ela será a escolhida, porém se a primeira não possur valor naquele momento e a segunda sim, logo a segunda será a escolhida

    ex:

    const numeroDez = 10
    const numeroUndefined

    const armazemNumeral = numeroUndefined ?? numeroDez
     
     -No caso a cima o armazemNumeral irá receber o numeroDez, pois o numeroUndefined não possui valor


## 23 - QUERY BUILDER CONCEITO - IMPORTANTE !!!!!!

    Como o nome já diz, query builder é um construtor de consulta. Seu funcionamento é performático e auxília a um código mais limpo.

    Query Builder consiste em adptar seus códigos para diversos tipos de databases ralacionais.



## 24 - KNEX.JS

    KNEX será o nosso QUERY BUILDER 

    instalação Node:
    npm install knex --save 

##  Configurando

    - Primeiro passo para configurar o knex é executando o comando: npx knex init . esse comando irá criar um arquivo com as configurações de conexão do knex

    - Após criar o arquivo se deve apagar tudo menos o método developer
    
    -No método developer será necessário informar onde se localiza o database no atributo "fileName"(estamos utilizando o patch)
    ex: 
    
    fileName: patch.resolve(__dirname, "src", "database", "database.db")

    - Abaixo de "fileName" será criado um outro atributo chamado de inNullDefault: true (PADRÃO)


    - Agora é necessário estabelecer a conxão entre o knex e o database. É criado uma nova pasta em database, chamada "Knex", dentro dessa passa irá possuir um arquivo index com uma variavel chamada "connection"

    - Dentro do index será importado o valor do knex na biblioteca Knex e os dados de dentro o arquivo criado pelo knex

    - A variavel "connection" receberá :

    const connection = knex(config.development)


## 25 - Migrations

    As migrations é uma maneira de versionar o banco de dados, ela pode trabalhar adicionando, alterando ou removendo tabelas do banco de dados.

    Em vez de irmos manualmente criar ou modificar a tabela podemos usar as migrations. A cada alteração é possivel salvar a versão anterior do seu banco de dados, bem semelhante ao GIT.

    As migrations possuem duas funções primárias:

    UP: Caso seja necessário a criação ou alteração de dados dentro da tabela

    DOWN: Caso seja necessário desfazer alguma modificação ou exclui-lá

## 26- Implementando a Migration



#    1. Dentro da pasta do kenex localizada na pasta database será criada uma nova pasta chamada "migrations"

#    2. No arquivo knexfile será implementado um novo elemento ao objeto que se encontra lá. O novo objeto será construido com essa estrutura:

    migrations: {
        directory: patch.resolve(__dirname, "src", "database", "knex", "migrations" )
    }

    (Será direcionada a pasta criada no passo 1)

#   3. Será utilizado um comando npx para a criação de uma nova migration:

    npx knex migrate:make createNotes

#    4. Dentro do arquivo criando com o migration make:

    No migration kenex é encontrado dois tipos de funções relacionados a tabela: Criação(CREATE) e Remoção(DROP)

    Estrutura dos dois:

    CREATE -->
    exports.up = knex => kenx.schmeas.creatTable("notes", table =>{
        table.increment("id");       | Primary KEY       
        table.text("notes");         | Varchar  
        table.interger("user_id).reference("id").inTable("users")    | Chave estrangeira
        table.timestamp(creat_at).default(knex.fn.now())             | TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    })

    DROP -->
    exports.down = knex => knex.schmeas.dropTable("notes")

#   5. Comando para executar as migrations

    npx knex migrate:latest

##  27. NPM vs NPX


    NPM: Node Package Maneger
    
    NPM é um gerenciador de pacotes node e seu intuíto principal é a instalação de pacotes e bibliotecas. 
    O NPM pode executar pacotes e scripts, porém somente pode executar os pacotes instalados na máquina


    NPX: Node Package Executer 

    NPX é um executor de pacotes, seu principal objetivos é executar pacotes, mas diferente do npm que pode somente executar pacotes instalados, o npx pode executar pacotes que não foram instalados na máquina, assim se destacando sobre o NPM no requisíto executar pacotes 



##  28. Estruturação do knex:

#       28.1    Configuração Knexfile         

            module.exports = 

            developer:{
                client: sqllite3,
                connection:{
                    filename: path.resolve(__dirnamen, "src", "database", "database.db")
                },
                migrations:{
                    directory: path.resolve(__dirname, "src", "database", "knex", "migrations") 
                },
                pool{
                    afterCreat: (conn, cb) => conn.run("PRAGMA foreign_keys = ON", cb)
                },
                asNullDefault: true

            
            }


            NOTES:
            - connection: remete a localização do banco de dados
            - migrations: remete a localização da pasta onde será criada as migrations
            - poll: Oque for inserido no pool será executada após a conexão com o banco de dados (
                o objeto afterCreat irá executar uma função que permetirá a remoção em CASCATA nas tabelas
            )
            - asNullDefault: funcionalidade padrão que deve ser colocada

#       28.2 Criação de Migrate


        TERMINAL: npx knex migrate: make <nome da migrate>


        estrutura da migrate:

        exports.up = knex => knex.schema.createTable("notes", (table)=>{
            table.increments('id');
            table.text('name');
            table.text('descricao');
            table.timestamp(create_at).default(knex.fn.now())
        })

        exports.down = knex => knex.schema.dropTable("notes")

##  29. Migrates para Links e Tags (CASCADE)
    
    Para a criação do migrate de links e tags, foi utilizado a mesma estrutura da Observação 28.

    Porém esse passo possui um adendo muito importante: CASCADE

    CASCADE é uma funcionalidade SQL que permite a exclusão de registros dependendo de outro registro que o relaciona:

    O registro notes de id = 1, é relacionado ha um link, porém esse registro notes é excluido, com o CASCADE informado na estrutura do migrate o registro desse link relacionado é excluido junto com o registro de notes

    COMO UTILIZAR:
    - Primeiramente deve-se declarar a unidade "pool" no knexfile dentro de connection

    pool:{
        afterCreate: (conn, cb) => conn.run("PRAGMA foreign_keys = ON", cb)
    }

    - Após declarar o pool, será necessário definir na estrutura do migrate que essa tabela usará o CASCATE
    - O CASCATE deverá ser definido na linha de criação da coluna que fará relação com o chave estrangeira


    table.integer("notes_id").refereces("id").inTable("notes").onDelete("CASCADE")

##  30. Criando o notesController
    O notesController assim como o userController, fará o controle das informações baseadas na url que foram enviadas. Nela foi criada os métodos: Create, Show, Delete e index

    Create: Cria notas
    Show: Mostra uma nota específica
    Delete: Deleta notas
    index: Lista todas as notas do usuario

    Pode ser Visualizados com anotações no "./src/contollers/notesController.js"

##  31. Inner Join
    Nada mais é do que uma conexão de uma tabela a outra por meio de um identificador comum

    Um exemplo é caso tivermos uma tabela "tags" com uma coluna chamada "node_id", a tabela "tags" está propicia a ter relações com a tabela "nodes_id"

    Estrutura do innerJoin no knex(Query Builder):

    const {title, user_id, tags} = req.query

    //Está transformando a varivel "tagsFilter" em um vetor onde ocorrera a separação de intens quando tiver uma virgula
    const tagsFilter = tags.split(",").map(tags => tags.trim())

    const name = await knex("tags").select([
        "notes.id",
        "notes.title",
        "notes.user_id",
    ])
    .where("notes.user_id", user_id)
    .whereLike("notes.title", `%${title}%`)
    .whereIn(tagsFiler, "tags.name")
    .innerJoin("notes", "tags.note_id", "notes.id")

 #   EXPLICAÇÕES:
        - where está fazendo uma condição onde só irão ser pegos os registros que possuem o notes.user_id igual ao passado pelo usuario
        
        - whereLike está fazendo uma pesquisa relacionado a caso vier uma query do usuario, ela irá pesquisar se alguma notes.notes possua a string inteira ou uma parte           
        
        - whereIn significa que se existe dentro desse vetor. Está comparando os valores da coluna name com os valores dentro do vetor
        
        - InnerJoin está fazendo a relação e conexão entre a tabela tags e notes
   
##  32. Map e Filter

    Map que já sabemos o uso = cria um novo vetor baseado em outro vetor, porém de acordo com a necessidade

    ADENDO SOBRE MAP:
    Algo que eu não sabia, mas aprendi é o método para adicionar um novo elemento

    const newVetor = tags.map(tag =>{
        return {
            ...tags,
            data: new Date()
        }
    })

    Acima estamos criando um novo vetor baseado no vetor tags, porém adicionando um novo elemento
    O "...tags" significa que estamos despejando todas as informações de dentro do vetor tags no return

    Filter trabalha de acordo com oque seu nome já diz, ele filtra informações de um vetor:

    const newArray = tags.filter(tag => tag.id === 2)

    Vai trazer todas as informações que possuem o id 2
