const db = require("../models");
const User = db.user;

const checkDuplicateUsernameOrEmailOrColor = (req, res, next) => {
    // Username
    User.findOne({
        username: req.body.username,
    }).exec((err, user) => {
        if (err) {
            res.status(500).send({message: err});
            return;
        }

        if (user) {
            res.status(400).send({
                message: "Failed! Username is already in use!",
            });
            return;
        }

        // Email
        User.findOne({
            email: req.body.email,
        }).exec((error, resp) => {
            if (error) {
                res.status(500).send({message: error});
                return;
            }

            if (resp) {
                res.status(400).send({
                    message: "Failed! Email is already in use!",
                });
                return;
            }

            // Color
            User.findOne({
                color: req.body.color,
            }).exec((erro, respond) => {
                if (erro) {
                    res.status(500).send({message: erro});
                    return;
                }

                if (respond) {
                    res.status(400).send({
                        message: "Failed! Color is already in use!",
                    });
                    return;
                }

                next();
            });
        });
    });
};

const verifySignUp = {
    checkDuplicateUsernameOrEmailOrColor,
};

module.exports = verifySignUp;
