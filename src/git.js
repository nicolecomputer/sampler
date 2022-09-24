import path from "path";
import git from "isomorphic-git";
import http from "isomorphic-git/http/node/index.js";
import fs from "fs";
import config from "./config.js"

export async function setup(projectConfig) {
    const dir = path.join(config.data_path, "repo")
    fs.rmSync(dir, { recursive: true, force: true });

    await git.clone({
        fs, http, dir,
        url: projectConfig.repo,
        ref: 'main',
        singleBranch: true,
        depth: 1,
        onAuth: () => ({ username: config.github_token }),

    })
}

export async function commit(projectConfig, filePath) {
    const dir = path.join(config.data_path, "repo")

    await git.add({ fs, dir, filepath: filePath })

    let sha = await git.commit({
        fs,
        dir,
        message: `Add data sample to ${filePath}`,
        author: projectConfig.committer
    })

    let pushResult = await git.push({
        fs,
        http,
        dir,
        remote: 'origin',
        ref: 'main',
        onAuth: () => ({ username: config.github_token }),
    })
}

export async function cleanup() {
    const dir = path.join(config.data_path, "repo")

    fs.rmSync(dir, { recursive: true, force: true });
}
