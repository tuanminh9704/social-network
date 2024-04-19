const homeRoutes = require("./home.route");
const chatRoutes = require("./chat.route");
const userRoutes = require("./user.route");

const middlewaresAuh = require("../../middlewares/client/auth.middleware");
const middlewaresLogin = require("../../middlewares/client/login.middleware");

module.exports = (app) => {

    app.use(middlewaresLogin.loginPost);

    app.use('/user',  userRoutes);

    app.use('/', middlewaresAuh.auth, homeRoutes);

    app.use('/chat', middlewaresAuh.auth, chatRoutes);

}