const User = require('../models/User.model');



/**
 * Generic
 */

const isValidString = ( param = '' ) => {

    if ( typeof( param ) === 'boolean' || typeof( param ) === 'number' ) 
        throw new Error(`Invalid data type: ${ param }, expected string.`);

}


/**
 * User
 */
const emailExist = async( email = '' ) => {

    const exist = await User.findOne({ email });
    if ( exist ) throw new Error(`The email entered: ${ email } is already registered in the database.`);

}

const emailRegistered = async( email = '' ) => {

    const exist = await User.findOne({ email });
    if ( !exist ) throw new Error(`The entered email: ${ email } is not registered in the database.`);

}



module.exports = {
    emailExist,
    emailRegistered,
    isValidString
}