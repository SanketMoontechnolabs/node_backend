const express = require("express");
const app = express();
const bodyParser = require("body-parser");
require("dotenv").config();
const cors = require('cors');
require("./config/db");
const routes = require("./router/index");


app.use(cors());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1", routes);

const PORT = process.env.PORT || 5000;





app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
