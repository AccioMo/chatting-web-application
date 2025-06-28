import { useNavigate } from "react-router";
import SignUpForm from './SignUpForm';
import Icon from '../UI/Icons';
import '../../styles/SignupPage.css';

function SignUpPage() {
	const nav = useNavigate();
	return (
		<div className='login-page'>
			<div className="home-door" onClick={() => nav("/home")}>
				<div className="home-icon">
					<Icon.Home />
				</div>
			</div>
			<div className="login-cover">
				<SignUpForm />
			</div>
			<div className="register-door" onClick={() => nav("/login")}>
				<div className="register-icon">
					<Icon.Login />
				</div>
			</div>
		</div>
  )
}

export default SignUpPage;