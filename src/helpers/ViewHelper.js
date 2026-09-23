class ViewHelper {

    static url(path = "") {

        return `/${path}`.replace(/\/+/g, "/");
    }

}

export default ViewHelper;