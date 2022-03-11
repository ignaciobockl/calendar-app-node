const express = require('express');

require('dotenv').config();


const app = express();
const port = process.env.PORT || 8000;


// Public directory
app.use( express.static('public') );

app.listen( port, () => {
    console.log( 'Server run on port: ', port );
});
