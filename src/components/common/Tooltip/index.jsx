import React, {useEffect, useRef} from "react";
import "./index.scss"


const Tooltip = ({children, text}) => {

	const ref = useRef()

	useEffect(() => {
		if(!text)
			return
		const el = ref.current

		const tip = el.querySelector(".customTooltip")

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

	}, [text])

	if(!text)
		return children

	return (
			<div ref={ref} className={"tooltipWrapper"}>
				{children}
				<div className={"customTooltip"}>{text}</div>
			</div>
	)
}


export default Tooltip
