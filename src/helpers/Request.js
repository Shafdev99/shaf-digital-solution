class Request {

    constructor(req) {
        this.req = req;
    }

    params() {
        return this.req.params;
    }

    query() {
        return this.req.query;
    }

    body() {
        return this.req.body;
    }

    input(key, defaultValue = null) {
        if (this.req.body && this.req.body[key] !== undefined) {
            return this.req.body[key];
        }

        if (this.req.query && this.req.query[key] !== undefined) {
            return this.req.query[key];
        }

        if (this.req.params && this.req.params[key] !== undefined) {
            return this.req.params[key];
        }

        return defaultValue;
    }
}

export default Request;