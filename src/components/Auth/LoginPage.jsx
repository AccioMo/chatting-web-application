import { useNavigate } from "react-router";
import LoginForm from "./LoginForm";
import Icon from "../UI/Icons";
import "../../styles/LoginPage.css";

function LoginPage() {
	const nav = useNavigate();
	return (
		<div className="login-page">
			<div className="home-door">
				<div className="home-icon">
					<Icon.Home onClick={() => nav("/home")} />
				</div>
			</div>
			<div className="login-container">
				<LoginForm />
			</div>
			<div className="register-door">
				<div className="register-icon">
					<Icon.Create onClick={() => nav("/join")} />
				</div>
			</div>
		</div>
	);
}

export default LoginPage;
