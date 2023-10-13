const express = require('express');
const cors = require('cors');
const { getLeaderboard, postLeaderboard, removeLeaderboard } = require('./controllers/leaderboard.controllers');

const app = express();

var corsOptions = {
    origin: 'https://richardneat.github.io/snake/',
    optionsSuccessStatus: 200
};

app.use(express.json());

app.get('/api/leaderboard', getLeaderboard);
app.post('/api/leaderboard', cors(corsOptions), postLeaderboard);

app.use((err, req, res, next) => {
    if (err.status) {
        res.status(err.status).send({msg: err.msg});
    } else {
        next(err);
    };
});

app.use((err, req, res, next) => {
    console.log(err);
    res.status(500).send({msg: "internal server error"});
});

module.exports = app;