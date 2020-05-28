import React from 'react';

interface IProps {
    tiles: string[][];
    checkWinner(tiles: string[][]): string;
}

const PlayerScores = { // Heuristic Values
    'x': 10,
    'o': -10,
    'tie': 0
}

function AlphaBeta(tiles: string[][], depth: number, isMax: boolean): number {

    let bestScore: number;
    let score: number;
    if (isMax) { // if maximizing player
        bestScore = -Infinity;
        for (let i=0; i<3; i++) {
            for (let j=0; j<3; j++) {
                if (tiles[i][j] == '') {
                    tiles[i][j] = 'x';
                    score = AlphaBeta(tiles, depth+1, !isMax) - depth;
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
                if (tiles[i][j] == '') {
                    tiles[i][j] = 'o';
                    score = AlphaBeta(tiles, depth+1, !isMax) + depth;
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