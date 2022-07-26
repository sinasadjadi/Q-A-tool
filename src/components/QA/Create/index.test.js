import {render, screen, within, waitFor, fireEvent, cleanup} from 'utils/test.utils.js';
import Create from './index';
import {guidGenerator} from "utils/utils"
import {act} from "@testing-library/react";

jest.setTimeout(10000);

afterEach(cleanup)


describe("list component test", () => {
	test('test rendered successfully', () => {
		render(<Create/>);
		expect(screen.getByTestId("create_question_title")).toHaveTextContent("Create a new question")

		const question_input = screen.queryByTestId("question_input")
		const answer_input = screen.queryByTestId("answer_input")

		expect(question_input).toBeInTheDocument()
		expect(answer_input).toBeInTheDocument()

	});

	test('create without delay', () => {
		const {store} = render(<Create/>);

		const question_input = screen.queryByTestId("question_input")
		const answer_input = screen.queryByTestId("answer_input")

		fireEvent.change(question_input, {target: {value: "this is question"}})
		expect(question_input.value).toBe("this is question")

		fireEvent.change(answer_input, {target: {value: "this is answer"}})
		expect(answer_input.value).toBe("this is answer")

		const create_btn = screen.queryByTestId("create_btn")
		expect(create_btn).toHaveTextContent("create question")


		const beforeCount = store.getState()?.QA?.length || 0

		act(() => {
			fireEvent.click(create_btn)
		})
		const afterCount = store.getState()?.QA?.length || 0

		expect(afterCount).toBe(beforeCount + 1)
	});


	test('create with delay', async () => {
		const {store} = render(<Create/>);

		const question_input = screen.queryByTestId("question_input")
		const answer_input = screen.queryByTestId("answer_input")

		fireEvent.change(question_input, {target: {value: "this is question"}})
		expect(question_input.value).toBe("this is question")

		fireEvent.change(answer_input, {target: {value: "this is answer"}})
		expect(answer_input.value).toBe("this is answer")



		const delay_input = screen.queryByTestId("delay_input")
		fireEvent.click(delay_input)

		const beforeCount = store.getState()?.QA?.length || 0

		const create_btn = screen.queryByTestId("create_btn")
		act(() => {
			fireEvent.click(create_btn)
		})

		const afterCount = store.getState()?.QA?.length || 0

		expect(afterCount).toBe(beforeCount)

		await new Promise((r) => setTimeout(r, 5000));

		const afterDelayCount = store.getState()?.QA?.length
		expect(afterDelayCount).toBe(beforeCount + 1)

	})

})

