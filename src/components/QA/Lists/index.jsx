import "./index.scss"
import Button from "react-bootstrap/cjs/Button";
import Modal from 'react-bootstrap/Modal';

import Alert from "react-bootstrap/cjs/Alert";
import {useSelector, useDispatch} from "react-redux";
import {useEffect, useState} from "react";
import Collapse from "components/common/Collapse";
import {removeAll, sort, remove, edit} from "store/slices/QA"
import Form from "react-bootstrap/Form";


const EditModal = ({data, ...props}) => {
	const [question, setQuestion] = useState("")
	const [answer, setAnswer] = useState("")
	const dispatch = useDispatch()

	useEffect(() => {
		setQuestion(data.question)
		setAnswer(data.answer)
	}, [data.id])

	const save = () => {
		if (!answer || !question)
			return

		const {id} = data
		dispatch(edit({id, answer, question}))

		setAnswer("")
		setQuestion("")

		props.onDismiss()
	}

	return (
			<Modal
					{...props}
					size="lg"
					aria-labelledby="contained-modal-title-vcenter"
					centered
			>
				<Modal.Header>
					<Modal.Title id="contained-modal-title-vcenter">
						Change Question
					</Modal.Title>
				</Modal.Header>
				<Modal.Body>
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
				</Modal.Body>
				<Modal.Footer>
					<Button variant="success" className={"mr-3"} onClick={save}>Save</Button>
					<Button variant="secondary" onClick={props.onDismiss}>Close</Button>

				</Modal.Footer>
			</Modal>
	);
}

const Index = () => {
	const items = useSelector(state => state.QA)
	const [sortedItems, setSortedItems] = useState([])
	const [editShow, setEditShow] = useState(false);
	const [editData, setEditData] = useState({})
	const dispatch = useDispatch()

	useEffect(() => setSortedItems(items), [items])


	const removeItem = (e, id) => {
		e.stopPropagation()
		dispatch(remove({id}))
	}
	const showEdit = (e, item) => {
		e.stopPropagation()
		setEditShow(true)
		setEditData({...item})
	}
	return (
			<div className={"section lists"}>

				<EditModal
						show={editShow}
						data={editData}
						onDismiss={() => setEditShow(false)}
				/>
				<h2 className={"title mb-3"} data-testid={"lists_title"}>
					<b>Created Questions</b>
				</h2>
				<div>
					{(!!sortedItems.length &&
							sortedItems.map(item => (
									<Collapse
											className={"item px-3 mb-3"}
											data-testid={"question"}
											key={item.id}>
										<Collapse.Header>
											<div className={"d-flex justify-content-between align-items-center w-100 py-3"}>
												<div className={"question"}>
													<b>{item.question}</b>
												</div>
												<div>
													<Button
															className={"mr-3"}
															onClick={(e) => showEdit(e, item)}>Edit</Button>
													<Button
															onClick={(e) => removeItem(e, item.id)}
															variant="danger">Remove</Button>

												</div>
											</div>
										</Collapse.Header>

										<Collapse.Body>
											<div className={"py-3 answer"}>{item.answer}</div>
										</Collapse.Body>
										{/*</Collapse>*/}
									</Collapse>
							))) || (
							<Alert data-testid={"no_question_alert"} variant={"danger"} className={"text-left"}>
								No question yet :-(
							</Alert>
					)}

				</div>
				<div className={"d-flex actions"}>
					<Button
							data-testid={"sort"}
							size={"md"}
							className={"px-md-4 mr-3"}
							onClick={() => dispatch(sort())}>sort questions</Button>
					<Button
							data-testid={"remove_all"}
							size={"md"}
							className={"px-md-4 "}
							variant={"danger"}
							onClick={() => dispatch(removeAll())}>remove questions</Button>

				</div>

			</div>
	)
}

export default Index
