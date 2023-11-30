import * as fs from 'fs';
import * as path from 'path';

const baseDir = path.resolve(__dirname, '..', '..');

export function getFileContent(relativeFilePath: string): string {
    console.log(`Reading from file: ${relativeFilePath}`);
    const absoluteFilePath = path.resolve(baseDir, 'src', relativeFilePath);
    try {
        return fs.readFileSync(absoluteFilePath, 'utf8');
    } catch (err) {
        console.error(`Error reading file from disk: ${err}`);
        return '';
    }
}
