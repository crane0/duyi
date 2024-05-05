import React from "react";
import { Status } from "./Status";
import { Board } from "./Board";
import { ChessType, GameStatus } from "../types";

interface IState {
    chessArray: ChessType[];
    nextChess: ChessType.red | ChessType.black;
    gameStatus: GameStatus;
}

export class Game extends React.Component<{}, IState> {
    state: IState = {
        chessArray: [],
        nextChess: ChessType.black,
        gameStatus: GameStatus.gaming,
    };

    componentDidMount(): void {
        this.init();
    }

    init() {
        const tempArr = [];
        for (let index = 0; index < 9; index++) {
            tempArr.push(ChessType.none);
        }
        this.setState({
            chessArray: tempArr,
            nextChess: ChessType.black,
            gameStatus: GameStatus.gaming,
        });
    }

    handleChessClick(index: number) {
        if (this.state.gameStatus !== GameStatus.gaming) {
            return;
        }
        const chessArray: ChessType[] = [...this.state.chessArray];
        chessArray[index] = this.state.nextChess;
        this.setState((prevState) => ({
            chessArray,
            nextChess: prevState.nextChess === ChessType.black ? ChessType.red : ChessType.black,
            gameStatus: this.getStatus(chessArray, index),
        }));
    }

    getStatus(chessArray: ChessType[], index: number): GameStatus {
        let res = GameStatus.gaming;
        // 1，判断是否有胜者
        // 横向最小 index
        const horizontalMin = Math.floor(index / 3) * 3;
        // 纵向最小 index
        const verticalMin = index % 3;

        const horizontalEqual = chessArray[horizontalMin] === chessArray[horizontalMin + 1] && chessArray[horizontalMin] === chessArray[horizontalMin + 2];
        const verticalEqual = chessArray[verticalMin] === chessArray[verticalMin + 3] && chessArray[verticalMin] === chessArray[verticalMin + 6];
        const diagonalEqual = chessArray[0] === chessArray[4] && chessArray[0] === chessArray[8] && chessArray[0] !== ChessType.none;
        const diagonalEqual2 = chessArray[2] === chessArray[4] && chessArray[2] === chessArray[6] && chessArray[2] !== ChessType.none;

        if (horizontalEqual || verticalEqual || diagonalEqual || diagonalEqual2) {
            if (chessArray[index] === ChessType.red) {
                res = GameStatus.redWin;
            } else {
                res = GameStatus.blackWin;
            }
        }

        // 2，判断平局
        if (res === GameStatus.gaming && !chessArray.includes(ChessType.none)) {
            res = GameStatus.equal;
        }

        // 3，判断是否游戏中
        return res;
    }

    render() {
        return (
            <div style={{ textAlign: "center" }}>
                <h1>井字棋游戏</h1>
                <Status status={this.state.gameStatus} next={this.state.nextChess}></Status>
                <Board chessArray={this.state.chessArray} onClick={this.handleChessClick.bind(this)}></Board>
                <button
                    onClick={() => {
                        this.init();
                    }}
                >
                    重新开始
                </button>
            </div>
        );
    }
}
