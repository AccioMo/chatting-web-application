import { useNavigate } from "react-router";
import SignUpForm from './SignUpForm';
import Icon from '../UI/Icons';
import '../../styles/SignupPage.css';

function SignUpPage() {
	const nav = useNavigate();
	return (
		<div className='login-page'>
			<div className="home-door">
				<div className="home-icon">
					<Icon.Home onClick={() => nav("/home")} />
				</div>
			</div>
			<div className='login-container'>
				<SignUpForm />
			</div>
			<div className="register-door">
				<div className="register-icon">
					<Icon.Create onClick={() => nav("/login")} />
				</div>
			</div>
		</div>
  )
}

export default SignUpPage;