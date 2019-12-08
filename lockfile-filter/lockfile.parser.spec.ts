import {LockfileParser} from "./lockfile.parser";
import {expect} from "chai";

describe("Lockfile parser", () => {
    let instance: LockfileParser;
    beforeEach(() => {
        instance = new LockfileParser();
    });

    it("Parses a lockfile", () => {
        const header = "# foo";
        const entryHeader = "@foo";
        const lines = ["bar", "baz"];
        const mockLockContent = [header, "", "", entryHeader, ...lines.map(l => ` ${l}`)].join(instance.lineSep);
        const parsedFile = instance.parse(mockLockContent);
        expect(parsedFile.header).to.equal(header);
        expect(parsedFile.content).to.deep.equal({
            [entryHeader]: lines
        });
    });
});
