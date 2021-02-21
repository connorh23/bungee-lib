require('dotenv').config();

let env_vars = {
    ...process.env
};

const config = (options) => {
    env_vars = {
        ... env_vars,
        ... options,
    }
};

module.exports = {
    config,
    vars: Object.assign({}, env_vars),
};
