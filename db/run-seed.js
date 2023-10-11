const data = require('./data/leaderboard');
const seed = require('./seed');

const client = require('./index');

seed(data).then(() => client.close());