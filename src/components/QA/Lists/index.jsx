import "./index.scss"
import Button from "react-bootstrap/cjs/Button";
import Alert from "react-bootstrap/cjs/Alert";
import {useSelector, useDispatch} from "react-redux";
import {useEffect, useState} from "react";
import Collapse from "components/common/Collapse";
import {removeAll, sort, remove} from "store/slices/QA"

const Index = () => {
	const items = useSelector(state => state.QA)
	const [sortedItems, setSortedItems] = useState([])
	const dispatch = useDispatch()

	useEffect(() => setSortedItems(items), [items])


	const removeItem = (e, id) => {
		e.stopPropagation()
		dispatch(remove({id}))
	}

	return (
			<div className={"section lists"}>

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
												<Button
														onClick={(e) => removeItem(e, item.id)}
														variant="danger">Remove</Button>
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
