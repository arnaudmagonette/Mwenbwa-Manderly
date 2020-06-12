const config = require("../config/auth.config");
const db = require("../models");
const User = db.user;
const Role = db.role;

const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

exports.signup = (req, res) => {
    const user = new User({
        username: req.body.username,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 8),
        color: req.body.color,
        leaves: "100",
    });

    user.save((err, resp) => {
        if (err) {
            res.status(500).send({message: err});
            return;
        }
        Role.findOne({name: "user"}, (error, role) => {
            if (error) {
                res.status(500).send({message: error});
                return;
            }

            resp.roles = [role._id];
            resp.save(erro => {
                if (error) {
                    res.status(500).send({message: erro});
                    return;
                }

                res.send({message: "User was registered successfully!"});
            });
        });
    });
};

exports.signin = (req, res) => {
    User.findOne({
        email: req.body.email,
    })
        .populate("roles", "-__v")
        .exec((err, user) => {
            if (err) {
                res.status(500).send({message: err});
                return;
            }

            if (!user) {
                res.status(404).send({message: "User Not found."});
                return;
            }

            const passwordIsValid = bcrypt.compareSync(
                req.body.password,
                user.password,
            );

            if (!passwordIsValid) {
                res.status(401).send({
                    accessToken: null,
                    message: "Invalid Password!",
                });
                return;
            }

            const token = jwt.sign({id: user.id}, config.secret, {
                expiresIn: 86400, // 24 hours
            });

            const authorities = [];

            for (let i = 0; i < user.roles.length; i++) {
                authorities.push(`ROLE_${user.roles[i].name.toUpperCase()}`);
            }
            res.status(200).send({
                id: user._id,
                username: user.username,
                email: user.email,
                color: user.color,
                leaves: user.leaves,
                roles: authorities,
                accessToken: token,
            });
        });
};
