class View {

    static render(res, view, data = {}) {

        const layout = data.layout || "layouts/app";

        res.render(view, data, function (error, html) {

            if (error) {
                return res.app.emit("error", error);
            }

            res.render(layout, {
                ...data,
                body: html
            });

        });

    }

}

export default View;