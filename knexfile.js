const patch = require("path")

module.exports = {

  //Desenvolve o caminho até o banco de dados para a conexão
  development: {
    client: 'sqlite3',
    connection: {
      filename: patch.resolve(__dirname, "src", "database", "database.db")
    },
    //Tudo que for inserido no pool irá executar após a conexão db
    pool:{
      afterCreate: (conn, cb) => conn.run("PRAGMA foreign_keys = ON", cb)
      //Essa funcionalidade ira possibilitar que ocorra o Delete em CASCATA
      //CASCATA é quando ecluimos um registro de uma tabela, os outros registros de outras tabelas vinculados ao primeira irão ser deletados tambem
    },

    //Desenvolve o caminho até a pasta de migrations localizada na pasta database
    migrations:{
      directory: patch.resolve(__dirname, "src", "database","knex", "migrates")
    },

    //Padrão para trabalho com knex
    useNullAsDefault: true
  }

};
