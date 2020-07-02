/* eslint-disable consistent-return */
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
            tree.owner.unshift(user.username);
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

            const latTreeSelected = req.body.latTree;
            const lonTreeSelected = req.body.lonTree;
            const center = {lat: latTreeSelected, lon: lonTreeSelected};
            const radius = 100;

            Tree.find({}).exec((err2, trees) => {
                if (err2) {
                    res.status(500).send({message: err2});
                    return;
                }

                if (!trees) {
                    res.status(404).send({message: "Trees Not found."});
                    return;
                }

                const treesSelected = [];
                let valueTreesSelected = 0;

                trees.forEach(tree => {
                    const lat = tree.geoloc.lat;
                    const lon = tree.geoloc.lon;

                    if (insideCircle({lat, lon}, center, radius)) {
                        treesSelected.push(tree);
                    }
                });

                let treesSelectedUser = [];
                let valueTreesSelectedUser = 0;
                let treesSelectedOther = [];
                let valueTreesSelectedOther = 0;

                treesSelectedUser = treesSelected.filter(
                    tree => tree.owner[0] === user.username,
                );
                treesSelectedOther = treesSelected.filter(
                    tree => tree.owner[0] !== user.username,
                );

                treesSelected.forEach(tree => {
                    valueTreesSelected += tree.leaves;
                });

                treesSelectedUser.forEach(tree => {
                    valueTreesSelectedUser += tree.leaves;
                });

                treesSelectedOther.forEach(tree => {
                    valueTreesSelectedOther += tree.leaves;
                });

                let tsul = 1;

                if (treesSelectedUser.length !== 0) {
                    tsul = treesSelectedUser.length;
                }

                const valueReBuyTree =
                    treeSelected.leaves +
                    valueTreesSelectedUser * (treesSelected.length / tsul) +
                    valueTreesSelectedOther -
                    valueTreesSelected;

                if (user.leaves < valueReBuyTree) {
                    res.send({message: "User doesn't have enough Leaves."});
                    return;
                }

                treeSelected.owner = [user.username];
                treeSelected.save(erro => {
                    if (erro) {
                        res.status(500).send({message: erro});
                    }
                    res.status(200);
                });

                user.leaves = user.leaves - valueReBuyTree;
                user.save(erro => {
                    if (erro) {
                        res.status(500).send({message: erro});
                    }
                    res.status(200);
                });
            });
        });
    });
};

