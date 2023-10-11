# SL project

A side project for seminar groups to build a platform to help people find those with similar interests in the company.

## Setup

'npm install' to install the following dependencies:

- jest
- supertest
- mongodb
- dotenv
- express

## Docker

The container.sh file is configured to setup a local container for the database.

Ensure that docker is installed and that you can run the GUI, once that is open you can proceed to starting the local container.

You will need to give this file permissions:

```
chmod +x container.sh
```

Then to start the container:

```
./container.sh
```

When testing we can configure the database url (known as uri in MongoDB) to be:

"mongodb://localhost:27017" -- This is the port we configured in the .sh file.

In development we can point to the Atlas database which be can configured to your user in the browser.

## Endpoints

Endpoints can be tested using supertest and built in express, the only difference to what you will have seen before is in the way we connect to the database using MongoDB in the model.

E.g.

```
exports.selectUsers = async () => {
    const client = new MongoClient(uri);
    
    try {
        await client.connect();
        const db = client.db(dbName);
        const users = db.collection('users');
        const returnedUsers = await users.find().toArray();
        return returnedUsers;
    }
    finally {
        await client.close();
    };
};
```

The variable dbName being used here for the connection can be configured conditionally to connect to either our test or development databases.

## Notes on MongoDB

Query Methods:
https://www.mongodb.com/docs/manual/reference/method/js-collection/

Shell Commands:
[https://www.tutorialsteacher.com/mongodb/mongodb-shell-commands](https://www.mongodb.com/docs/mongodb-shell/run-commands/)

To view the database in a local GUI you can download Compass:

https://www.mongodb.com/try/download/shell

Point it to your localhost at the same port as above.
