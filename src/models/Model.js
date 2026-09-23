import { Model } from "@sequelize/core";

class BaseModel extends Model {

    static async all() {
        return await this.findAll();
    }

    static async find(id) {
        return await this.findByPk(id);
    }

}

export default BaseModel;