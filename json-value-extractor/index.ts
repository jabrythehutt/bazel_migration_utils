import {readFileSync, writeFileSync} from "fs";
import yargs from "yargs";
import {InputArg} from "./input.arg";
import {JsonValueExtractor} from "./json.value.extractor";

function toOutputString(input: any): string {
    const typesToStringify = ["undefined", "object", "number"];
    if (typesToStringify.includes(typeof input)) {
        return JSON.stringify(input) || "";
    }
    return input;
}

const valueExtractor = new JsonValueExtractor();

const argv = yargs
    .option(InputArg.InputPath, { requiresArg: true })
    .option(InputArg.OutputPath, { requiresArg: true })
    .option(InputArg.SelectKeys, {requiresArg: false, array: true})
    .option(InputArg.JsonPath, { requiresArg: false }).argv;

const outputPath = argv[InputArg.OutputPath] as string;
const inputPath = argv[InputArg.InputPath] as string;
const selectedKey = argv[InputArg.SelectKeys] as string[];
const jsonPath = (argv[InputArg.JsonPath] || "$") as string;


const jsonString = readFileSync(inputPath).toString();
const inputValue = JSON.parse(jsonString);
const result = valueExtractor.getValue(inputValue, jsonPath, selectedKey);
const outputValue = toOutputString(result);
console.log("Writing", outputValue, "to", outputPath);
writeFileSync(outputPath, outputValue);
