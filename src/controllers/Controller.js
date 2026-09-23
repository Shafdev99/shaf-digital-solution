class Controller {
    static success(res, data = null, message = "Berhasil") {
        return res.status(200).json({
            success: true,
            message: message,
            data: data
        });
    }
}

export default Controller;