const db = require("../models");
const Tree = db.tree;

import {nameByRace} from "fantasy-name-generator";

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

                    const randomName = nameByRace("dragon", {gender: "male"});

                    tree.name = randomName;
                    tree.owner = req.username;

                    tree.save(erro => {
                        if (erro) {
                            res.status(500).send({message: erro});
                        }
                    });
                });
        });
};
