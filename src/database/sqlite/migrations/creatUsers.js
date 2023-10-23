
//Comando de criação de tabela
const creatUsers = `
    CREATE TABLE IF NOT EXISTS users(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name VARCHAR,
    email VARCHAR,
    password VARCHAR,
    avatar VARCHAR NULL,
    creat_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    update_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP) 
    `
    //IF NOT EXISTS = Se a tabela não existir crie, mas se existir não crie

module.exports = creatUsers