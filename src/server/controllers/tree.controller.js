const db = require("../models");
const Tree = db.tree;

exports.allTrees = (req, res) => {
    Tree.find({})
        .limit(10)
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
