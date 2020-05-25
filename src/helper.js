const { validationResult } = require('express-validator');

function getValidationErrors(req) {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
        return errors.array().reduce((acc, error) => {
            return {
                ...acc,
                [error.param]: [...(acc[error.param] ? acc[error.param]: []), error.msg]
                }
            }, 
        {}) 
    }

    return null
}

module.exports = {
    getValidationErrors
}