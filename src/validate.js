const yup = require('yup')

module.exports = (shape, path = 'body') => (req, res, next) => {
    const validationSchema = yup.object().shape(shape)

    try {
        validationSchema.validateSync(req[path], { abortEarly: false })
        next()
    } catch (error) {
        return res
            .status(422)
            .json({ errors: error.errors })
    }
}