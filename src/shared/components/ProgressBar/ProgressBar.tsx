import classes from './ProgressBar.module.scss';

type Props = {
	percentage: number;
}
const ProgressBar: React.FC<Props> = (props: Props) => {
	const fixedPercentage = props.percentage.toFixed(0);

	const fillBarStyle = {
		width: `${fixedPercentage}%`
	};

	return (
		<div className={classes.PercentageContainer}>
			<div className={classes.FillBar}
			     style={fillBarStyle}>
				<span className={classes.Label}>{`${fixedPercentage}%`}</span>
			</div>
		</div>
	);
};

export default ProgressBar;