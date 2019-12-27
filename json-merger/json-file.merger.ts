import merge from "lodash/merge";
import {readFileSync, writeFileSync} from "fs";

export class JsonFileMerger {
    merge<T>(objects: Array<Partial<T>>): T {
        return merge({}, ...objects);
    }

    mergeFiles<T>(inputFiles: string[]): T {
        const inputObjects = inputFiles.map(file => readFileSync(file).toString())
        .map(fileString => JSON.parse(fileString));
        return this.merge<T>(inputObjects);
    }
}
