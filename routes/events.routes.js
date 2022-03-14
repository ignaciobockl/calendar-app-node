const { Router } = require('express');
const { check } = require('express-validator');

const { createEvent, deleteEvent, getEvents, updateEvent } = require('../controllers/events.controllers');

const { isDate } = require('../helpers/isDate');

const { validateFields } = require('../middlewares/validateFields');

const { validateJWT } = require('../middlewares/validateJWT');



const router = Router();

// all routes are validated by the JWT
router.use( validateJWT );

router.route('/')
    .post( [
        check('title', 'Title is required.').not().isEmpty(),
        check('start', 'Start date is required.').custom( isDate ),
        check('end', 'End date is required.').custom( isDate ),
        validateFields
    ], createEvent )
    .get( getEvents );

router.route('/:id')
    .delete( deleteEvent )
    .put( updateEvent );



module.exports = router;