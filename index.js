const express = require('express');
const bodyParser = require("body-parser"); // Để sử dụng req.body
const flash = require("express-flash");
const cookieParser = require("cookie-parser");
const session = require("express-session");
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

// Cấu hình body parse
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//flash Để xây dựng chức năng hiện thông báo
app.use(cookieParser("HFJNDJFKDKFK"));
app.use(session({ cookie: { maxAge: 60000 }}));
app.use(flash());

// Routes
route(app);
// End route

app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})