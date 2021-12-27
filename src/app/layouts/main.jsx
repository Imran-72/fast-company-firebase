import React from "react";
import { useMockData } from "../utils/mockData";

const Main = () => {
    const { initialize, status, progress, error } = useMockData();
    const handleClick = () => {
        initialize();
    };

    return (
        <div className="container m-5">
            <h1> Main Page</h1>
            <h3>Инициализация данных в FireBase</h3>
            <ul>
                <li>Status: {status}</li>
                <li>Progress: {progress}%</li>
                {error && <li>Error: {error}</li>}
            </ul>
            <button className="btn btn-primary" onClick={handleClick}>
                Инициализировать
            </button>
        </div>
    );
};

export default Main;
