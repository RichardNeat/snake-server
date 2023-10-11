const client = require('./index');

const seed = async (leaderboard) => {
    await client.connect();
    try {
        const db = client.db('snake'); // name of the database
        const collection = db.collection('leaderboard'); // name of the collection
        await collection.deleteMany({});
        await collection.insertMany(leaderboard);
    }
    catch (error) {
        console.log(error, "error")
    }
    finally {
        console.log("seeding complete")
    }
};

module.exports = seed;