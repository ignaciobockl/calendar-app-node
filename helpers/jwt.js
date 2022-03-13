const jwt = require('jsonwebtoken');



const generateJWT = ( uid, name ) => {

    return new Promise( ( resolve, reject ) => {

        const payload = { uid, name };

        jwt.sign( payload, process.env.JWT_PRIVATE_KEY, {
            expiresIn: '2h'
        }, ( err, token ) => {
            
            if ( err ) reject('Failed to generate token.', err);

            resolve( token );

        });

    });

}



module.exports = {
    generateJWT
}