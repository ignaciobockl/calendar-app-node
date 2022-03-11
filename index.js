const express = require('express');


const app = express();
const port = 4000;


// Public directory
app.use( express.static('public') );

app.listen( port, () => {
    console.log( 'Server run on port: ', port );
});
