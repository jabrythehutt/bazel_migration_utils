import {LockfileFilter} from "./lockfile.filter";
import {LockfileParser} from "./lockfile.parser";
import {resolve} from "path";
import {tmpdir} from "os";
import {expect} from "chai";
import {mkdtempSync, readdirSync, readFileSync, unlinkSync} from "fs";

describe("Lockfile filter", () => {

    let instance: LockfileFilter;
    let tempDir: string;
    beforeEach(() => {
        const parser = new LockfileParser();
        instance = new LockfileFilter(parser);
        tempDir = mkdtempSync(resolve(tmpdir(), "lockfile-temp"));
    });

    it("Removes some entries from the project yarn.lock file", async () => {
        const inputFilePath = resolve(__dirname, "test-yarn.lock");
        const outputFilePath = resolve(tempDir, "yarn.lock");
        const excludedTerm = "@bazel";
        await instance.filter({
            outputFilePath,
            filePath: inputFilePath,
            exclude: excludedTerm
        });
        const fileContents = readFileSync(outputFilePath).toString();
        expect(fileContents).to.not.include(excludedTerm);
    });

    afterEach(() => {
        const tempFiles = readdirSync(tempDir).map(f => resolve(tempDir, f));
        for(const tempFile of tempFiles) {
            unlinkSync(tempFile);
        }
    });
});
