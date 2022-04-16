const express = require("express");
require("dotenv").config();

// create an instance of express app
let app = express();

// enable forms
app.use(express.urlencoded({ extended: false }));

async function main() {
  app.get("/", (req, res) => {
    res.send("It's alive!");
  });
}

main();

app.listen(3000, () => {
  console.log("Server has started");
});
