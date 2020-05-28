import React, { Component } from 'react';
import Board from './Board';
import checkWinner from '../algorithms/CheckWinner';
import MinimaxDriver from '../algorithms/Minimax';

interface IProps {
}

interface IState {
    tiles: string[][];
    scores: string[][]
    player: boolean;
    winner: string;
    ai: boolean;
    playerStart: boolean;
    // history
}

export default class Game extends Component<IProps, IState> {
    constructor(props: any) {
        super(props)
        this.state = { 
            tiles: [ // game board
                ['', '', ''],
                ['', '', ''],
                ['', '', '']
            ],
            scores: [ // heuristic board
                ['', '', ''],
                ['', '', ''],
                ['', '', '']
            ],
            player: true, // true is X, false is O
            winner: '', // '' if game still continuing
            ai: true,
            playerStart: false // if human is starting 'x', otherwise is second player
        }
    }

    computerClickSquare(): void {
        // return best position by ai
        const boardPositions = [ // select based on flat array
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8]
        ]
        // deconstructor
        const {tiles, player} = this.state
        // Using minimax ai
        const bestMove = MinimaxDriver(tiles, player)
        const row = bestMove[0], col = bestMove[1];
        const idx = boardPositions[row][col]
        console.log(idx);
        // simulate player click
        document.getElementById(idx.toFixed())?.click()
    }

    clickSquare = (i: number, j: number) => (): void => {
        let tiles: string[][] = this.state.tiles.slice();

        const winner = checkWinner(this.state.tiles);
        if (winner !== '') { // game ends when either tie or someone wins
            return;
        }

        if ( tiles[i][j] !== '') { // Non-empty tile
            return;
        }

        const player = this.state.player; // Assign player to square
        if (player === true) {
            tiles[i][j] = 'x';
        } else {
            tiles[i][j] = 'o';
        }

        this.setState({
            tiles: tiles,
            player: !player,
            winner: winner
        }, () => {
                if (checkWinner(this.state.tiles) !== '') { // use callback to check if player won
                    console.log(checkWinner(this.state.tiles)); // Update display
                }

                // allow ai to make move depending on player is 'x' or 'o'
                const { ai, player, playerStart } = this.state;
                if (ai && (player !== playerStart)) {
                    this.computerClickSquare()
                }
            }
        )
    }

    componentDidMount() {
        const { ai, player, playerStart } = this.state;
        // allow ai to make first move
        if (ai === true && player === true && playerStart === false) {
            this.computerClickSquare()
        }
    }

    render() {
        return (
            <div>  
                <div>
                    <Board tiles={this.state.tiles} onClick={this.clickSquare}/>
                </div>
            </div>
        )
    }
}