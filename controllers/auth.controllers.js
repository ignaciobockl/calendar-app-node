const { response, request } = require('express');


const createUser = ( req = request, res = response ) => {

    const { name, email, password } = req.body;

    return res.status(201).json({
        ok: true,
        msg: 'register',
        user: { 
            name,
            email, 
            password
        }
    });
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