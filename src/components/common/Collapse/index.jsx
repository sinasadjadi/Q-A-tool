import "./index.scss"
import React, { useRef} from "react"


const Header = () => null
const Body = () => null

const findNamedSlot = (children, name) => React.Children.toArray(children).find(
		child => child.type === name
);

const Collapse = ({children, ...props}) => {
	const ref = useRef()

	const header = findNamedSlot(children, Header)
	const body = findNamedSlot(children, Body)

	const click = () => {
		ref.current.classList.toggle('show');
	}
	return (
			<div onClick={click} ref={ref} {...props} className={`collapseApp ${props.className}`}>
				{header && (
						<div className={"header"}>
							{header.props.children}
						</div>
				)}
				{body && (
						<div className={"body"}>
							{body.props.children}
						</div>
				)}
			</div>
	)
}

Collapse.Header = Header
Collapse.Body = Body


export default Collapse
