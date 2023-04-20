export function randomHex() {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

export default function (length: number): string[] {
    return Array.from<string>({ length }).map(() => randomHex());
}
