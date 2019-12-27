#!/usr/bin/env node

// Based on https://github.com/dataform-co/dataform/blob/master/tools/json-merge/index.ts
import {readFileSync, writeFileSync} from "fs";
import yargs from "yargs";
import {InputArg} from "./input.arg";
import {JsonFileMerger} from "./json-file.merger";

const argv = yargs
    .option(InputArg.OutputPath, { required: true })
    .option(InputArg.LayerPaths, { array: true })
    .option(InputArg.Substitutions, { type: "string" }).argv;

const outputPath = argv.outputPath as string;
const layerPaths = argv.layerPaths as string[];
const substitutions = JSON.parse(argv.substitutions || JSON.stringify({})) as Record<string, string>;

// Merge layers in the given order.
const merger = new JsonFileMerger();
const resultObject = merger.mergeFiles(layerPaths);

let resultString = JSON.stringify(resultObject, null, 4);

// Apply any plain string substitutions.
if (substitutions) {
    resultString = Object.keys(substitutions).reduce(
        (original, key) => original.split(key).join(substitutions[key]),
        resultString
    );
}

writeFileSync(outputPath, resultString);
