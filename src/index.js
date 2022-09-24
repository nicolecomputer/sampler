import * as dotenv from 'dotenv' // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config()

import express from 'express';
import fs from "fs";
import path from "path";

import config from "./config.js"
import { writeData } from "./data.js"

import * as Git from "./git.js"

const app = express()
const port = 3000
app.use(express.json());

const configFileData = fs.readFileSync(path.join(config.config_path, "config.json"))
const configData = JSON.parse(configFileData);

function configForKey(key) {
    const a = configData.projects.filter(project => {
        return project.id == key
    })
    return a && a[0]
}

app.post("/log", async (req, res) => {
    try {
        const projectConfig = configForKey(req.query.key)
        if (!projectConfig) {
            console.log("Failed to find key")
            throw new Error("Failed to find key")
            return
        }

        console.log(projectConfig)

        await Git.setup(projectConfig)
        const filePath = writeData(projectConfig, req.body)
        await Git.commit(projectConfig, filePath);
        await Git.cleanup();

        console.log("Success")

        res.send('Done')
    } catch (error) {
        console.log(error)
        res.status(500)
        res.send('error')
    }
})

app.listen(port, () => {
    console.log(`Sampler started on ${port}`)
})
