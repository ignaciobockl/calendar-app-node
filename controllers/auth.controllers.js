const { response, request } = require('express');
const bcrypt = require('bcryptjs');

const User = require('../models/User.model');


const createUser = async( req = request, res = response ) => {

    const { email, password } = req.body;

    let userEmail = await User.findOne({ email });
    if ( userEmail ) { 
        return res.status(400).json({
            ok: false,
            msg: `The entered email: ${ email } is already registered in the database.`
        });
    }

    try {

        const user = new User( req.body );
        console.log('user1: ', user)

        // encrypt the password
        const salt = bcrypt.genSaltSync(10);
        user.password = bcrypt.hashSync( password, salt );
        console.log('user2: ', user)

        // await user.save();
        
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

const loginUser = ( req = request, res = response ) => {

    const { email, password } = req.body;

    return res.json({
        ok: true,
        msg: 'login',
        user: { 
            email, 
            password
        }
    });

}

const revalidateToken = ( req = request, res = response ) => {

    return res.json({
        ok: true,
        msg: 'revalidateToken'
    })

}


module.exports = {
    createUser,
    getUser,
    loginUser,
    revalidateToken
}