#!/usr/bin/env node
import {readFileSync, writeFileSync} from "fs";
import yargs from "yargs";
import {InputArg} from "./input.arg";
import {DepsBuilder} from "./deps.builder";

const argv = yargs
    .option(InputArg.PacakgeJsonPath, { requiresArg: true, string: true })
    .option(InputArg.NpmDeps, { array: true})
    .option(InputArg.OutputPath, { requiresArg: true, string: true }).argv;

const builder = new DepsBuilder();
const packageJson = JSON.parse(readFileSync(argv[InputArg.PacakgeJsonPath]).toString());
const allDeps = {
    ...packageJson.devDependencies,
    ...packageJson.dependencies
};
const npmDeps = argv[InputArg.NpmDeps] as string[];
const dependencies = builder.build(allDeps, npmDeps);
const mergedJson = {
    dependencies
};
const outputPath = argv[InputArg.OutputPath] as string;
const mergedJsonString = JSON.stringify(mergedJson, null, 4);
writeFileSync(outputPath, mergedJsonString);

