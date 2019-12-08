import {basename, dirname, sep} from "path";
import {ServerlessConfigFile} from "./serverless.config.file";
export class SlsFolderResolver {
    resolve(files: string[]): string {
        const slsDirs = files
        .filter(file => this.isServerlessConfigFile(file))
        .map(file => dirname(file));
        // Find the top directory containing a Serverless config
        return slsDirs.sort((dir1, dir2) =>
        dir1.split(sep).length - dir2.split(sep).length)
        .shift();
    }

    isServerlessConfigFile(input: string): boolean {
        return Object.values(ServerlessConfigFile)
            .includes(basename(input) as ServerlessConfigFile);
    }
}
