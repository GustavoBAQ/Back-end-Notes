
const knex = require("../database/knex")
const AppError = require("../util/AppError")

class NotesController{
    async create(req, res){
        const {notes, description, links, tags} = req.body
        const user_id= req.user.id
        
        
        // console.log(name +"Descrição =>"+ description, links, tags);
        //Vamos retornar o id da nota para que seja possivel fazer a relação entre as tabelas links e tags
        const note_id = await knex.table("notes").insert({
            notes,
            description,
            user_id
        }).catch(error => console.log(error))
        //Estamos utilizando o knex(QUERY BUILDER) para fazer um insert na tabela notes.
        //Por padrão a constante notes_id irá receber o id da nota criada


        //Vamos contruir objetos de acordo com a quantidade de valores o vetor link possui.
        //Em cada elemento do vetor links, será construido um objeto contendo o id da nota relacionada e a url contentdo recebendo o link
        const linksInsert = links.map(link =>{
            return {
                url: link,
                note_id: note_id[0]
            }
        })

        console.log(linksInsert)
        await knex("links").insert(linksInsert)
        //Utilizando o knex para inserir na tabela links 

        //Para cada elemento do vetor tag será construido um objeto 
        const tagsInsert = tags.map(name => {
            return{
                name,
                note_id: note_id[0],
                user_id
            }
        })

        await knex("tags").insert(tagsInsert)

        res.json()
        
    }

    async show(req, res){
        //Recebendo id do pelo parâmetro
        const {id} = req.params

        //Recebendo o primeiro registro da tabela notes
        const notes = await knex("notes").where({id}).first()
        console.log(notes);

        //Verificando se existe algum registro
        if(!notes){
            //Caso não exista registro será acionado o AppError
            throw new AppError("Nenhuma nota cadastrada")
        }

        //Buscando pelos registros da tabela tags que possuem relações com o registro da tabela notes
        const tags = await knex("tags").where({note_id: id}).orderBy("name")
        // const tags = await knex("tags").where("note_id","=", notes.id)

        
        //Buscando pelos registros da tabela tags que possuem relações com o registro da tabela links
        const links = await knex("links").where({note_id: id}).orderBy("created_at")
        // const links = await knex("links").select("*").where("note_id","=", notes.id)

      
        // Retornando resposta
        return res.json({
            ...notes,
            tags,
            links
        })
        //Despejando os dados do notes e inserindo as tags e links
    }

    async delete(req, res){
        const {id} = req.params

        await knex("notes").where({id}).delete().catch(error => console.log(error))

        return res.json()
    }

    async index(req, res){
        //Desfragmentando os valores recebidos no req.query
        const{name, tags} = req.query
        const user_id = req.user.id
        
        //Criando notes aqui para alternar no if
        let notes;
        console.log(` Esse é o ->${user_id}`)
        
        if(tags){
            const tagsFilter = tags.split(',').map((tags)=> tags.trim())
            //split está transformando tags em vetor onde a separação é por virgulas e trim está tirando os espaçamentos nas strings
            
            //NOTA: O IDIOTA ESCREVEU innerJoin com i maiúsculo
            notes = await knex("tags")
            .select([
                "notes.id",
                "notes.notes",
                "notes.user_id"
            ])
            .where("notes.user_id", user_id)
            .whereLike("notes.notes", `%${name}%`)
            .whereIn("name", tagsFilter)
            .innerJoin("notes", "tags.note_id", "notes.id" )
            
            console.log(tags)
            /*
            
            - where está fazendo uma condição onde só irão ser pegos os registros que possuem o notes.user_id igual ao passado pelo usuario
            - whereLike está fazendo uma pesquisa relacionado a caso vier uma query do usuario, ela irá pesquisar se alguma notes.notes possua a string inteira ou uma parte           
            - whereIn significa que se existe dentro desse vetor. Está comparando os valores da coluna name com os valores dentro do vetor
            - InnerJoin está fazendo a relação e conexão entre a tabela tags e notes

            */
        }else{


        //Fazendo requisição ao banco de regitros de notes
         notes = await knex("notes").where({user_id: user_id}).whereLike("notes", `%${name}%`).orderBy("notes")
        
        /*
        - where está filtrando entre os registros, aqueles que possuem o user_id recebido
        
        - whereLike é uma funcionalidade que filtra entre os registros a partir de uma string. Se houver algum registro que possua aquele string entre as palavras será pegada
        
        -No whereLike a % define em qual lado você deseja que seja procurada, caso haja a % somente n parte direita vai procurar a string especifícada, porém será pega aquela que tiver a string e outra coisa na direita ex:
        caminhão%: [caminhão-pipa - Irá ser pego]
                   [voador caminhão - Não irá ser pego]

        - orderBy irá ordernar de forma crescente a partir do nome dos registros na coluna name
        */
        }

        //Obtendo tags da nota 

        //Recebendo todas as tags relacionadas ao usuario logado
        const userTags = await knex("tags").where({user_id})

        //vamos pegar todas as notas que possuem dentro de notes
        const tagsWithNotes = notes.map(note =>{
            //filtrando em todas as notas que possuem tag.note_id igual a node.id
            const noteTags = userTags.filter(tag => tag.note_id === note.id)

            //retornado todos as informações que existe dentro de notes e criando novo elemento para as tags 

            return{
                ...note,
                notesTags: noteTags
            }
        })

       return res.json(tagsWithNotes)
    }
}

module.exports = NotesController