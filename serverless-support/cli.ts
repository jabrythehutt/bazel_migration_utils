#!/usr/bin/env node

import yargs from "yargs";
import {InputArg} from "./input.arg";
import {SlsFolderResolver} from "./sls.folder.resolver";
import {resolve} from "path";
import {copyFileSync, mkdtempSync, symlinkSync, readdirSync} from "fs";
import {execSync} from "child_process";
import {tmpdir} from "os";

const argv = yargs
    .option(InputArg.SlsBinary, {requiresArg: false, type: "string"})
    .option(InputArg.SlsArgs, {array: true})
    .option(InputArg.Sources, {array: true}).argv;

const folderResolver = new SlsFolderResolver();
const files = argv[InputArg.Sources] as string[];
const slsBinary = argv[InputArg.SlsBinary] || "serverless";
const slsArgs = (argv[InputArg.SlsArgs] || []) as string[];
const outputFolder = mkdtempSync(resolve(tmpdir(), "sls-temp"));
const slsConfigFiles = files.filter(file => folderResolver.isServerlessConfigFile(file));
if(!slsConfigFiles.length) {
    throw new Error("Couldn't find a Serverless config file in the supplied sources");
}
const slsFolder = folderResolver.resolve(slsConfigFiles);
const inputFiles = readdirSync(slsFolder);
for(const file of inputFiles) {
    const inputPath = resolve(slsFolder, file);
    const outputPath = resolve(outputFolder, file);
    if(folderResolver.isServerlessConfigFile(inputPath)) {
        copyFileSync(inputPath, outputPath);
    } else {
        symlinkSync(inputPath, outputPath)
    }
}
const command = [slsBinary, ...slsArgs].join(" ");
execSync(command, {cwd: outputFolder, stdio: "inherit"});
execSync(`rm -rf ${outputFolder}`);
