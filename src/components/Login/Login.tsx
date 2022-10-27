import imgurImg from '../../assets/Imgur_logo.png';
import classes from '../Login/Login.module.scss';

const Login = () => {
	const signInHandler = () => {
		window.window.location.href = `https://api.imgur.com/oauth2/authorize?client_id=${process.env.REACT_APP_IMGUR_CLIENT_ID}&response_type=token`;
	};

	return (<div className={classes.LoginWrapper}>
		<img className='img-fluid' src={imgurImg} alt="Imgur logo"/>
		<button className={classes.Button} onClick={signInHandler}>SIGN IN</button>
		<h1>IMGUR WEB APP</h1>
	</div>);
};

export default Login;
