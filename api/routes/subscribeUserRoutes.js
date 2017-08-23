// api/models/subscribeUserRoutes.js
module.exports = (app) => {
    subscribeUser= require('../controllers/subscribeUserController');
    app.route('/subscribe/user')
    		.post(subscribeUser.createUser);
}