// Setting up the database connection
const knex = require("knex")({
  client: "mysql",
  connection: {
    user: "dev_user",
    password: "Limpehtan1!",
    database: "wildfoods",
  },
});
const bookshelf = require("bookshelf")(knex);

module.exports = bookshelf;
