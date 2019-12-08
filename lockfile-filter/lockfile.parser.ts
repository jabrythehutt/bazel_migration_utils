import {ParsedLockfile} from "./parsed.lockfile";

export class LockfileParser {

    lineSep = "\n";

    stringify(lockfile: ParsedLockfile): string {
        const body = Object.keys(lockfile.content).reduce((previous, key) => {
            const lines = lockfile.content[key];
            const joinedLines = lines.join(this.lineSep);
            return previous + [
                key,
                joinedLines,
                // Also add a new line after each block
                ""
            ].join(this.lineSep);
        }, "");

        return [lockfile.header, body].join(this.lineSep);
    }

    isIgnoredLine(input: string): boolean {
        const trimmedLine = input.trim();
        return !!trimmedLine || trimmedLine.startsWith("#");
    }

    parse(fileString: string): ParsedLockfile {
        const lines = fileString.split(/\r?\n/);
        const headerLines = [];
        while (lines.length && this.isIgnoredLine(lines[0])) {
            headerLines.push(lines.shift());
        }
        const content: Record<string, string[]> = {};
        while (lines.length) {
            const firstLine = lines.shift();
            content[firstLine] = [];
            while (lines.length && !this.isIgnoredLine(lines[0]) && lines[0].startsWith(" ")) {
                content[firstLine].push(lines.shift());
            }
        }
        return {
            header: headerLines.join(this.lineSep),
            content
        };
    }
}
