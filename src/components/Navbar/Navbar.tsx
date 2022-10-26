import classes from '../Navbar/Navbar.module.scss';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {
	faArrowRightToBracket,
	faFireFlameCurved,
	faRightFromBracket,
	faStar,
	faUserCircle,
	faBars
} from '@fortawesome/free-solid-svg-icons';
import {BaseSyntheticEvent, useState} from 'react';

const Navbar = () => {
	const [isMenuOpen, setIsMenuOpen] = useState(true);

	const addActiveClassHandler = (element: BaseSyntheticEvent) => {
		element.currentTarget.classList.add(classes.Active);
	};

	const removeActiveClassHandler = (element: BaseSyntheticEvent) => {
		element.currentTarget.classList.remove(classes.Active);
	};

	const toggleIsMenuOpen = () => {
		setIsMenuOpen((prevState) => {
			return !prevState;
		})
		console.log(isMenuOpen);
	}

	return <div className={classes.Navbar}>
		<ul className={classes.NavbarItems}>
			<div className={classes.HamburgerMenu}>
				<FontAwesomeIcon
					icon={faBars}
				onClick={toggleIsMenuOpen}/>
				<span className={classes.MenuName}>Imgur</span>
			</div>
			<li className={classes.Item}
			    onMouseOver={addActiveClassHandler}
			    onMouseOut={removeActiveClassHandler}>
				<FontAwesomeIcon icon={faArrowRightToBracket}/>
				Login
			</li>
			<li className={classes.Item}
			    onMouseOver={addActiveClassHandler}
			    onMouseOut={removeActiveClassHandler}>
				<FontAwesomeIcon icon={faFireFlameCurved}/>
				Hot
			</li>
			<li className={classes.Item}
			    onMouseOver={addActiveClassHandler}
			    onMouseOut={removeActiveClassHandler}>
				<FontAwesomeIcon icon={faStar}/>
				Top
			</li>
			<li className={`${classes.Item} ${classes.SignOut}`}
			    onMouseOver={addActiveClassHandler}
			    onMouseOut={removeActiveClassHandler}>
				<FontAwesomeIcon icon={faRightFromBracket}/>
				Sign Out
			</li>
			<li className={`${classes.Item} ${classes.UserWrapper}`}>
				<FontAwesomeIcon icon={faUserCircle}/>
				Filip Petrovski
			</li>
		</ul>
	</div>;
};
export default Navbar;


