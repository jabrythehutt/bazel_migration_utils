import {value} from "jsonpath";

export class JsonValueExtractor {
    getValue<T>(input: any[] | Record<string, any>, jsonPath: string, selectKeys: Array<string | number> = []): T {
        const output = value(input, jsonPath) as T;
        if (typeof output === "object") {
            const initialValue = Array.isArray(input) ? [] : {} as T;
            return Object.keys(output).filter(key => selectKeys.includes(key) || !selectKeys.length)
                .reduce((previous, key) => ({
                    ...previous,
                    [key]: output[key]
                }), initialValue) as T;
        }

        return output;

    }
}
