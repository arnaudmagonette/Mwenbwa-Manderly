const db = require("../models");
const User = db.user;

const addFirstLeaves = (req, res) => {
    User.find({}).exec((err, users) => {
        if (err) {
            res.status(500).send({message: err});
            return;
        }

        if (!users) {
            res.status(404).send({
                message: "Failed! User not found!",
            });
            return;
        }

        let totUsersLeaves = 0;
        let usersLenght = -1;

        users.forEach(user => {
            totUsersLeaves += user.leaves;
            usersLenght += 1;
        });

        const usersLeaves = totUsersLeaves / usersLenght;

        User.findByIdAndUpdate(req._id, {leaves: usersLeaves}).exec(error => {
            if (error) {
                res.status(500).send({message: error});
            }
        });
    });
};

module.exports = addFirstLeaves;
