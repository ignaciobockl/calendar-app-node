const { response, request } = require('express');
const bcrypt = require('bcryptjs');

const User = require('../models/User.model');

const { generateJWT } = require('../helpers/jwt');



const createUser = async( req = request, res = response ) => {

    const { password } = req.body;

    try {

        const user = new User( req.body );

        // encrypt the password
        const salt = bcrypt.genSaltSync(10); // default value 10
        user.password = bcrypt.hashSync( password, salt );

        await user.save();
        
        return res.status(201).json({
            ok: true,
            msg: 'register',
            user
        });

    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: 'Error when trying to create a new user, check logs.',
            error
        });
    }
}

const getUser = ( req = request, res = response ) => {

    return res.json({
        ok: true,
        msg: 'get'
    });

}

const loginUser = async( req = request, res = response ) => {

    const { email, password } = req.body;

    const user = await User.findOne({ email });

    try {

        // validate password
        const validPass = bcrypt.compareSync( password, user.password );
        if ( !validPass ) return res.status(400).json({ ok: false, msg: 'The entered password is incorrect.' });

        // generate jwt
        const token = await generateJWT( user._id, user.name );

        return res.json({
            ok: true,
            msg: 'login ok',
            user: {
                uid: user._id,
                name: user.name
            },
            token
        });
        
    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: 'User login error, check logs.',
            error
        });
    }

}

const revalidateToken = async( req = request, res = response ) => {

    const { uid, name } = req;

    try {
        
        // generate a new jwt
        const token = await generateJWT( uid, name );

        return res.json({
            ok: true,
            msg: 'Revalidated token.',
            user: {
                uid,
                name
            },
            token
        });

    } catch (error) {
        return res.status(400).json({ ok: false, msg: 'Error revalidating token, check logs.', error });
    }

}



module.exports = {
    createUser,
    getUser,
    loginUser,
    revalidateToken
}