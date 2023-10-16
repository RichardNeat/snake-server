const express = require('express');
const cors = require('cors');
const { getLeaderboard, postLeaderboard } = require('./controllers/leaderboard.controllers');

const app = express();

app.use(cors());

app.use((req, res, next) => {
    const userAgent = req.get('User-Agent');
    if (userAgent && (userAgent.includes('Postman') || userAgent.includes('Insomnia'))) {
      return res.status(403).json({ error: 'Oi stop trying to hack my snake game 🐍' });
    }
    next();
});

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