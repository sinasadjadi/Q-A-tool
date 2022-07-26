import {render, screen, within, fireEvent, cleanup} from 'utils/test.utils.js';
import List from './index';
import {guidGenerator} from "utils/utils"

const mockQuestions = [
	{
		question: "how to add a question?",
		answer: "just use form bellow",
		id: guidGenerator()
	},
	{
		question: "whats app",
		answer: "All good here.",
		id: guidGenerator()
	},
	{
		question: "Are you feeling happiness?",
		answer: "I'm not sure",
		id: guidGenerator()
	}]

afterEach(cleanup)


describe("list component test", () => {
	test('test rendered list', () => {
		render(<List/>);
		expect(screen.getByTestId("lists_title")).toHaveTextContent("Created Questions")
		const questions = screen.getAllByTestId("question")
		expect(questions.length).toBe(1)
		const removeBtn = within(questions[0]).getByRole("button")
		expect(removeBtn).toHaveTextContent(/remove/i)
	});


	test('it remove an item', () => {
		render(<List/>)
		expect(screen.queryByTestId("no_question_alert")).not.toBeInTheDocument()
		const questions = screen.getAllByTestId("question")
		const removeBtn = within(questions[0]).getByRole("button")
		fireEvent.click(removeBtn)
		expect(screen.queryAllByTestId("question").length).toBe(0)
		expect(screen.queryByTestId("no_question_alert")).toBeInTheDocument()
	});

	test('it remove all items', () => {

		render(<List/>, {
			initialState: {QA: mockQuestions}
		})

		expect(screen.queryByTestId("no_question_alert")).not.toBeInTheDocument()
		expect(screen.queryAllByTestId("question").length).toBe(mockQuestions.length)

		const removeAllBtn = screen.queryByTestId("remove_all")
		fireEvent.click(removeAllBtn)
		expect(removeAllBtn).toHaveTextContent("remove questions")

		expect(screen.queryByTestId("no_question_alert")).toBeInTheDocument()
		expect(screen.queryAllByTestId("question").length).toBe(0)
	});

	test('it sorts items alphabetically', async () => {

		const {store} = render(<List/>, {
			initialState: {QA: mockQuestions}
		})

		const sortBtn = screen.queryByTestId("sort")
		expect(sortBtn).toHaveTextContent("sort questions")

		const sortFn = items => [...items].sort((a, b) => a.question.localeCompare(b.question))

		fireEvent.click(sortBtn)
		const questions = store.getState().QA
		expect(questions).toStrictEqual(sortFn(mockQuestions))
	});
})

