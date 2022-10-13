import imgurImg from '../../assets/Imgur_logo.png';
import classes from '../Login/Login.module.scss';

const Login = () => {
	return (<div className={classes.LoginWrapper}>
		<img src={imgurImg} alt='Imgur logo' />
		<button className={classes.Button}>SIGN IN</button>
		<h1>IMGUR WEB APP</h1>
	</div>);
}

export default Login;
