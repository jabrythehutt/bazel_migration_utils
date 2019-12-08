export interface ParsedLockfile {
    header: string;
    content: Record<string, string[]>;
}
