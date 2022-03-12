const express = require('express');

const { dbConnection } = require('./database/config');

require('dotenv').config();


const app = express();
const port = process.env.PORT || 8000;

// Database connection
dbConnection();

// Public directory
app.use( express.static('public') );

// Reading and parsing the body
app.use( express.json() );

// Routes
app.use( '/api/auth', require('./routes/auth.routes') );

app.listen( port, () => {
    console.log( 'Server run on port: ', port );
});
