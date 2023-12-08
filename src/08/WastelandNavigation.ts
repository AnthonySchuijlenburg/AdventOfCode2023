import {getFileContent} from "../helpers/ReadFromFile";
import * as math from 'mathjs';

interface MapValue {
    left: string;
    right: string;
}

interface Map {
    [key: string]: MapValue;
}

function calculateMoves(input: string): number {
    const {sequence, map} = formatInput(input);

    return doSequenceUntilEnd(sequence, map, 'AAA');
}

function calculateMovesAsGhost(input: string): number {
    const {sequence, map} = formatInput(input);
    const startingLocations = Object.keys(map).filter((key) => key[key.length - 1] === 'A');

    const minSteps: number[] = startingLocations.map((location) => {
        return doSequenceUntilEnd(sequence, map, location);
    });

    // @ts-ignore ts doesn't accept that spread on a numbers array will actually give numbers
    return math.lcm(...minSteps);
}

function formatInput(input: string): {sequence: string, map: any} {
    let splitInput = input.split('\n\n');
    const sequence: string = splitInput[0];
    splitInput = splitInput[1].split('\n').filter((line) => line !== '');

    let map: Map = {};

    splitInput.forEach((line) => {
        const splitLine = line.split(' = ');

        const leftRight = splitLine[1]
            .replace('(', '')
            .replace(')', '')
            .split(', ');

        map[splitLine[0]] = {left: leftRight[0], right: leftRight[1]}
    });

    return {sequence, map};
}

function doSequenceUntilEnd(sequence: string, map: any, startLocation: string): number {
    let counter = 0;
    let currentLocation = startLocation;

    while(currentLocation[currentLocation.length - 1] !== 'Z') {
        const currentLocationObject: MapValue = map[currentLocation];
        const currentInstruction = sequence[counter % sequence.length];

        if (currentInstruction === 'L') {
            currentLocation = currentLocationObject.left;
        } else {
            currentLocation = currentLocationObject.right;
        }

        counter++
    }

    return counter;
}

function main() {
    const exampleInput = getFileContent('08/example.txt');
    const exampleInput2 = getFileContent('08/example2.txt');
    const exampleInput3 = getFileContent('08/example3.txt');
    const input = getFileContent('08/input.txt');

    console.log('\nPart one');
    console.log('Example output: ', calculateMoves(exampleInput));
    console.log('Example output2: ', calculateMoves(exampleInput2));
    console.log('Actual output: ', calculateMoves(input));

    console.log('\nPart Two');
    console.log('Example output: ', calculateMovesAsGhost(exampleInput3));
    console.log('Actual output: ', calculateMovesAsGhost(input));
}

main();
