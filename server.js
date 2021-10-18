const app = require("./app")
const server = require('http').Server(app)
const mongo = require('./db/mongoose')

process.on('uncaughtException', err => {
    console.log('UNCAUGHT EXCEPTION!!! shutting down...');
    console.log(err.name, err.message);
    process.exit(1);
});

const port = process.env.PORT || 4040

const connectToServer = () => {
    app.listen(port, () => console.log(`Application is running on http://localhost:${port}`))
}

//Connect to database --> if success start server
const connectToDatabase = (DB_URL) => {

    mongo.connectDB(DB_URL)
    .then(() => console.log('Database connected successfully'))
    .then(connectToServer)
    .catch((e) => {
        console.log(e)
        setTimeout(connectToDatabase, 5000)    
    })
}

connectToDatabase(process.env.MONGO_URL)

process.on('unhandledRejection', err => {
    console.log('UNHANDLED REJECTION!!!  shutting down ...');
    console.log(err.name, err.message);
    server.close(() => {
        process.exit(1);
    });
});