import Controller from "./Controller.js";
import ProductService from "../services/ProductService.js";

class ProductController extends Controller {

    static async index(req, res) {
        const products = await ProductService.getAll();

        return Controller.success(
            res,
            products,
            "Produk berhasil ditemukan"
        );
    }

    static async show(req, res) {
        const id = req.params.id;

        const product = await ProductService.getById(id);

        return Controller.success(
            res,
            product,
            "Produk berhasil ditemukan"
        );
    }

}

export default ProductController;