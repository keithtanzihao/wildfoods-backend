const express = require("express");
require("dotenv").config();

// create an instance of express app
let app = express();

const adminRoutes = require("./routes/users");

// enable forms
app.use(express.urlencoded({ extended: false }));





async function main() {
  app.use("/user", adminRoutes);
}

main();

app.listen(3000, () => {
  console.log("Server has started");
});
