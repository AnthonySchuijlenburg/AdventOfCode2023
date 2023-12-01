import {getFileContent} from "../helpers/ReadFromFile";

function getSumOfNumbers(input: string): number {
    const data = filterOutAlphabeticalCharacters(input).split('\n');
    let sum = 0;

    for (const row of data) {
        sum += combineFirstAndLast(row);
    }

    return sum;
}

function filterOutAlphabeticalCharacters(input: string): string {
    return input.replace(/[^0-9\n]/g, '');
}

function combineFirstAndLast(input: string): number {
    if (input.length === 0) {
        return 0;
    }

    const first = input[0];
    const last = input[input.length - 1];

    return Number(first + last);
}

function replaceWordsWithNumbers(input: string): string {
    return input
        .replace(/one/g, 'o1e')
        .replace(/two/g, 't2o')
        .replace(/three/g, 't3e')
        .replace(/four/g, 'f4r')
        .replace(/five/g, 'f5e')
        .replace(/six/g, 's6x')
        .replace(/seven/g, 's7n')
        .replace(/eight/g, 'e8t')
        .replace(/nine/g, 'n9e');
}

function main() {
    const exampleInput = getFileContent('01/example.txt');
    const extraExampleInput = getFileContent('01/example2.txt');
    const input = getFileContent('01/input.txt');

    console.log('\nPart one');
    console.log('Example output: ', getSumOfNumbers(exampleInput));
    console.log('Actual output: ', getSumOfNumbers(input));

    console.log('\nPart two');
    console.log('Example output: ', getSumOfNumbers(replaceWordsWithNumbers(extraExampleInput)));
    console.log('Actual output: ', getSumOfNumbers(replaceWordsWithNumbers(input)));
}

main();
