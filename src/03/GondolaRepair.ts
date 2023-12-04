import {getFileContent} from "../helpers/ReadFromFile";

let rows: string[][] = [];
const operations: number[][] = [
    [-1, -1], [-1, 0], [-1, 1],
    [0, -1], [0, 1],
    [1, -1], [1, 0], [1, 1],
];

interface NumberPosition {
    y: number;
    xStart: number;
    xEnd: number;
    value: number;
    symbolX: number | null | undefined;
    symbolY: number | null | undefined;
}

let numbers: NumberPosition[] = [];

function getSumOfEngineParts(input: string[]): number {
    getRequiredLocations(input, pointIsSymbol, null);

    return numbers.reduce((a, b) => a + b.value, 0);
}

function getSumOfGears(input: string[]): number {
    getRequiredLocations(input, pointIsAGear, 2);

    return multiplyAndSum(numbers);
}

function multiplyAndSum(numbers: Array<NumberPosition>): number {
    const multipliedPairs: { [key: string]: number } = {};

    for (const numberPosition of numbers) {
        const key = numberPosition.symbolX + '_' + numberPosition.symbolY;
        multipliedPairs[key] = numberPosition.value * (multipliedPairs[key] || 1);
    }

    return Object.values(multipliedPairs).reduce((partialSum, value) => partialSum + value, 0);
}

function getRequiredLocations(input: string[], search: (x: number, y: number) => boolean, requiredHits: number | null): void {
    rows = [];
    numbers = [];

    for (let row of input) {
        rows.push(row.split(''));
    }

    for (let y = 0; y < rows.length; y++) {
        for (let x = 0; x < rows[y].length; x++) {
            const isSymbol: boolean = search(y, x)

            if (!isSymbol) {
                continue;
            }

            const numberCoordinates: number[][] = [];

            for (let operation of operations) {
                const yPosition = y + operation[0];
                const xPosition = x + operation[1];

                if (!isNaN(Number(rows[yPosition][xPosition]))) {
                    numberCoordinates.push([yPosition, xPosition]);
                }
            }

            let numberPositions: NumberPosition[] = [];

            for (const numberPosition of numberCoordinates) {
                const number = addNumberToKnownNumberPositions(numberPosition[0], numberPosition[1]);
                number.symbolX = x;
                number.symbolY = y;

                numberPositions.push(number);
            }

            numberPositions = numberPositions.filter((value, index, self) =>
                    index === self.findIndex((t) => (
                        t.y === value.y && t.xStart === value.xStart && t.xEnd === value.xEnd && t.value === value.value
                    ))
            )

            if (requiredHits !== null && numberPositions.length !== requiredHits) {
                continue;
            }

            numbers.push(...numberPositions);
        }
    }

    numbers = numbers.filter((value, index, self) =>
            index === self.findIndex((t) => (
                t.y === value.y && t.xStart === value.xStart && t.xEnd === value.xEnd && t.value === value.value
            ))
    )
}

function addNumberToKnownNumberPositions(y: number, x: number): NumberPosition {
    let xPointer = x;

    const number: NumberPosition = {
        y: y,
        xStart: 0,
        xEnd: 0,
        value: 0,
        symbolX: null,
        symbolY: null,
    }

    while(!isNaN(Number(rows[y][xPointer]))) {
        xPointer--;
    }

    number.xStart = xPointer + 1;
    xPointer = x;

    while(!isNaN(Number(rows[y][xPointer]))) {
        xPointer++;
    }

    number.xEnd = xPointer - 1;
    let numberString = '';

    for (let i = 0; i <= number.xEnd - number.xStart; i++) {
        numberString += rows[y][number.xStart + i];
    }

    number.value = Number(numberString);
    return number;
}

function pointIsSymbol(y: number, x: number): boolean {
    return rows[y][x] !== '.' && isNaN(Number(rows[y][x]));
}

function pointIsAGear(y: number, x: number): boolean {
    return rows[y][x] === '*';
}

function main() {
    const exampleInput = getFileContent('03/example.txt');
    const input = getFileContent('03/input.txt');

    console.log('\nPart one');
    console.log('Example output: ', getSumOfEngineParts(exampleInput.split('\n')));
    console.log('Actual output: ', getSumOfEngineParts(input.split('\n')));

    console.log('\nPart Two');
    console.log('Example output: ', getSumOfGears(exampleInput.split('\n')));
    console.log('Actual output: ', getSumOfGears(input.split('\n')));
}

main();
