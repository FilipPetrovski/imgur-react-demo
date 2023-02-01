import classes from '../Navbar/Navbar.module.scss';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {
	faArrowRightToBracket,
	faFireFlameCurved,
	faRightFromBracket,
	faStar,
	faUserCircle,
	faBars,
	faPhotoFilm,
	faPlus
} from '@fortawesome/free-solid-svg-icons';
import {BaseSyntheticEvent, useContext, useEffect, useState} from 'react';
import AuthContext from '../../stores/AuthContext';
import {Link} from 'react-router-dom';
import {RoutesName} from '../../shared/models/Routes';
import {User} from './models/User.model';

const Navbar = (props: { user: User }) => {
	const [isMenuOpen, setIsMenuOpen] = useState(true);
	const authCtx = useContext(AuthContext);
	const [windowSize, setWindowSize] = useState([
		window.innerWidth,
		window.innerHeight,
	]);

	useEffect(() => {
		const handleWindowResize = () => {
			setWindowSize([window.innerWidth, window.innerHeight]);
		};

		window.addEventListener('resize', handleWindowResize);

		return () => {
			window.removeEventListener('resize', handleWindowResize);
		};
	}, []);

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

	const isTabletOrSmallerDevice = () => {
		return windowSize[0] <= 800;
	};

	const closeMenuIfSmallDevice = () => {
		if (isMenuOpen && isTabletOrSmallerDevice()) {
			setIsMenuOpen(false);
		}
	}

	const navbarContent = (<ul className={classes.NavbarItems}>
		<div className={classes.HamburgerMenu}>
			<FontAwesomeIcon
				icon={faBars}
				onClick={toggleIsMenuOpen}/>
			{isMenuOpen &&
				<span className={classes.MenuName}>Imgur</span>}
		</div>
		{!authCtx.isLoggedIn && <Link to={RoutesName.Login} className={classes.Link}>
			<li className={classes.Item}
			    onMouseOver={addActiveClassHandler}
			    onMouseOut={removeActiveClassHandler}
			    onClick={closeMenuIfSmallDevice}>
				<FontAwesomeIcon icon={faArrowRightToBracket}/>
				{isMenuOpen && <span>Login</span>}
			</li>
		</Link>}
		{authCtx.isLoggedIn && <Link to={RoutesName.MyGallery} className={classes.Link}>
			<li className={classes.Item}
			    onMouseOver={addActiveClassHandler}
			    onMouseOut={removeActiveClassHandler}
			    onClick={closeMenuIfSmallDevice}>
				<FontAwesomeIcon icon={faPhotoFilm}/>
				{isMenuOpen && <span>My Gallery</span>}
			</li>
		</Link>}
		{authCtx.isLoggedIn && <Link to={RoutesName.AddImages} className={classes.Link}>
			<li className={classes.Item}
			    onMouseOver={addActiveClassHandler}
			    onMouseOut={removeActiveClassHandler}
			    onClick={closeMenuIfSmallDevice}>
				<FontAwesomeIcon icon={faPlus}/>
				{isMenuOpen && <span>Add New Image</span>}
			</li>
		</Link>}
		<Link to={RoutesName.Hot} className={classes.Link}>
			<li className={classes.Item}
			    onMouseOver={addActiveClassHandler}
			    onMouseOut={removeActiveClassHandler}
			    onClick={closeMenuIfSmallDevice}>
				<FontAwesomeIcon icon={faFireFlameCurved}/>
				{isMenuOpen && <span>Hot</span>}
			</li>
		</Link>
		<Link to={RoutesName.Top} className={classes.Link}>
			<li className={classes.Item}
			    onMouseOver={addActiveClassHandler}
			    onMouseOut={removeActiveClassHandler}
			    onClick={closeMenuIfSmallDevice}>
				<FontAwesomeIcon icon={faStar}/>
				{isMenuOpen && <span>Top</span>}
			</li>
		</Link>
		<div className="mt-auto">
			{authCtx.isLoggedIn && <li className={`${classes.Item} ${classes.SignOut}`}
			                           onMouseOver={addActiveClassHandler}
			                           onMouseOut={removeActiveClassHandler}
			                           onClick={closeMenuIfSmallDevice && authCtx.onLogout}>
				<FontAwesomeIcon icon={faRightFromBracket}/>
				{isMenuOpen && <span>Sign Out</span>}
			</li>}
			<li className={`${classes.Item} ${classes.UserWrapper}`}>
				{
					// TODO add the user avatar here
					authCtx.isLoggedIn ? <img className={classes.Avatar}
					                          src="https://imgur.com/user/filippetrovski1992/avatar?maxwidth=290"
					                          alt="user-avatar"/> :
						<FontAwesomeIcon icon={faUserCircle}/>}
				{isMenuOpen && <span>{props.user.name || 'Username'}</span>}
			</li>
		</div>
	</ul>);

	return <div className={`${classes.Navbar} ${isMenuOpen ? classes.FullNavbar : classes.IconsNavbar}`}>
		{navbarContent}
	</div>;
};
export default Navbar;


