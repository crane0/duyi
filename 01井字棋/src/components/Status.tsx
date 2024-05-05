import React from "react";
import { GameStatus, ChessType } from "../types";
import "./styles/Status.css";

interface IProps {
    status: GameStatus;
    next: ChessType;
}

export const Status: React.FC<IProps> = ({ status, next }) => {
    let content: JSX.Element;
    if (status === GameStatus.gaming) {
        if (next === ChessType.black) {
            content = <div className={ChessType[next]}>黑方落子</div>;
        } else {
            content = <div className={ChessType[next]}>红方落子</div>;
        }
    } else {
        content = <div className={GameStatus[status]}>{GameStatus[status]}</div>;
    }
    return <div className="status-box">{content}</div>;
};
