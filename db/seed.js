const db = require('./index');
const format = require("pg-format");

const seed = async (leaderboard) => {

    await db.query(`DROP TABLE IF EXISTS leaderboard;`);

    await db.query (`
        CREATE TABLE leaderboard (
            leaderboard_id SERIAL PRIMARY KEY,
            name VARCHAR,
            score INT
        );`
    );

    const insertLeaderBoardStr = format(`
        INSERT INTO leaderboard 
        (name, score)
        VALUES %L
    ;`
    , leaderboard.map(({name, score}) => [name, score]));

    await db.query(insertLeaderBoardStr);
};

module.exports = seed;