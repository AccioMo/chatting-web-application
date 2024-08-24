import { useContext, useEffect, useState } from "react";
import { setCookie } from "./Cookies.jsx";
import { useNavigate } from "react-router";
import { AuthContext } from "./Auth.tsx";
import { api } from "./Auth.tsx";
import "../../styles/LoginPage.css";

function LoginForm() {
	const nav = useNavigate();
	const { setIsAuthenticated } = useContext(AuthContext);
	const [csrf_token, setToken] = useState("");
	useEffect(() => {
		api.get("/api/csrf/")
			.then((e) => {
				setToken(e.data);
			})
			.catch((e) => {
				console.error("CSRF error:", e);
			});
	}, []);
	const logUserIn = async (e) => {
		e.preventDefault();
		try {
			const username = e.target.elements.username.value;
			const password = e.target.elements.password.value;
			console.log("username:", username);
			const userData = {
				username: username,
				password: password,
			};
			console.log("csrf_token:", csrf_token);
			api.defaults.headers.common["X-CSRFToken"] = csrf_token;
			const record = await api.post("/api/login/", userData);
			const jwt_token = await api.post("/api/token/", userData, {
				"Content-Type": "application/json",
			});
			setCookie("refresh_token", jwt_token.data.refresh, 30);
			setCookie("access_token", jwt_token.data.access, 1);
			setCookie("user", JSON.stringify(record.data), 30);
			setIsAuthenticated(true);
			nav("/home");
		} catch (error) {
			if (error?.response?.status === 404)
				console.log("incorrect password");
			else if (error?.response?.status === 500)
				console.log("username not found");
			else console.error("Login error:", error);
		}
	};
	return (
		<div>
			<div className="login-header"></div>
			<form onSubmit={logUserIn} className="login-form">
				<div className="input-field">
					<label htmlFor="username">Username</label>
					<input
						className="login-input"
						type="username"
						id="username"
					/>
				</div>
				<div className="input-field">
					<label htmlFor="password">Password</label>
					<input
						className="login-input"
						type="password"
						id="password"
					/>
				</div>
				<input
					type="hidden"
					name="csrfmiddlewaretoken"
					value={csrf_token}
				/>
				<div className="input-field">
					<button className="login-button" type="submit">
						Login
					</button>
				</div>
			</form>
		</div>
	);
}

export default LoginForm;
