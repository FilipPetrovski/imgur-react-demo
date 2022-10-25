import imgurImg from '../../assets/Imgur_logo.png';
import classes from '../Login/Login.module.scss';

const Login = () => {
	const signInHandler = () => {
		console.log('sign in clicked');
	}

	return (<div className={classes.LoginWrapper}>
		<img src={imgurImg} alt="Imgur logo"/>
		<button className={classes.Button} onClick={signInHandler}>SIGN IN</button>
		<h1>IMGUR WEB APP</h1>
	</div>);
};

export default Login;
