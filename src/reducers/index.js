import { combineReducers } from 'redux';
import ChapterReducer from './ChapterReducer.js';
import { sessionReducer } from "redux-react-session";

const reducers = {
    chapter: ChapterReducer,
    session: sessionReducer
}

const AppReducer = combineReducers(reducers);

export default AppReducer;