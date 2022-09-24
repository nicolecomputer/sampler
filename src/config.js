import * as dotenv from 'dotenv' // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config()

export default {
    data_path: process.env.DATA_PATH || "/data",
    config_path: process.env.CONFIG_PATH || "/config",
    github_token: process.env.GITHUB_TOKEN,
}
