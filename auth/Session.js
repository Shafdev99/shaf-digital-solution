class Session {

    static login(req, user) {

        req.session.user = {
            id: user.id,
            name: user.name
        };

    }

    static logout(req) {

        return new Promise((resolve, reject) => {

            req.session.destroy(error => {

                if (error) {
                    return reject(error);
                }

                resolve();

            });

        });

    }

    static user(req) {

        return req.session.user || null;

    }

    static check(req) {

        return !!req.session.user;

    }

}

export default Session;