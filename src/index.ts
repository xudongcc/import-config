import * as fs from "fs-extra";
import * as yaml from "js-yaml";
import { merge } from "lodash";
import { basename, extname, join } from "path";

export function importJson(path: string): any {
    try {
        return JSON.parse(fs.readFileSync(path, "utf8"));
    } catch (err) {
        return;
    }
}

export function importYaml(path: string): any {
    try {
        return yaml.safeLoad(fs.readFileSync(path, "utf8"));
    } catch (err) {
        return;
    }
}

export function importConfig(...paths: string[]): any {
    if (paths.length > 1) {
        return merge({}, ...paths.map((path) => importConfig(path)));
    }

    let stats: fs.Stats;
    try {
        stats = fs.statSync(paths[0]);
    } catch (err) {
        return;
    }

    if (stats.isDirectory()) {
        const result: any = {};
        fs.readdirSync(paths[0]).forEach((name: string) => {
            const path = join(paths[0], name);
            const config = importConfig(path);
            if (config) { result[basename(path, extname(path))] = config; }
        });

        if (Object.keys(result).length > 0) {
            return result;
        }
    } else {
        switch (extname(paths[0])) {
            case ".json":
                return importJson(paths[0]);
            case ".yaml":
                return importYaml(paths[0]);
        }
    }

    return;
}
