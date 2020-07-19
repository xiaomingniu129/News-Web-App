import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { animate, preset } from './helpers/helper';

const getDefaultStyle = () => {
	return {
		overflow: 'hidden',
		position: 'relative'
	};
};

const ReadMore = ({
	minHeight,
	displayHeight,
	btnText,
	btnTextShown,
	timing,
	timingFunction,
	defaultShownOnLess,
	btn,
	btnClassName,
	btnStyles,
	onClick,
	...rest
}) => {
	const container = useRef();
	const _container = useRef();
	const [selectedPreset, setSelectedPreset] = useState('noWobble');
	const [height, setHeight] = useState(50);
	const [beforeHeight, setBeforeHeight] = useState(50);
	const [finalHeight, setFinalHeight] = useState('auto');
	const [show, setShown] = useState(false);
	const [btnLabel, setBtnLabel] = useState('Read More');
	const [btnLabelShown, setBtnLabelShown] = useState('Read Less');
	const [maxAvailableHeight, setMaxAvailableHeight] = useState(0);
	const [showContent, setShowContent] = useState(false);

	useEffect(() => {
		if (minHeight) {
			setHeight(minHeight);
			setBeforeHeight(minHeight);
		}
		if (displayHeight) setFinalHeight(displayHeight);
		if (btnText) setBtnLabel(btnText);
		if (btnTextShown) setBtnLabelShown(btnTextShown);
		if (preset.hasOwnProperty(rest.preset)) setSelectedPreset(rest.preset);
	}, [btnText, btnTextShown, displayHeight, minHeight, rest.preset]);

	useEffect(() => {
		if (_container.current.scrollHeight === 0) return;
		if (_container.current.scrollHeight === maxAvailableHeight) return;
		if (rest.children) {
			setMaxAvailableHeight(_container.current.scrollHeight);
		}
	}, [maxAvailableHeight, rest.children]);

	const animateNow = (fn, x, X) => {
		const { stiffness, damping } = preset[selectedPreset];
		animate(
			{
				frameRate: 1000 / 60,
				x: x,
				destX: X,
				v: rest.velocity || 0,
				k: stiffness,
				b: damping,
				precision: rest.precision || 0.01,
				mass: rest.mass || 1,
				el: container.current,
				key: 'height'
			},
			fn
		);
	};

	const showContents = () => {
		setShowContent(true);
		setShown(true);
		animateNow(
			() => {
				setHeight(finalHeight);
				if (typeof onClick === 'function') onClick.call(null, true);
			},
			minHeight,
			maxAvailableHeight
		);
	};

	const hideContents = () => {
		setShown(false);
		setShowContent(false);

		animateNow(
			() => {
				setHeight(beforeHeight);
				if (typeof onClick === 'function') onClick.call(null, false);
			},
			maxAvailableHeight,
			minHeight
		);
	};

	const toggleHeight = () => {
		if (show) {
			hideContents();
			return;
		}

		showContents();
	};

	const contentHasSameHeightOrLess = () => {
		if (!_container.current) return false;
		return maxAvailableHeight <= height;
	};

	const showChildren = () => {
		if (defaultShownOnLess && !showContent) return defaultShownOnLess;
		return rest.children;
	};

	const renderBtn = () => {
		const shouldHide = contentHasSameHeightOrLess();
		if (btn) {
			const newBtn = React.cloneElement(btn, {
				onClick: toggleHeight
			});
			return shouldHide ? null : newBtn;
		}

		return shouldHide ? null : (
			<button
				onClick={toggleHeight}
				className={btnClassName}
				style={{ ...btnStyles }}
			>
				{show ? btnLabelShown : btnLabel}
			</button>
		);
	};

	const renderFade = () => {
		if (!rest.fade) return null;
		if (contentHasSameHeightOrLess()) return null;

		const colorStopTop = rest.colorStopTop || 'rgba(255, 255, 255, 0)';
		const colorStopBottom = rest.colorStopBottom || 'white';
		const fadeHeight = rest.fadeHeight || beforeHeight / 2;

		return (
			<div
				className="readmore--fade"
				style={{
					opacity: show ? 0 : 1,
					width: '100%',
					position: 'absolute',
					height: fadeHeight,
					bottom: 0,
					backgroundImage: `linear-gradient(to bottom, ${colorStopTop}, ${colorStopBottom})`,
					transition: 'opacity 250ms ease-in'
				}}
			/>
		);
	};

	return (
		<div className="readmore__wrapper" style={{ position: 'relative' }}>
			<div
				className="readmore__container"
				ref={container}
				style={{ height, ...getDefaultStyle() }}
			>
				{showChildren()}
				{renderFade()}
			</div>
			{renderBtn()}
			<div
				className="reademore__hidden_content"
				style={{
					position: 'absolute',
					top: '-9999px',
					left: '-9999px',
					width: '100%'
				}}
				ref={_container}
			>
				{rest.children}
			</div>
		</div>
	);
};

ReadMore.propTypes = {
	minHeight: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	displayHeight: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	btnText: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
	btnTextShown: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
	defaultShownOnLess: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.element
	]),
	btn: PropTypes.element,
	onClick: PropTypes.func,
	children: PropTypes.node.isRequired,
	btnStyles: PropTypes.object,
	btnClassName: PropTypes.string,
	fade: PropTypes.bool,
	fadeHeight: PropTypes.number,
	colorStopBottom: PropTypes.string,
	colorStopTop: PropTypes.string,
	precision: PropTypes.number,
	preset: PropTypes.oneOf([
		'noWobble',
		'wobbly',
		'gentle',
		'stiff',
		'slow',
		'molasses'
	]),
	mass: PropTypes.number,
	velocity: PropTypes.number,
	stiffness: PropTypes.number,
	damping: PropTypes.number
};

export default ReadMore;
