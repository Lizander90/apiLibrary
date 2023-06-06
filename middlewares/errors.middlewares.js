import Boom from "boom";

export function errorHandler(err, req, res, next) {
    console.log('paso x aki el primero')
    if (err) {
        next({"message":'Texto requerido'})
    }
}
export function controlError(err, req, res, next) {
    if (err) {
        res.status(400)
        res.json({ status: 'error', error: err })
    }
}

export function validatePrompt(schemaJoi, params) {
    return (req, resp, next) => {
        const value = req[params]
        const { error } = schemaJoi.validate(value)
        if (error) {
            throw new Error('Bad request prompt')
        }
        next()
    }
}
