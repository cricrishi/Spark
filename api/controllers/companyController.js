const mongoose = require("mongoose");

const Company = mongoose.model("Company");

exports.createCompany = (req, res) => {
    let newCompany = new Company(req.body);
    newCompany.save( (err, company) => {
        if (err)
            res.send(err);
        res.json(company);
    });
        
};
