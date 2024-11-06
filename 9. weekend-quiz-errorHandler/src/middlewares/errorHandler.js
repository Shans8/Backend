export const errorHandler = (err, req, res, next) => {
    let massage = 'Internal Server Error';
    let status = 500;

    res.status(status).send({ massage });
}