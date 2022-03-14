const { request, response } = require('express');
const jwt = require('jsonwebtoken');


const validateJWT = ( req = request, res = response, next ) => {

    // x-token headers
    const token = req.header('x-token');

    if ( !token ) return res.status(401).json({ ok: false, msg: 'There is no token in the request.' });

    try {

        const payload = jwt.verify(
            token,
            process.env.JWT_PRIVATE_KEY
        );

        req.uid = payload.uid;
        req.name = payload.name;
        
    } catch (error) {
        return res.status(401).json({
            ok: false,
            msg: 'Error, Invalid token, check logs.',
            error
        });
    }

    next();

}



module.exports = {
    validateJWT
}