const express = require('express');
const cors = require('cors');
const { getLeaderboard, postLeaderboard, removeLeaderboard } = require('./controllers/leaderboard.controllers');

const app = express();
let corsOptions = {};

if (!process.env.NODE_ENV !== 'test') {
    const whitelist = ['https://richardneat.github.io/snake/'];
    corsOptions = {
      origin: function (origin, callback) {
        if (whitelist.indexOf(origin) !== -1) {
          callback(null, true)
        } else {
          callback(new Error('Not allowed by CORS'))
        }
      }
    }
}

app.use(express.json());

app.get('/api/leaderboard', cors(corsOptions), getLeaderboard);
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