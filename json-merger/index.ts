#!/usr/bin/env node

// Based on https://github.com/dataform-co/dataform/blob/master/tools/json-merge/index.ts
import {readFileSync, writeFileSync} from "fs";
import yargs from "yargs";
import {InputArg} from "./input.arg";

const argv = yargs
    .option(InputArg.OutputPath, { required: true })
    .option(InputArg.LayerPaths, { array: true })
    .option(InputArg.Substitutions, { type: "string" }).argv;

const outputPath = argv.outputPath as string;
const layerPaths = argv.layerPaths as string[];
const substitutions = JSON.parse(argv.substitutions || JSON.stringify({})) as Record<string, string>;

// Merge layers in the given order.
const result = layerPaths
    .map((layerPath: string) => JSON.parse(readFileSync(layerPath).toString()))
    .reduce(
        (accumulatorJson: object, layerJson: object) => ({ ...accumulatorJson, ...layerJson }),
        {}
    );

let resultString = JSON.stringify(result, null, 4);

// Apply any plain string substitutions.
if (substitutions) {
    resultString = Object.keys(substitutions).reduce(
        (original, key) => original.split(key).join(substitutions[key]),
        resultString
    );
}

writeFileSync(outputPath, resultString);
