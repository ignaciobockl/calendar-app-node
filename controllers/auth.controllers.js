const { response, request } = require('express');
const bcrypt = require('bcryptjs');

const User = require('../models/User.model');


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