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
import AuthContext from '../../stores/AuthContext';
import {User} from '../../shared/models/User.model';
import {Link} from 'react-router-dom';
import {RoutesName} from '../../shared/models/Routes';

const Navbar = (props: { user: User }) => {
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
			{!authCtx.isLoggedIn && <Link to={RoutesName.Login} className={classes.Link}>
				<li className={classes.Item}
				    onMouseOver={addActiveClassHandler}
				    onMouseOut={removeActiveClassHandler}>
					<FontAwesomeIcon icon={faArrowRightToBracket}/>
					<span>Login</span>
				</li>
			</Link>}
			<Link to={RoutesName.Hot} className={classes.Link}>
				<li className={classes.Item}
				    onMouseOver={addActiveClassHandler}
				    onMouseOut={removeActiveClassHandler}>
					<FontAwesomeIcon icon={faFireFlameCurved}/>
					<span>Hot</span>
				</li>
			</Link>
			<Link to={RoutesName.Top} className={classes.Link}>
				<li className={classes.Item}
				    onMouseOver={addActiveClassHandler}
				    onMouseOut={removeActiveClassHandler}>
					<FontAwesomeIcon icon={faStar}/>
					<span>Top</span>
				</li>
			</Link>
			<div className="mt-auto">
				{authCtx.isLoggedIn && <li className={`${classes.Item} ${classes.SignOut}`}
				                           onMouseOver={addActiveClassHandler}
				                           onMouseOut={removeActiveClassHandler}
				                           onClick={authCtx.onLogout}>
					<FontAwesomeIcon icon={faRightFromBracket}/>
					<span>Sign Out</span>
				</li>}
				<li className={`${classes.Item} ${classes.UserWrapper}`}>
					{authCtx.isLoggedIn ? <img className={classes.Avatar} src="https://imgur.com/user/filippetrovski1992/avatar?maxwidth=290"
					                           alt="user-avatar"/> :
						<FontAwesomeIcon icon={faUserCircle}/>}
					<span>{props.user.name || 'Username'}</span>
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
			{!authCtx.isLoggedIn && <Link to={RoutesName.Login} className={classes.Link}>
				<li className={classes.Item}
				    onMouseOver={addActiveClassHandler}
				    onMouseOut={removeActiveClassHandler}>
					<FontAwesomeIcon icon={faArrowRightToBracket}/>
				</li>
			</Link>}
			<Link to={RoutesName.Hot} className={classes.Link}>
				<li className={classes.Item}
				    onMouseOver={addActiveClassHandler}
				    onMouseOut={removeActiveClassHandler}>
					<FontAwesomeIcon icon={faFireFlameCurved}/>
				</li>
			</Link>
			<Link to={RoutesName.Top} className={classes.Link}>
				<li className={classes.Item}
				    onMouseOver={addActiveClassHandler}
				    onMouseOut={removeActiveClassHandler}>
					<FontAwesomeIcon icon={faStar}/>
				</li>
			</Link>
			<div className="mt-auto">
				{authCtx.isLoggedIn && <li className={`${classes.Item} ${classes.SignOut}`}
				                           onMouseOver={addActiveClassHandler}
				                           onMouseOut={removeActiveClassHandler}
				                           onClick={authCtx.onLogout}>
					<FontAwesomeIcon icon={faRightFromBracket}/>
				</li>}
				<li className={`${classes.Item} ${classes.UserWrapper}`}>
					{authCtx.isLoggedIn ? <img className={classes.Avatar} src={props.user.avatar} alt="user-avatar"/> :
						<FontAwesomeIcon icon={faUserCircle}/>}
				</li>
			</div>
		</ul>);

	return <div className={`${classes.Navbar} ${isMenuOpen ? classes.FullNavbar : classes.IconsNavbar}`}>
		{navbarContent}
	</div>;
};
export default Navbar;


