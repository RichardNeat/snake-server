const express = require('express');
const cors = require('cors');
const { getLeaderboard, postLeaderboard } = require('./controllers/leaderboard.controllers');

const app = express();

const allowedOrigins = [
    'https://richardneat.github.io/snake',
    'http://localhost:3000',
];

app.use(cors({
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
        } else {
        callback(new Error('Not allowed by CORS'));
        }
    },
    optionsSuccessStatus: 200,
}));

app.use(express.json());

app.get('/api/leaderboard', getLeaderboard);
app.post('/api/leaderboard', postLeaderboard);

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