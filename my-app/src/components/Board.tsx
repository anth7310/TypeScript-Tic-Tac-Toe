import React, { Component } from 'react';
import Square from './Square';
import '../App.css';

interface IProps {
    tiles: string[][];
    onClick(i: number, j: number): () => void;
}

interface IState {
    tiles: string[][];
}

export default class Board extends Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        this.state = {
            tiles: this.props.tiles
        }
    }

    renderBoard() {
        let tiles = this.state.tiles;
        return (
            <table>
                <tbody>
                    <tr>
                        <Square id={0} value={tiles[0][0]} onClick={this.props.onClick(0, 0)} />
                        <Square id={1} value={tiles[0][1]} onClick={this.props.onClick(0, 1)} />
                        <Square id={2} value={tiles[0][2]} onClick={this.props.onClick(0, 2)} />
                    </tr>
                    <tr>
                        <Square id={3} value={tiles[1][0]} onClick={this.props.onClick(1, 0)} />
                        <Square id={4} value={tiles[1][1]} onClick={this.props.onClick(1, 1)} />
                        <Square id={5} value={tiles[1][2]} onClick={this.props.onClick(1, 2)} />
                    </tr>
                    <tr>
                        <Square id={6} value={tiles[2][0]} onClick={this.props.onClick(2, 0)} />
                        <Square id={7} value={tiles[2][1]} onClick={this.props.onClick(2, 1)} />
                        <Square id={8} value={tiles[2][2]} onClick={this.props.onClick(2, 2)} />
                    </tr>
                </tbody>
            </table>
        )
    }

    render() {
        return this.renderBoard()
    }
}