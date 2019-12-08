#!/usr/bin/env node
import yargs from "yargs";
import {InputArg} from "./input.arg";
import {LockfileFilter} from "./lockfile.filter";
import {LockfileParser} from "./lockfile.parser";

const argv = yargs
    .option(InputArg.InputPath, { requiresArg: true, type: "string" })
    .option(InputArg.OutputPath, { requiresArg: true, type: "string" })
    .option(InputArg.Exclude, { requiresArg: true, type: "string" }).argv;

const parser = new LockfileParser();
const filter = new LockfileFilter(parser);
const inputPath = argv[InputArg.InputPath];
const exclude = argv[InputArg.Exclude];
const outputPath = argv[InputArg.OutputPath];

async function filterLines() {
    try {
        await filter.filter({
            filePath: inputPath,
            outputFilePath: outputPath,
            exclude
        });
    } catch (err) {
        console.error(err);
        process.exit(1);
    }

}

filterLines();

