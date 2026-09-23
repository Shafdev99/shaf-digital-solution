class Validator {

    static validate(data, rules) {

        const errors = {};

        for (const field in rules) {

            const fieldRules = rules[field].split("|");

            for (const rule of fieldRules) {

                if (rule === "required") {

                    if (
                        data[field] === undefined ||
                        data[field] === null ||
                        data[field] === ""
                    ) {
                        errors[field] = `${field} wajib diisi`;
                    }

                }

            }

        }

        return Object.keys(errors).length > 0
            ? errors
            : null;
    }

}

export default Validator;