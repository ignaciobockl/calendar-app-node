const mongoose = require('mongoose');


const dbConnection = async() => {

    try {

        await mongoose.connect( process.env.MONGO_CNN, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            // useCreateIndex: true
        });

        console.log('Database online...');
        
    } catch (error) {
        throw new Error( 'Error trying to start the database.', error );
    }

}


module.exports = {
    dbConnection
}