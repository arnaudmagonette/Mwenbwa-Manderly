const db = require("../models");
const User = db.user;
const Tree = db.tree;

exports.allUsers = (req, res) => {
    User.find({})
        .sort([["leaves", -1]])
        .exec((err, allUsers) => {
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

exports.deleteUserAndTrees = req => {
    const user = req.body.username;
    Tree.find({owner: [user]}).then(resu => {
        for (const element of resu) {
            element.owner = [];
            element.name = "For sale";
            element.lock = false;
            element.save();
        }
        User.deleteOne({username: user}).then(res => {
            console.log(res);
        });
    });
};

exports.getUser = (req, res) => {
    User.findById(req.body.id).exec((err, user) => {
        if (err) {
            res.status(500).send({message: err});
            return;
        }

        if (!user) {
            res.status(404).send({message: "User Not found."});
            return;
        }

        res.json(user);
    });
};

exports.addFirstLeaves = (req, res) => {
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

exports.addIdleLeaves = (req, res) => {
    function repeatAdd() {
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

            users.forEach(user => {
                Tree.find({owner: user.username}).exec((error, allTrees) => {
                    if (error) {
                        console.error(error);
                    }

                    let totalLeavesTrees = 0;
                    const leavesUser = user.leaves;
                    let newLeavesUser = 0;

                    allTrees.forEach(tree => {
                        totalLeavesTrees += tree.leaves;
                    });

                    newLeavesUser = Math.floor(leavesUser + totalLeavesTrees);
                    user.leaves = newLeavesUser;

                    user.save(erro => {
                        if (erro) {
                            res.status(500).send({message: erro});
                        }
                    });

                    console.log(
                        `Add ${totalLeavesTrees} Leaves to ${user.username} total: ${user.leaves}`,
                    );
                });
            });
        });
        setTimeout(repeatAdd, 900000);
    }
    repeatAdd();
};

exports.removeIdleLeaves = (req, res) => {
    function repeatRemove() {
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

            users.forEach(user => {
                const leavesUser = user.leaves;
                let newLeavesUser = 0;

                newLeavesUser = Math.floor(leavesUser / 2);

                user.leaves = newLeavesUser;

                user.save(error => {
                    if (error) {
                        res.status(500).send({message: error});
                    }
                });

                console.log(
                    `Remove ${Math.floor(leavesUser / 2)} Leaves to ${
                        user.username
                    } total: ${user.leaves}`,
                );
            });
        });
        setTimeout(repeatRemove, 3600000);
    }
    repeatRemove();
};
