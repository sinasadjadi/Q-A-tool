import {configureStore} from '@reduxjs/toolkit';
import {combineReducers} from "redux"
import QASlice from 'store/slices/QA';

export const createTestStore = () => configureStore(({
	reducer: combineReducers({
		QA: QASlice,
	})
}))


import {render as testingLibraryRender} from "@testing-library/react";
import {Provider} from "react-redux";
import {configureCustomStore} from "store"

const customRender = (ui, {initialState, store = configureCustomStore(initialState), ...renderOptions} = {}) => {
	// All necessary providers for rendering components
	const AllTheProviders = ({children}) => (
			<Provider store={store}>
				{children}
			</Provider>
	);
	return {
		...testingLibraryRender(ui, {wrapper: AllTheProviders, ...renderOptions}),
		store
	};
};

// Re-export everything from testing-library
export * from "@testing-library/react";

// Override render from testing-library with custom render
export {customRender as render};
