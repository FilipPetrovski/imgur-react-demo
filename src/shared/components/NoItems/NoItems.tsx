import noItemsImage from '../../../assets/images/ic_Nothing-Found_40x40.png';
import classes from './NoItems.module.scss';

const NoItems = (props: { text: string }) => {
	return <div className={classes.Wrapper}>
		<div className={classes.NothingFound}>
			<img className="mt-3"
			     alt="no items found"
			     src={noItemsImage}/>
			<div className="my-3">Nothing found</div>
		</div>
		<div className={classes.Message}>
			{props.text}
		</div>
	</div>;
};
export default NoItems;
