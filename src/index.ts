import * as fs from "fs-extra";
import * as yaml from "js-yaml";
import { isArray } from "lodash";
import { basename, extname, join } from "path";

function importJson(path: string): any {
    try {
        return JSON.parse(fs.readFileSync(path, "utf8"));
    } catch (err) {
        return;
    }
}

function importYaml(path: string): any {
    try {
        return yaml.safeLoad(fs.readFileSync(path, "utf8"));
    } catch (err) {
        return;
    }
}

export function importConfig(path: string | string[]): any {
    if (isArray(path)) {
        const result: any = {};
        for (const p of path) {
            const config = importConfig(p);
            if (config) { result[basename(p, extname(p))] = config; }
        }

        return Object.keys(result).length > 0 ? result : undefined;
    }

    let stats: fs.Stats;
    try {
        stats = fs.statSync(path);
    } catch (err) {
        return;
    }

    if (stats.isDirectory()) {
        return importConfig((fs.readdirSync(path)).map((p: string) => join(path, p)));
    }

    if (stats.isFile()) {
        switch (extname(path)) {
            case ".json":
                return importJson(path);
            case ".yaml":
                return importYaml(path);
        }
    }
}
