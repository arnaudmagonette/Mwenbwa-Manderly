const db = require("../models");
const Tree = db.tree;

const addFirstTrees = (req, res) => {
    Tree.find({name: "For sale"})
        .count()
        .exec((err, count) => {
            if (err) {
                res.status(500).send({message: err});
                return;
            }

            const random = Math.floor(Math.random() * count);

            Tree.findOne()
                .skip(random)
                .exec(tree => {
                    tree.name = "Test";
                    tree.owner = req.username;

                    tree.save(error => {
                        if (error) {
                            res.status(500).send({message: error});
                        }
                    });
                });
        });
};

module.exports = addFirstTrees;
