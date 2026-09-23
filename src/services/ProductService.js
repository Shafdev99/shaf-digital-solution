import models from "../models/ModelRegistry.js";

class ProductService {

    static async getAll() {
        return await models.Product.all();
    }

    static async getById(id) {
        return await models.Product.find(id);
    }

}

export default ProductService;