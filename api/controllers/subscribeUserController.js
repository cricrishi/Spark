const mongoose = require("mongoose");

const User = mongoose.model("User");

exports.createUser = (req, res) => {
    let newUser = new User(req.body);
    console.log(req.body);
    newUser.save( (err, user) => {
        if (err)
            res.send(err);
        
        res.json(user);
    });
};
