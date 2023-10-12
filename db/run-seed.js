const data = require('./data/leaderboard');
const seed = require('./seed');
const db = require('../db/index');

const runSeed = () => {
  return seed(data).then(() => db.end());
};

runSeed();