const { Router } = require('express');
const { check } = require('express-validator');

const { 
    createUser, 
    getUser, 
    loginUser, 
    revalidateToken 
} = require('../controllers/auth.controllers');

const { validateFields } = require('../middlewares/validateFields');


const router = Router();

router.route('/')
    .get( getUser )
    .post( [
        check('email', 'Email is required.').isEmail(),
        check('password', 'Password is required.').not().isEmpty(),
        check('password', 'The password field must contain at least 6 characters.').isLength({ min: 6 }),
        validateFields
    ], loginUser );

router.post('/new', [
    check('name', 'Name is required.').not().isEmpty(),
    check('name', 'The name field must contain at least 3 characters.').isLength({ min: 3 }),
    check('email', 'Email is required.').isEmail(),
    check('password', 'Password is required.').not().isEmpty(),
    check('password', 'The password field must contain at least 6 characters.').isLength({ min: 6 }),
    validateFields
], createUser);

router.get('/renew', revalidateToken);


module.exports = router;
