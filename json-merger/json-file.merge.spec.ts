import {JsonFileMerger} from "./json-file.merger";
import {expect} from "chai";

describe("JSON file merger", () => {
    let instance: JsonFileMerger;

    beforeEach(() => {
        instance = new JsonFileMerger();
    });

    it("Merges some nested fields", () => {
        const object1 = {
            foo: {
                bar: "baz"
            }
        };

        const object2 = {
            foo: {
                baz: "foo"
            }
        };

        const expectedOutput = {
            foo: {
                bar: "baz",
                baz: "foo"
            }
        };
        const result = instance.merge<any>([object1, object2]);
        expect(result).to.deep.equal(expectedOutput);

    });


});
