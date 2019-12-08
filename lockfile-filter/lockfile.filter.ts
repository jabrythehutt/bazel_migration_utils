import {FilterRequest} from "./filter.request";
import {LockfileParser} from "./lockfile.parser";
import {createReadStream, createWriteStream} from "fs";
import {createInterface} from "readline";
import Stream, {FileSink, pipeToNodeStream, Readable, Writable} from "ts-stream";

export class LockfileFilter {

    constructor(private parser: LockfileParser) {
    }

    async filter(request: FilterRequest): Promise<void> {
        const sink = new FileSink(request.outputFilePath);
        const lineStream = new Stream<string>();
        const pipeline = lineStream.transform<string>(async (readable, writable) => {
            let block = "";
            await readable.forEach(async line => {
                if(this.parser.isBlockHeader(line)) {
                    await this.writeBlock(request, block, writable);
                    block = "";
                }
                block += line + this.parser.lineSep;
            }, async () => {
                await this.writeBlock(request, block, writable);
                await writable.end();
            });

        }).pipe(sink);
        const readStream = createReadStream(request.filePath);
        const lineReader = createInterface({input: readStream});
        lineReader.on("line", async line => {
            lineReader.pause();
            await lineStream.write(line);
            lineReader.resume();
        });
        lineReader.on("close", async () => {
            await lineStream.end();
        });
        lineReader.on("error", error => lineStream.abort(error));
        await pipeline.result();
    }


    private async writeBlock(request: FilterRequest, block: string, writable: Writable<string>) {
        if(!block.includes(request.exclude)) {
            await writable.write(block);
        }
    }

}
