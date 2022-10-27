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
import {BaseSyntheticEvent, useContext, useState} from 'react';
import AuthContext from '../../stores/auth-context';

const Navbar = () => {
	const [isMenuOpen, setIsMenuOpen] = useState(true);
	const authCtx = useContext(AuthContext);

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
			{!authCtx.isLoggedIn && <li className={classes.Item}
			                            onMouseOver={addActiveClassHandler}
			                            onMouseOut={removeActiveClassHandler}>
				<FontAwesomeIcon icon={faArrowRightToBracket}/>
				<span>Login</span>
			</li>}
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
			<div className="mt-auto">
				{authCtx.isLoggedIn && <li className={`${classes.Item} ${classes.SignOut}`}
				                           onMouseOver={addActiveClassHandler}
				                           onMouseOut={removeActiveClassHandler}
				                           onClick={authCtx.onLogout}>
					<FontAwesomeIcon icon={faRightFromBracket}/>
					<span>Sign Out</span>
				</li>}
				<li className={`${classes.Item} ${classes.UserWrapper}`}>
					<FontAwesomeIcon icon={faUserCircle}/>
					<span>Filip Petrovski</span>
				</li>
			</div>
		</ul>)
		:
		(<ul className={classes.NavbarItems}>
			<header className={classes.HamburgerMenu}>
				<FontAwesomeIcon
					icon={faBars}
					onClick={toggleIsMenuOpen}/>
			</header>
			{!authCtx.isLoggedIn && <li className={classes.Item}
			                            onMouseOver={addActiveClassHandler}
			                            onMouseOut={removeActiveClassHandler}>
				<FontAwesomeIcon icon={faArrowRightToBracket}/>
			</li>}
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
			<div className="mt-auto">
				{authCtx.isLoggedIn && <li className={`${classes.Item} ${classes.SignOut}`}
				                           onMouseOver={addActiveClassHandler}
				                           onMouseOut={removeActiveClassHandler}
				                           onClick={authCtx.onLogout}>
					<FontAwesomeIcon icon={faRightFromBracket}/>
				</li>}
				<li className={`${classes.Item} ${classes.UserWrapper}`}>
					<FontAwesomeIcon icon={faUserCircle}/>
				</li>
			</div>
		</ul>);

	return <div className={`${classes.Navbar} ${isMenuOpen ? classes.FullNavbar : classes.IconsNavbar}`}>
		{navbarContent}
	</div>;
};
export default Navbar;


