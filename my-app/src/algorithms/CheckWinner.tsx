export default function checkWinner(board: string[][]): string {
    // Check if there is a winner
    const tiles = board.flat();
    const winStates = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];
    for (let i=0; i<winStates.length; i++) {
        let a = winStates[i][0], b= winStates[i][1], c = winStates[i][2];
        if (tiles[a] === tiles[b] && tiles[a] === tiles[c] && tiles[a] !== '') {
            return tiles[a] // return winner
        }
    }

    for (let i=0; i<tiles.length; i++) { // check if any empty spots
        if (tiles[i] === ''){
            return '' // game is still continuing
        }
    }

    return 'tie' // otherwise return tie
}