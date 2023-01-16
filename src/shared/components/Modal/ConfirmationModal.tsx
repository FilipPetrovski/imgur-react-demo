import React from 'react';
import ReactDOM from 'react-dom';
import classes from './ConfirmationModal.module.scss';

interface StateProps {
	visible: boolean,
	toggle: any,
	onLeftButtonClick: Function,
	onRightButtonClick: Function,
	text?: string,
	leftButtonText?: string,
	rightButtonText?: string
}

const ConfirmationModal = (props: StateProps) => {
	const onLeftButtonClick = () => {
		props.onLeftButtonClick();
		props.toggle();
	}

	const onRightButtonClick = () => {
		props.onRightButtonClick();
		props.toggle();
	}

	return props.visible ? ReactDOM.createPortal(
		<div className={classes.modalContainer}>
			<div className={classes.modalPanel} role="dialog" aria-modal="true">
				<div className={classes.modalText}>
					{props.text}
				</div>
				<div className={classes.buttonsWrapper}>
					<button type="button"
					        className={classes.leftButton}
					        onClick={onLeftButtonClick}>{props.leftButtonText || 'No'}</button>
					<button type="button"
					        className={classes.rightButton}
					        onClick={onRightButtonClick}>{props.rightButtonText || 'Yes'}</button>
				</div>
			</div>
			<div className={classes.modalOverlay}
			     onClick={props.toggle}></div>
		</div>, document.body
	) : null;
}


export default ConfirmationModal;