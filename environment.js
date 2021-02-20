require('dotenv').config();

let env_vars = process.env;

const config = (options) => {
    env_vars = {
        ... env_vars,
        ... options,
    }
}

const vars = () => Object.assign({}, env_vars);

module.exports = {
    config,
    vars,
}