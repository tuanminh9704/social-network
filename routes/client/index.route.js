const homeRoutes = require("./home.route");
const chatRoutes = require("./chat.route");
const userRoutes = require("./user.route");

module.exports = (app) => {
    app.use('/', homeRoutes);

    app.use('/chat', chatRoutes);

    app.use('/user', userRoutes);
}