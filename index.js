const express = require('express');
const app = express();

const dotenv = require("dotenv");
dotenv.config();

const port = process.env.PORT;

const route = require("./routes/client/index.route");

// Connect Database
const database = require("./configs/database");
database.connect();
// End Connect Database

// Set up pug
app.set('views', './views');
app.set('view engine', 'pug');
//End Set up pug

// File static
app.use(express.static('public'))
//End file static

// Routes
route(app);
// End route

app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})