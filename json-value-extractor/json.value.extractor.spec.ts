import {expect} from "chai";
import {JsonValueExtractor} from "./json.value.extractor";

describe("JSON value extractor", () => {
    let instance: JsonValueExtractor;
    const value = "bar";
    const key = "foo";
    const input = {
        [key]: value,
        bar: "baz"
    };

    beforeEach(() => {
        instance = new JsonValueExtractor();
    });

    it("Extracts a key-value pair as a JSON", () => {
        const result = instance.getValue(input, `$.${key}`);
        expect(result).to.equal(value, "Didn't find the expected output value");
    });

    it("Filters out keys from an object", () => {
        const result = instance.getValue(input, "$", [key]);
        expect(result).to.deep.equal({[key]: value});
    });

});
