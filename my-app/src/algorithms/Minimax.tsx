import checkWinner from './CheckWinner';

export default function MinimaxDriver(tiles: string[][], isMax: boolean) {
    // Returns best move
    let bestMove = [0, 0];
    let bestScore: number;
    let score: number;
    if (isMax) { // if maximizing player
        bestScore = -Infinity;
        for (let i=0; i<3; i++) {
            for (let j=0; j<3; j++) {
                if (tiles[i][j] === '') {
                    tiles[i][j] = 'x';
                    score = Minimax(tiles, 0, !isMax);
                    if (bestScore < score) {
                        bestScore = score;
                        bestMove = [i, j]
                    }
                    tiles[i][j] = '';
                }
            }
        }
    } else { // if minimizing player
        bestScore = Infinity;
        for (let i=0; i<3; i++) {
            for (let j=0; j<3; j++) {
                if (tiles[i][j] === '') {
                    tiles[i][j] = 'o';
                    score = Minimax(tiles, 0, !isMax);
                    if (bestScore > score) {
                        bestScore = score;
                        bestMove = [i, j]
                    }
                    tiles[i][j] = '';
                }
            }
        }
    }
    return bestMove;
}

interface IPlayerScores {
    [key: string]: number
}

const PlayerScores: IPlayerScores = { // Heuristic Values
    'x': 10,
    'o': -10,
    'tie': 0
}

function Minimax(tiles: string[][], depth: number, isMax: boolean): number {
    const result = checkWinner(tiles);
    if (result !== '') {
        return PlayerScores[result];
    }

    let bestScore: number;
    let score: number;
    if (isMax) { // if maximizing player
        bestScore = -Infinity;
        for (let i=0; i<3; i++) {
            for (let j=0; j<3; j++) {
                if (tiles[i][j] === '') {
                    tiles[i][j] = 'x';
                    score = Minimax(tiles, depth+1, !isMax) - depth;
                    if (bestScore < score) {
                        bestScore = score;
                    }
                    tiles[i][j] = '';
                }
            }
        }
    } else { // if minimizing player
        bestScore = Infinity;
        for (let i=0; i<3; i++) {
            for (let j=0; j<3; j++) {
                if (tiles[i][j] === '') {
                    tiles[i][j] = 'o';
                    score = Minimax(tiles, depth+1, !isMax) + depth;
                    if (bestScore > score) {
                        bestScore = score;
                    }
                    tiles[i][j] = '';
                }
            }
        }
    }

    return bestScore;
}