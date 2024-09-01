import { useNavigate } from "react-router";
import LoginForm from "./LoginForm";
import Icon from "../UI/Icons";
import "../../styles/LoginPage.css";

function LoginPage() {
	const nav = useNavigate();
	return (
		<div className="login-page">
			<div className="home-door" onClick={() => nav("/home")}>
				<div className="home-icon">
					<Icon.Home />
				</div>
			</div>
			<div className="login-cover">
				<LoginForm />
			</div>
			<div className="register-door" onClick={() => nav("/join")}>
				<div className="register-icon">
					<Icon.Create />
				</div>
			</div>
		</div>
	);
}

export default LoginPage;
