export class LockfileParser {

    lineSep = "\n";

    isBlockHeader(input: string): boolean {
        return input && !input.startsWith(" ") && !input.trim().startsWith("#");
    }
}
