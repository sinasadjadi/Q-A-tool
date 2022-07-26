import {configureStore} from '@reduxjs/toolkit';
import reducer from './rootReducer';

const index = configureStore({
	reducer,
});

export default index;


export const configureCustomStore = (initialState) => configureStore({
	reducer,
	preloadedState: initialState
})
