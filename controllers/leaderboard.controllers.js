const { selectLeaderboard, insertLeaderboard, deleteLeaderboard } = require("../models/leaderboard.models")

exports.getLeaderboard = (req, res, next) => {
    selectLeaderboard().then((leaderboard) => {
        res.status(200).send({leaderboard});
    })
    .catch(next);
};

exports.postLeaderboard = (req, res, next) => {
    const newEntry = req.body;
    insertLeaderboard(newEntry).then((leaderboard) => {
        res.status(201).send({leaderboard});
    })
    .catch(next);
};