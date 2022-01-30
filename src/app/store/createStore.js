import { configureStore, combineReducers } from "@reduxjs/toolkit";
import qualitiesReducer from "./qualities";

const rootReducer = combineReducers({
    qualities: qualitiesReducer
});

function createStore() {
    return configureStore({
        reducer: rootReducer
    });
}

export default createStore;
