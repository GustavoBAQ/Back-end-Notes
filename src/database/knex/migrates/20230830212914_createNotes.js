//Modelo padrão para construção de tabelas utilizando Knex(Query Builder)
exports.up = knex => knex.schema.createTable("notes", table =>{
    table.increments("id");
    table.text("notes");
    table.text("description");
    table.integer("user_id").references("id").inTable("users");

    table.timestamp("creat_at").default(knex.fn.now())
    table.timestamp("update_at").default(knex.fn.now())
})

exports.down = knex => knex.schema.dropTable("notes")