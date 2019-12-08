import {npmDepPrefix} from "./npm.deps.prefix";

export class DepsBuilder {

    build(allPackageDeps: Record<string, string>, files: string[]): Record<string, string> {
        const npmPackageNames = this.toNpmPackageNames(files);
        return npmPackageNames.reduce((depsObject, key) => ({
                ...depsObject,
                [key]: allPackageDeps[key]
            }), {});
    }

    uniqueStrings(input: string[]): string[] {
        return input.filter((item, index, array) => array.indexOf(item) === index);
    }

    toNpmPackageNames(files: string[]): string[] {
        return this.uniqueStrings(files.filter(file => this.isNodePackage(file))
        .map(file => this.toNpmPackageName(file)));
    }

    toNpmPackageName(file: string): string {
        const relativeFilePath =  file.replace(npmDepPrefix, "");
        const sep = "/";
        const parts = relativeFilePath.split(sep);
        const firstPart = parts.shift();
        if (firstPart.startsWith("@")) {
            return [firstPart, parts.shift()].join(sep);
        }
        return firstPart;
    }

    isNodePackage(file: string): boolean {
        return file.startsWith(npmDepPrefix);
    }
}
