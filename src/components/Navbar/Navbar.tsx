import classes from '../Navbar/Navbar.module.scss';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {
	faArrowRightToBracket,
	faBars,
	faFireFlameCurved,
	faPhotoFilm,
	faPlus,
	faRightFromBracket,
	faStar,
	faUserCircle
} from '@fortawesome/free-solid-svg-icons';
import React, {BaseSyntheticEvent, useContext, useState} from 'react';
import AuthContext from '../../stores/AuthContext';
import {Link} from 'react-router-dom';
import {RoutesName} from '../../shared/models/Routes';
import {User} from './models/User.model';
import useDeviceScreenSize from '../../shared/hooks/UseDeviceScreenSize';

type Props = {
	user: User;
	logoutClick: Function;
}

const Navbar: React.FC<Props> = (props: Props) => {
	const [isMenuOpen, setIsMenuOpen] = useState(true);
	const authCtx = useContext(AuthContext);
	const {deviceScreenWidth} = useDeviceScreenSize();

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

	const closeMenuIfSmallDevice = () => {
		if (isMenuOpen && deviceScreenWidth <= 800) {
			setIsMenuOpen(false);
		}
	};

	const onLogout = () => {
		closeMenuIfSmallDevice();
		props.logoutClick();
		authCtx.onLogout();
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
		<Link to={authCtx.isLoggedIn ? RoutesName.Hot : RoutesName.Login} className={classes.Link}>
			<li className={classes.Item}
			    onMouseOver={addActiveClassHandler}
			    onMouseOut={removeActiveClassHandler}
			    onClick={closeMenuIfSmallDevice}>
				<FontAwesomeIcon icon={faFireFlameCurved}/>
				{isMenuOpen && <span>Hot</span>}
			</li>
		</Link>
		<Link to={authCtx.isLoggedIn ? RoutesName.Top : RoutesName.Login} className={classes.Link}>
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
			                           onClick={onLogout}>
				<FontAwesomeIcon icon={faRightFromBracket}/>
				{isMenuOpen && <span>Sign Out</span>}
			</li>}
			<li className={`${classes.Item} ${classes.UserWrapper}`}>
				{
					authCtx.isLoggedIn ? <img className={classes.Avatar}
					                          src={props.user?.avatar}
					                          alt="user-avatar"/> :
						<FontAwesomeIcon icon={faUserCircle}/>}
				{isMenuOpen && <span>{props.user?.name || 'Username'}</span>}
			</li>
		</div>
	</ul>);

	return <div className={`${classes.Navbar} ${isMenuOpen ? classes.FullNavbar : classes.IconsNavbar}`}>
		{navbarContent}
	</div>;
};
export default Navbar;


