const db = require("../models");
const Log = db.log;

exports.getLogs = (req, res) => {
    Log.find({}).exec((err, logs) => {
        if (err) {
            res.status(500).send({message: err});
            return;
        }

        res.json(logs);
    });
};

exports.postLog = (req, res) => {
    const log = new Log({
        playerId: req.body.playerId,
        playerUsername: req.body.playerUsername,
        playerEmail: req.body.playerEmail,
        action: req.body.action,
    });

    log.save(err => {
        if (err) {
            res.status(500).send({message: err});
        }
    });
};
