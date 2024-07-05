const homeRoutes = require("./home.route");
const chatRoutes = require("./chat.route");
const userRoutes = require("./user.route");
const friendRoutes = require("./friend.route");
const myUserRoutes = require("./my-user.route");
const toDoRoutes = require("./to-do.route");

const middlewaresAuth = require("../../middlewares/client/auth.middleware");
const middlewaresLogin = require("../../middlewares/client/login.middleware");

module.exports = (app) => {

    app.use(middlewaresLogin.loginPost);

    app.use('/user',  userRoutes);

    app.use('/', middlewaresAuth.auth, homeRoutes);

    app.use('/chat', middlewaresAuth.auth, chatRoutes);

    app.use('/friends',middlewaresAuth.auth, friendRoutes);

    app.use('/my-profile', myUserRoutes);

    app.use('/to-do', toDoRoutes);

}