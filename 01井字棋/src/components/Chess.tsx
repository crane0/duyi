import React from "react";
import { ChessType } from "../types";
import "./styles/Chess.css";

interface IProps {
    type: ChessType;
    onClick?: () => void;
}

export const Chess: React.FC<IProps> = ({ type, onClick }) => {
    let chess = null;
    if (type === ChessType.none) {
        chess = <div className="chess"></div>;
    } else if (type === ChessType.red) {
        chess = <div className="chess red"></div>;
    } else if (type === ChessType.black) {
        chess = <div className="chess black"></div>;
    }
    return (
        <div
            className="chess-box"
            onClick={() => {
                if (type === ChessType.none && onClick) {
                    onClick();
                }
            }}
        >
            {chess}
        </div>
    );
};
