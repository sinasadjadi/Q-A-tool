import "./index.scss"
import React, {useEffect, useRef} from "react"


const Header = () => null
const Body = () => null

const findNamedSlot = (children, name) => React.Children.toArray(children).find(
		child => child.type === name
);

const Collapse = ({children, open = false, ...props}) => {
	const ref = useRef()

	const header = findNamedSlot(children, Header)
	const body = findNamedSlot(children, Body)

	useEffect(() => {
		open ? ref.current.classList.add('show') : ref.current.classList.remove('show')
	}, [open])

	const click = () => {
		if(open)
			return
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
