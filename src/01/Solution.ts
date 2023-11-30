import {getFileContent} from "../helpers/ReadFromFile";

function main() {
    const exampleInput = getFileContent('01/example.txt');
    const input = getFileContent('01/input.txt');
    console.log(exampleInput.split('\n'));
    console.log(input.split('\n'));
}

main();
