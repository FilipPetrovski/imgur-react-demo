import classes from './Loading.module.scss';

const Loading = () => {
	return (
		<div className={classes.LoadingSpinnerContainer}>
			<div className={classes.LoadingSpinner}/>
		</div>
	);
};

export default Loading;