exports.lockTree = (req, res) => {
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

            const latTreeSelected = req.body.latTree;
            const lonTreeSelected = req.body.lonTree;
            const center = {lat: latTreeSelected, lon: lonTreeSelected};
            const radius = 100;

            Tree.find({}).exec((err2, trees) => {
                if (err2) {
                    res.status(500).send({message: err2});
                    return;
                }

                if (!trees) {
                    res.status(404).send({message: "Trees Not found."});
                    return;
                }

                const treesSelected = [];
                let valueTreesSelected = 0;
                let valuePlayersTreesSelected = 0;

                trees.forEach(tree => {
                    const lat = tree.geoloc.lat;
                    const lon = tree.geoloc.lon;

                    if (insideCircle({lat, lon}, center, radius)) {
                        treesSelected.push(tree);
                    }
                });

                let player = [];

                treesSelected.forEach(tree => {
                    valueTreesSelected += tree.leaves;
                });

                treesSelected.forEach(tree => {
                    if (tree.owner[0]) {
                        valuePlayersTreesSelected += tree.leaves;
                    }
                });

                treesSelected.forEach(tree => {
                    if (tree.owner[0]) {
                        player.push(tree.owner[0]);
                    }
                });

                player = new Set(player);

                const valueLockTree =
                    treeSelected.leaves * 10 +
                    valueTreesSelected * player.size -
                    valuePlayersTreesSelected / player.size;

                if (user.leaves < valueLockTree) {
                    res.send({message: "User doesn't have enough Leaves."});
                    return;
                }

                treeSelected.lock = true;
                treeSelected.save(erro => {
                    if (erro) {
                        res.status(500).send({message: erro});
                    }
                    res.status(200).send({message: "Tree locked"});
                });

                user.leaves = user.leaves - valueLockTree;
                user.save(erro => {
                    if (erro) {
                        res.status(500).send({message: erro});
                    }
                });
            });
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

exports.addComment = (req, res) => {
    Tree.findById(req.body.idTree).exec((error, tree) => {
        if (error) {
            res.status(500).send({message: error});
            return;
        }

        if (!tree) {
            res.status(404).send({message: "Tree Not found."});
            return;
        }

        const name = req.body.username;
        const comment = req.body.comment;

        tree.comments.push({name, comment});
        tree.save(erro => {
            if (erro) {
                res.status(500).send({message: erro});
            }
        });
    });
};

exports.getValueTree = (req, res) => {
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

            if (req.body.type === "rebuy") {
                const latTreeSelected = treeSelected.geoloc.lat;
                const lonTreeSelected = treeSelected.geoloc.lon;
                const center = {lat: latTreeSelected, lon: lonTreeSelected};
                const radius = 100;

                Tree.find({}).exec((err2, trees) => {
                    if (err2) {
                        res.status(500).send({message: err2});
                        return;
                    }

                    if (!trees) {
                        res.status(404).send({message: "Trees Not found."});
                        return;
                    }

                    const treesSelected = [];
                    let valueTreesSelected = 0;

                    trees.forEach(treeCircle => {
                        const lat = treeCircle.geoloc.lat;
                        const lon = treeCircle.geoloc.lon;

                        if (insideCircle({lat, lon}, center, radius)) {
                            treesSelected.push(treeCircle);
                        }
                    });

                    let treesSelectedUser = [];
                    let valueTreesSelectedUser = 0;
                    let treesSelectedOther = [];
                    let valueTreesSelectedOther = 0;

                    treesSelectedUser = treesSelected.filter(
                        tree => tree.owner[0] === user.username,
                    );
                    treesSelectedOther = treesSelected.filter(
                        tree => tree.owner[0] !== user.username,
                    );

                    treesSelected.forEach(tree => {
                        valueTreesSelected += tree.leaves;
                    });

                    treesSelectedUser.forEach(tree => {
                        valueTreesSelectedUser += tree.leaves;
                    });

                    treesSelectedOther.forEach(tree => {
                        valueTreesSelectedOther += tree.leaves;
                    });

                    let tsul = 1;

                    if (treesSelectedUser.length !== 0) {
                        tsul = treesSelectedUser.length;
                    }

                    const valueReBuyTree =
                        treeSelected.leaves +
                        valueTreesSelectedUser * (treesSelected.length / tsul) +
                        valueTreesSelectedOther -
                        valueTreesSelected;

                    res.json(valueReBuyTree);
                });
            }

            if (req.body.type === "lock") {
                const latTreeSelected = treeSelected.geoloc.lat;
                const lonTreeSelected = treeSelected.geoloc.lon;
                const center = {lat: latTreeSelected, lon: lonTreeSelected};
                const radius = 100;

                Tree.find({}).exec((err2, trees) => {
                    if (err2) {
                        res.status(500).send({message: err2});
                        return;
                    }

                    if (!trees) {
                        res.status(404).send({message: "Trees Not found."});
                        return;
                    }

                    const treesSelected = [];
                    let valueTreesSelected = 0;
                    let valuePlayersTreesSelected = 0;

                    trees.forEach(treeCircle => {
                        const lat = treeCircle.geoloc.lat;
                        const lon = treeCircle.geoloc.lon;

                        if (insideCircle({lat, lon}, center, radius)) {
                            treesSelected.push(treeCircle);
                        }
                    });

                    let player = [];

                    treesSelected.forEach(tree => {
                        valueTreesSelected += tree.leaves;
                    });

                    treesSelected.forEach(tree => {
                        if (tree.owner[0]) {
                            valuePlayersTreesSelected += tree.leaves;
                        }
                    });

                    treesSelected.forEach(tree => {
                        if (tree.owner[0]) {
                            player.push(tree.owner[0]);
                        }
                    });

                    player = new Set(player);

                    const valueLockTree =
                        treeSelected.leaves * 10 +
                        valueTreesSelected * player.size -
                        valuePlayersTreesSelected / player.size;

                    res.json(valueLockTree);
                });
            }
        });
    });
};
