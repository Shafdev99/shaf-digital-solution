class Logger {

    static handle(req, res, next) {

        console.log(
            `${req.method} ${req.originalUrl}`
        );

        next();
    }

}

export default Logger;