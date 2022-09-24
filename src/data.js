import { DateTime } from "luxon";
import fs from "fs";
import path from "path";
import config from "./config.js"



export function writeData(project_config, data) {
    const now = DateTime.now().toUnixInteger()
    const fileName = `sample-${now}.json`
    const fileData = {
        time: now,
        ...data,
    }

    const basePath = path.join(config.data_path, "repo")
    const filePath = path.join(project_config.path, fileName);
    const fullPath = path.join(basePath, filePath);

    fs.writeFileSync(fullPath, JSON.stringify(fileData, null, 2));

    return filePath;
}
