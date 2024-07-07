const express = require('express');
const app = express();
const bodyParser = require("body-parser"); // Để sử dụng req.body
const methodOverride = require('method-override'); // ghi đè phương thức
const flash = require("express-flash");
const cookieParser = require("cookie-parser");
const moment = require("moment")
const session = require("express-session");
const dotenv = require("dotenv");
const http = require('http');
const server = http.createServer(app);


const { Server } = require("socket.io");

// Khởi tạo server HTTP

// Khởi tạo server Socket.IO
const io = new Server(server);
global._io = io;

// Middleware method-override
app.use(methodOverride('_method'));

// sử dụng thư viện moment
app.locals.moment = moment;


// ENV
dotenv.config();

//PORT
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

// Khởi động server
server.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
