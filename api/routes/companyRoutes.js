// api/models/companyRoutes.js
module.exports = (app) => {
    companyController= require('../controllers/companyController');
    app.route('/company')
    		.post(companyController.createCompany);
}