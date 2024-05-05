import React from "react";
import { Chess } from "./Chess";
import { ChessType } from "../types";
import "./styles/Board.css";

interface IProps {
    chessArray: ChessType[];
    onClick?: (index: number) => void;
}

export const Board: React.FC<IProps> = ({ chessArray, onClick }) => {
    const list = chessArray.map((type, index) => {
        return (
            <Chess
                type={type}
                key={index}
                onClick={() => {
                    if (onClick) {
                        onClick(index);
                    }
                }}
            ></Chess>
        );
    });
    return <div className="board-box">{list}</div>;
};
