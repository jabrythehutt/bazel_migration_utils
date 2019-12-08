import {FilterRequest} from "./filter.request";
import {LockfileParser} from "./lockfile.parser";

export class LockfileFilter {

    constructor(private parser: LockfileParser) {
    }

    filter(request: FilterRequest): string {
        const lockfile = this.parser.parse(request.input);
        const filteredLockfile = {
            header: lockfile.header,
            content: this.filterContent(lockfile.content, request.exclude)
        };

        return this.parser.stringify(filteredLockfile);
    }

    filterContent(content: Record<string, string[]>, exclude: string): Record<string, string[]> {
        return Object.keys(content).filter(
            key => !key.includes(exclude) &&
                !content[key].find(
                    line => line.includes(exclude)))
            .reduce((previous, key) => ({
                ...previous,
                [key]: content[key]
            }), {});
    }

}
