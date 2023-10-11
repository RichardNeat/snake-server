const client = require('../db/index');

exports.selectLeaderboard = async () => {
    try {
        await client.connect();
        const db = client.db('snake');
        const leaderboard = db.collection('leaderboard');
        const returnedLeaderboard = await leaderboard.find().sort({score : -1}).toArray();
        return returnedLeaderboard;
    }
    catch (error) {
        console.log(error, "GET")
    }
    finally {
        await client.close();
    };
};

exports.insertLeaderboard = async (newEntry) => {
    if (!newEntry.name || !newEntry.score) {
        return Promise.reject({
            status: 400,
            msg: 'bad request'
        });
    };
    
    try {
        await client.connect();
        const database = client.db('snake');
        const leaderboard = database.collection("leaderboard");
        const addedEntry = await leaderboard.insertOne(newEntry);
        return {_id: addedEntry.insertedId, ...newEntry};
    }
    catch (error) {
        console.log(error, "POST")
    }
    finally {
        await client.close();
    };
};