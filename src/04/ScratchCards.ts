import {getFileContent} from "../helpers/ReadFromFile";

function calculateTotalNumberPoints(input: string[]): number {
    let sum = 0;

    for (let row of input) {
        if (row === '') {
            continue;
        }

        sum += calculateValueOfCard(row);
    }

    return sum;
}

function calculateValueOfCard(card: string): number {
    let splitCard = card.split(':');
    const cardValue = splitCard[1].split(' | ');

    const winningNumbers = cardValue[0].split(' ').filter(Number);
    const cardNumbers = cardValue[1].split(' ').filter(Number);
    let points = 0;

    for (const cardNumber of cardNumbers) {
        if (winningNumbers.includes(cardNumber)) {
            if (points === 0) {
                points = 1;
            } else {
                points *= 2;
            }
        }
    }

    return points;
}

function calculateTotalNumberTotalPlayingCards(input: string[]): number {
    let sum = 0;

    let playingCards = new Array(input.length - 1).fill(1);

    for (let i = 0; i < input.length; i++) {
        const row = input[i];
        if (row === '') {
            continue;
        }

        const winnings = calculateWinningsFromCard(row);

        if (winnings > 0) {
            const numberOfCards = playingCards[i];
            for(let j = 1; j < winnings + 1; j++) {
                playingCards[i + j] += numberOfCards;
            }
        }
    }

    return playingCards.reduce((partialSum, a) => partialSum + Number(a), 0);
}

function calculateWinningsFromCard(card: string): number {
    let splitCard = card.split(':');
    const cardValue = splitCard[1].split(' | ');

    const winningNumbers = cardValue[0].split(' ').filter(Number);
    const cardNumbers = cardValue[1].split(' ').filter(Number);
    let points = 0;

    for (const cardNumber of cardNumbers) {
        if (winningNumbers.includes(cardNumber)) {
            points ++;
        }
    }

    return points;
}

function main() {
    const exampleInput = getFileContent('04/example.txt');
    const input = getFileContent('04/input.txt');

    console.log('\nPart one');
    console.log('Example output: ', calculateTotalNumberPoints(exampleInput.split('\n')));
    console.log('Actual output: ', calculateTotalNumberPoints(input.split('\n')));

    console.log('\nPart Two');
    console.log('Example output: ', calculateTotalNumberTotalPlayingCards(exampleInput.split('\n')));
    console.log('Actual output: ', calculateTotalNumberTotalPlayingCards(input.split('\n')));
}

main();
