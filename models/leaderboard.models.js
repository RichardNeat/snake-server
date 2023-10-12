const db = require('../db/index');

exports.selectLeaderboard = () => {
    return db.query('SELECT * FROM leaderboard ORDER BY score DESC;').then(({rows}) => {
        return rows;
    });
};

exports.insertLeaderboard = async (newEntry) => {
    const {name, score} = newEntry;
    if (!name || !score) {
        return Promise.reject({
            status: 400,
            msg: 'bad request'
        });
    };
    return db.query('INSERT INTO leaderboard (name, score) VALUES ($1, $2) RETURNING *;', ([name, score]))
    .then(({rows}) => {
        return rows[0];
    });
};