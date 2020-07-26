const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.get("/", function (req, res) {
  res.send("Server is up and running again.");
});

app.listen(3000, function () {
  console.log("Server is runnning on port 3000.");
});
