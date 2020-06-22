const db = require("../models");
const Tree = db.tree;
const User = db.user;

import {nameByRace} from "fantasy-name-generator";
import {insideCircle} from "geolocation-utils";

function randomName() {
    return nameByRace("dragon", {gender: "male"});
}

exports.allTrees = (req, res) => {
    Tree.find({}).exec((err, allTrees) => {
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
    User.findById(req.body.idUser).exec((err, user) => {
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

        Tree.findById(req.body.idTree).exec((error, tree) => {
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

            user.leaves = user.leaves - tree.leaves;
            user.save(erro => {
                if (erro) {
                    res.status(500).send({message: erro});
                }
            });
        });
    });
};

exports.reBuyTree = (req, res) => {
    User.findById(req.body.idUser).exec((err, user) => {
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

        Tree.findById(req.body.idTree).exec((error, treeSelected) => {
            if (error) {
                res.status(500).send({message: error});
                return;
            }

            if (!treeSelected) {
                res.status(404).send({message: "Tree Not found."});
                return;
            }

            const latTreeSelected = req.body.lat;
            const lonTreeSelected = req.body.lon;
            const center = {latTreeSelected, lonTreeSelected};
            const radius = 100;

            Tree.find({}).exec((erro, trees) => {
                if (erro) {
                    res.status(500).send({message: erro});
                    return;
                }

                if (!trees) {
                    res.status(404).send({message: "Trees Not found."});
                    return;
                }

                const treesSelect = [];

                trees.forEach(tree => {
                    const lat = tree.geoloc.lat;
                    const lon = tree.geoloc.lon;

                    insideCircle({lat, lon}, center, radius).then(response => {
                        if (response) {
                            console.log(response);
                            treesSelect.push(tree);
                        }
                    });
                });

                console.log(treesSelect);
            });

            // if (user.leaves < tree.leaves) {
            //     res.send({message: "User doesn't have enough Leaves."});
            //     return;
            // }

            // tree.name = randomName();
            // tree.owner = [user.username];
            // tree.save((erro) => {
            //     if (erro) {
            //         res.status(500).send({message: erro});
            //     }
            // });

            // user.leaves = user.leaves - tree.leaves;
            // user.save((erro) => {
            //     if (erro) {
            //         res.status(500).send({message: erro});
            //     }
            // });
        });
    });
};

exports.howManyTrees = (req, res) => {
    Tree.find({owner: req.body.owner}).count((err, numbersTrees) => {
        if (err) {
            res.status(500).send({message: err});
            return;
        }

        if (!numbersTrees) {
            // eslint-disable-next-line
            return res.json("0");
        }

        res.json(numbersTrees);
    });
};
