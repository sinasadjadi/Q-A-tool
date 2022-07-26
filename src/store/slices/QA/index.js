import {createSlice} from "@reduxjs/toolkit";
import {guidGenerator} from "utils/utils"

const initialState = [{
	question: "how to add a question?",
	answer: "just use form bellow",
	id: guidGenerator()
}]

const Index = createSlice({
	name: 'qa',
	initialState,
	reducers: {
		add(state, action) {
			state.push({...action.payload, id: guidGenerator()})
		},
		remove(state, action) {
			const {id} = action.payload
			state.splice(state.findIndex(item => item.id === id), 1)
		},
		removeAll(state) {
			state.length = 0
		},
		sort(state) {
			state = state.sort((a, b) => a.question.localeCompare(b.question))
		}
	}
});

export default Index.reducer;

export const {add, remove, removeAll, sort} = Index.actions;

export const createNewQuestion = payload => async dispatch => {
	try {
		const {form, delay} = payload

		const promise = new Promise(resolve => {
			setTimeout(resolve, 5000)
		})
		if (delay)
			await promise

		dispatch(add(form))

	} catch (e) {
		console.error(e)
	}
}
