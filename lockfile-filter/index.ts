#!/usr/bin/env node
import yargs from "yargs";
import {InputArg} from "./input.arg";
import {LockfileFilter} from "./lockfile.filter";
import {LockfileParser} from "./lockfile.parser";
import {readFileSync, writeFileSync} from "fs";

const argv = yargs
    .option(InputArg.InputPath, { requiresArg: true, type: "string" })
    .option(InputArg.OutputPath, { requiresArg: true, type: "string" })
    .option(InputArg.Exclude, { requiresArg: true, type: "string" }).argv;

const parser = new LockfileParser();
const filter = new LockfileFilter(parser);
const input = readFileSync(argv[InputArg.InputPath]).toString();
const exclude = argv[InputArg.Exclude];
const filteredFileContent = filter.filter({
    input,
    exclude
});
const outputPath = argv[InputArg.OutputPath];
writeFileSync(outputPath, filteredFileContent);
