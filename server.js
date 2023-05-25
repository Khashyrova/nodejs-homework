const app = require("./app");
const mongoose = require("mongoose");
const { DB_HOST, PORT } = process.env;
mongoose
  .connect(DB_HOST)
  .then((data) => {
    app.listen(PORT);
    console.log("Server started");
  })
  .catch((err) => {
    console.log(err);
    process.exit(1);
  });
