import {DepsBuilder} from "./deps.builder";
import {expect} from "chai";
import {npmDepPrefix} from "./npm.deps.prefix";

describe("Dependencies object builder", () => {

    let instance: DepsBuilder;
    let allDeps: Record<string, string>;

    beforeEach(() => {
        instance = new DepsBuilder();
        const allDepNames = [
            "foo",
            "bar",
            "baz"
        ];
        allDeps = Object.keys(allDepNames).reduce((object, dep) => ({
            [dep]: "foo"
        }), {});
    });

    it("Extracts all the dependencies", () => {
        const npmDepKeys = Object.keys(allDeps).map(key => npmDepPrefix + key);
        expect(instance.build(allDeps, npmDepKeys)).to.deep.equal(allDeps);
    });

    it("Skips non-NPM dependencies", () => {
        expect(instance.build(allDeps, ["foo", "bar"])).to.deep.equal({});
    });


});
