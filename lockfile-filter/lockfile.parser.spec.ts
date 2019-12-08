import {LockfileParser} from "./lockfile.parser";
import {expect} from "chai";

describe("Lockfile parser", () => {
    let instance: LockfileParser;
    beforeEach(() => {
        instance = new LockfileParser();
    });

    it("Identifies a line as not being a block header when it starts with a #", () => {
        const commentLine = "# foo";
        expect(instance.isBlockHeader(commentLine)).to.equal(false);
    });
});
