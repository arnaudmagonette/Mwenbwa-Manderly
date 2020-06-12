const db = require("../models");
const User = db.user;

exports.allUsers = (req, res) => {
    User.find({}).exec((err, allUsers) => {
        if (err) {
            res.status(500).send({message: err});
            return;
        }

        if (!allUsers) {
            res.status(404).send({message: "Users Not found."});
            return;
        }

        res.json(allUsers);
    });
};
