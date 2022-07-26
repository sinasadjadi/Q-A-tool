import "./index.scss"

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/cjs/Button";
import {useState} from "react";
import {createNewQuestion} from "store/slices/QA";
import {useDispatch} from "react-redux";


const Index = () => {
	const dispatch = useDispatch();
	const [delay, setDelay] = useState(false)
	const [loading, setLoading] = useState(false)


	// const onFormChange = event => setForm(prevState => ({...prevState, [event.target.name]: event.target.value}))

	const [question, setQuestion] = useState("")
	const [answer, setAnswer] = useState("")

	const create = async () => {
		if (loading) {
			return false
		}
		setLoading(true)
		if (!question || !answer)
			return
		try {
			const form = {question, answer}
			await dispatch(createNewQuestion({form, delay}))
			setDelay(false)
			setQuestion("")
			setAnswer("")
		} catch (e) {
			console.log(e)
		} finally {
			setLoading(false)
		}
	}

	return (

			<div className={"section create"}>
				<h2 className={"title"} data-testid={"create_question_title"}><b>Create a new question</b></h2>
				<Form>
					<Form.Group className="question text-left mb-3">
						<Form.Label>Question</Form.Label>
						<Form.Control
								data-testid={"question_input"}
								type="text"
								placeholder="type your question"
								value={question}
								name={"question"}
								onChange={(event => setQuestion(event.target.value))}/>
					</Form.Group>
					<Form.Group className="question text-left mb-3">
						<Form.Label>Answer</Form.Label>
						<Form.Control
								data-testid={"answer_input"}
								as="textarea"
								value={answer}
								name={"answer"}
								rows={3}
								placeholder="type the answer"
								onChange={(event => setAnswer(event.target.value))}/>
					</Form.Group>
				</Form>
				<div>
					<Form.Group className="mb-3 d-flex align-items-center submit">
						<Button data-testid={"create_btn"}
						        size={"md"}
						        disabled={loading}
						        className={"px-4"}
						        variant={"success"}
						        onClick={create}>create question</Button>
						<Form.Check
								data-testid={"delay_input"}
								className={"delay"}
								checked={!!delay}
								onChange={event => setDelay(event.target.checked)}
								type="checkbox"
								label={"check for 5s delay"}
						/>
					</Form.Group>
				</div>
			</div>
	)
}

export default Index
