import {getFileContent} from "../helpers/ReadFromFile";

function calculateSumOfNextValues(input: string): number {
    const values: number[][] = formatData(input);

    return predictNextValues(values).reduce((acc, value) => acc + value, 0);
}

function calculateSumOfPreviousValues(input: string): number {
    const values: number[][] = formatData(input).map(value => value.reverse());

    return predictNextValues(values).reduce((acc, value) => acc + value, 0);
}

function formatData(input: string): number[][] {
    return input
        .split('\n')
        .filter(value => value !== '')
        .map(value =>
            value.split(' ').map(value => parseInt(value, 10))
        );
}

function predictNextValues(values: number[][]): number[] {
    return values.map(value => {
        return predictNextValue(value);
    });
}

function predictNextValue(values: number[]): number {
    let nextNumbers: number[] = [];

    for (let i = 1; i < values.length; i++) {
        nextNumbers.push(values[i] - values[i - 1]);
    }

    if(nextNumbers.every((value) => value === 0)) {
        return values[values.length - 1] + nextNumbers[nextNumbers.length - 1];
    }

    return predictNextValue(nextNumbers) + values[values.length - 1];
}

function main() {
    const exampleInput = getFileContent('09/example.txt');
    const input = getFileContent('09/input.txt');

    console.log('\nPart one');
    console.log('Example output: ', calculateSumOfNextValues(exampleInput));
    console.log('Actual output: ', calculateSumOfNextValues(input));

    console.log('\nPart Two');
    console.log('Example output: ', calculateSumOfPreviousValues(exampleInput));
    console.log('Actual output: ', calculateSumOfPreviousValues(input));
}

main();
