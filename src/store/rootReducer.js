import {combineReducers} from "redux"
import QASlice from './slices/QA';

const rootReducer = combineReducers({
    QA: QASlice
})

export default rootReducer;
