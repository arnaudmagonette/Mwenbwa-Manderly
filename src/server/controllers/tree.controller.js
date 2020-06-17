const db = require("../models");
const Tree = db.tree;
const User = db.user;

import {nameByRace} from "fantasy-name-generator";

function randomName() {
    return nameByRace("dragon", {gender: "male"});
}

exports.allTrees = (req, res) => {
    Tree.find({})
        .limit(1000)
        .exec((err, allTrees) => {
            if (err) {
                res.status(500).send({message: err});
                return;
            }

            if (!allTrees) {
                res.status(404).send({message: "Trees Not found."});
                return;
            }

            res.json(allTrees);
        });
};

exports.addFirstTrees = (req, res) => {
    Tree.find({name: "For sale"})
        .count()
        .exec((err, count) => {
            if (err) {
                res.status(500).send({message: err});
                return;
            }

            const random = Math.floor(Math.random() * count);

            Tree.findOne({})
                .skip(random)
                .exec((error, tree) => {
                    if (error) {
                        res.status(500).send({message: error});
                        return;
                    }

                    tree.name = randomName();
                    tree.owner = req.username;

                    tree.save(erro => {
                        if (erro) {
                            res.status(500).send({message: erro});
                        }
                    });
                });
        });
};

exports.buyTree = (req, res) => {
    User.findById(req.idUser).exec((err, user) => {
        if (err) {
            res.status(500).send({message: err});
            return;
        }

        if (!user) {
            res.status(404).send({
                message: "User not found!",
            });
            return;
        }

        Tree.findById(req.idTree).exec((error, tree) => {
            if (error) {
                res.status(500).send({message: error});
                return;
            }

            if (!tree) {
                res.status(404).send({message: "Tree Not found."});
                return;
            }

            if (user.leaves < tree.leaves) {
                res.send({message: "User doesn't have enough Leaves."});
                return;
            }

            tree.name = randomName();
            tree.owner = [user.username];
            tree.save(erro => {
                if (erro) {
                    res.status(500).send({message: erro});
                }
            });
        });
    });
};
