import React, {useEffect, useRef} from "react";
import "./index.scss"

const findNamedSlot = (children, name) => React.Children.toArray(children).find(
		child => child.type === name
);

const Text = () => null

const Tooltip = ({children}) => {

	const ref = useRef()
	const Text = findNamedSlot(children, Text)

	useEffect(() => {
		const el = ref.current
		const tip = document.createElement('div');
		tip.classList.add('customTooltip');
		tip.innerText = el.getAttribute('tip');
		let delay = el.getAttribute('tip-delay');
		if (delay) {
			tip.style.transitionDelay = delay + 's';
		}
		tip.style.transform =
				'translate(' +
				(el.hasAttribute('tip-left') ? 'calc(-100% - 5px)' : '15px') + ', ' +
				(el.hasAttribute('tip-top') ? '-100%' : '0') +
				')';
		el.appendChild(tip);
		el.onmousemove = e => {
			tip.style.left = e.clientX + 'px'
			tip.style.top = e.clientY + 'px';
		};

	}, [])
	return (
			<div ref={ref}>
				{Text && (
						<div className={"header"}>
							{Text.props.children}
						</div>
				)}
				{children}
			</div>
	)
}

Tooltip.Text = Text


export default Tooltip
