import {getFileContent} from "../helpers/ReadFromFile";

const redCubes = 12;
const greenCubes = 13;
const blueCubes = 14;

interface RowResult {
    rowResult: boolean,
    rowNumber: number,
}

function calculateSumOfImpossibleRows(input: string): number {
    let rows = input.split('\n');
    let sum = 0;

    for (const row of rows) {
        if(row === '') {
            continue;
        }

        const rowResult: RowResult = isRowPossible(row);

        if (rowResult.rowResult) {
            sum += rowResult.rowNumber
        }
    }

    return sum;
}

function isRowPossible(row: string): RowResult {
    let formattedRow = row.split(': ');
    let gameNumber = formattedRow[0].replace('Game ', '');
    let gameContent = formattedRow[1].split('; ');

    for(let game of gameContent) {
        if (!isGamePossible(game)) {
            return {rowResult: false, rowNumber: Number(gameNumber)}
        }
    }

    return {rowResult: true, rowNumber: Number(gameNumber)};
}

function isGamePossible(game: string): boolean {
    const moves = game.split(', ');

    for (let move of moves) {
        if (move.includes('blue')) {
            move = move.replace(' blue', '')
            if (Number(move) > blueCubes) {
                return false;
            }
        }

        if (move.includes('green')) {
            move = move.replace(' green', '')
            if (Number(move) > greenCubes) {
                return false;
            }
        }

        if (move.includes('red')) {
            move = move.replace(' red', '')
            if (Number(move) > redCubes) {
                return false;
            }
        }
    }

    return true
}

function calculatePowerOfRows(input: string): number {
    let rows = input.split('\n');
    let power = 0;

    for (const row of rows) {
        if(row === '') {
            continue;
        }

        power += calculatePowerOfASingleRow(row)
    }

    return power;
}

function calculatePowerOfASingleRow(row: string): number {
    const splitRow = row.split(': ')
    const games = splitRow[1].split('; ')

    let minValueOfRedCubes = 0;
    let minValueOfGreenCubes = 0;
    let minValueOfBlueCubes = 0;

    for (const game of games) {
        let rounds = game.split(', ');
        for (let round of rounds) {
            if (round.includes('blue')) {
                round = round.replace(' blue', '');
                const numberOfCubes = Number(round)
                minValueOfBlueCubes = numberOfCubes > minValueOfBlueCubes ? numberOfCubes : minValueOfBlueCubes;
            }

            if (round.includes('red')) {
                round = round.replace(' red', '');
                const numberOfCubes = Number(round)
                minValueOfRedCubes = numberOfCubes > minValueOfRedCubes ? numberOfCubes : minValueOfRedCubes;
            }

            if (round.includes('green')) {
                round = round.replace(' green', '');
                const numberOfCubes = Number(round)
                minValueOfGreenCubes = numberOfCubes > minValueOfGreenCubes ? numberOfCubes : minValueOfGreenCubes;
            }
        }
    }

    return minValueOfBlueCubes * minValueOfRedCubes * minValueOfGreenCubes
}

function main() {
    const exampleInput = getFileContent('02/example.txt');
    const input = getFileContent('02/input.txt');

    console.log('\nPart one');
    console.log('Example output: ', calculateSumOfImpossibleRows(exampleInput));
    console.log('Actual output: ', calculateSumOfImpossibleRows(input));

    console.log('\nPart Two');
    console.log('Example output: ', calculatePowerOfRows(exampleInput));
    console.log('Actual output: ', calculatePowerOfRows(input));
}

main();
