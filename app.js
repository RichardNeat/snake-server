const express = require('express');
const { getLeaderboard, postLeaderboard } = require('./controllers/leaderboard.controllers');

const app = express();

app.use(express.json());

app.get('/api/leaderboard', getLeaderboard);
app.post('/api/leaderboard', postLeaderboard);

app.use((err, req, res, next) => {
    if (err.status === 400) {
        res.status(400).send({msg: 'bad request'});
    } else {
        next(err);
    };
});

app.use((err, req, res, next) => {
    console.log(err);
    res.status(500).send({msg: "internal server error"});
});

module.exports = app;