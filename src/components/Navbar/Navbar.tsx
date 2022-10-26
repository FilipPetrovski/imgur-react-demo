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
		});
	};

	const navbarContent = isMenuOpen ? (<ul className={classes.NavbarItems}>
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
				<span>Login</span>
			</li>
			<li className={classes.Item}
			    onMouseOver={addActiveClassHandler}
			    onMouseOut={removeActiveClassHandler}>
				<FontAwesomeIcon icon={faFireFlameCurved}/>
				<span>Hot</span>
			</li>
			<li className={classes.Item}
			    onMouseOver={addActiveClassHandler}
			    onMouseOut={removeActiveClassHandler}>
				<FontAwesomeIcon icon={faStar}/>
				<span>Top</span>
			</li>
			<li className={`${classes.Item} ${classes.SignOut}`}
			    onMouseOver={addActiveClassHandler}
			    onMouseOut={removeActiveClassHandler}>
				<FontAwesomeIcon icon={faRightFromBracket}/>
				<span>Sign Out</span>
			</li>
			<li className={`${classes.Item} ${classes.UserWrapper}`}>
				<FontAwesomeIcon icon={faUserCircle}/>
				<span>Filip Petrovski</span>
			</li>
		</ul>)
		:
		(<ul className={classes.NavbarItems}>
			<header className={classes.HamburgerMenu}>
				<FontAwesomeIcon
					icon={faBars}
					onClick={toggleIsMenuOpen}/>
			</header>
			<li className={classes.Item}
			    onMouseOver={addActiveClassHandler}
			    onMouseOut={removeActiveClassHandler}>
				<FontAwesomeIcon icon={faArrowRightToBracket}/>
			</li>
			<li className={classes.Item}
			    onMouseOver={addActiveClassHandler}
			    onMouseOut={removeActiveClassHandler}>
				<FontAwesomeIcon icon={faFireFlameCurved}/>
			</li>
			<li className={classes.Item}
			    onMouseOver={addActiveClassHandler}
			    onMouseOut={removeActiveClassHandler}>
				<FontAwesomeIcon icon={faStar}/>
			</li>
			<li className={`${classes.Item} ${classes.SignOut}`}
			    onMouseOver={addActiveClassHandler}
			    onMouseOut={removeActiveClassHandler}>
				<FontAwesomeIcon icon={faRightFromBracket}/>
			</li>
			<li className={`${classes.Item} ${classes.UserWrapper}`}>
				<FontAwesomeIcon icon={faUserCircle}/>
			</li>
		</ul>);

	return <div className={`${classes.Navbar} ${isMenuOpen ? classes.FullNavbar : classes.IconsNavbar}`}>
		{navbarContent}
	</div>;
};
export default Navbar;


