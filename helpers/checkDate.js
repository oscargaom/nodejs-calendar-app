const moment = require('moment');

const checkDate = (value, { req, location, path }) => {

    // console.log(value);
    if (!value) {
        return false;
    }
    
    return moment(value).isValid();
};

module.exports = {
    checkDate
}