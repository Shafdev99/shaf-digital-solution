class ErrorHandler {

    static handle(err, req, res, next) {

        console.error(err);

        const statusCode = err.statusCode || 500;

        return res.status(statusCode).json({
            success: false,
            message: err.message || "Terjadi kesalahan"
        });
    }

}

export default ErrorHandler;