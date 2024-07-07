import { useContext, useEffect, useState } from "react";
import { setCookie } from "./Cookies.jsx";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { api } from "./Auth.tsx";
import { AuthContext } from "./Auth.tsx";
import "../../styles/SignupPage.css";

function SignUpForm() {
	const nav = useNavigate();
	const { isAuthenticated, setIsAuthenticated } = useContext(AuthContext);
	const [csrf_token, setToken] = useState("");
	useEffect(() => {
		const getCsrfToken = async () => {
			const csrfToken = await api.get("/api/csrf/");
			setToken(csrfToken.data);
		};
		getCsrfToken();
	}, []);
	const { register, handleSubmit } = useForm();
	const registerUser = async (data) => {
		try {
			const userData = {
				first_name: data.first_name,
				last_name: data.last_name,
				email: data.email,
				username: data.username,
				password: data.password,
			};
			api.defaults.headers.common["X-CSRFToken"] = csrf_token;
			const record = await api.post("/api/register/", userData);
			if (record.data.success === false)
				return console.error("sign-up error:", record.data.message);
			const jwt_token = await api.post(
				"/api/token/",
				{ username: data.username, password: data.password },
				{ "Content-Type": "application/json" }
			);
			setCookie("refresh_token", jwt_token.data.refresh, 30);
			setCookie("access_token", jwt_token.data.access, 1);
			setCookie("user", JSON.stringify(record.data.user), 30);
			setIsAuthenticated(true);
			nav("/home");
			return record.data;
		} catch (error) {
			console.error("sign-up error:", error);
		}
	};
	return (
		<div>
			<div className="sign-up-header"></div>
			<form
				onSubmit={handleSubmit(registerUser)}
				className="sign-up-form"
			>
				<div className="input-field">
					<label htmlFor="first_name">First Name</label>
					<input
						required
						defaultValue="mo"
						className="sign-up-input"
						type="first_name"
						id="first_name"
						{...register("first_name")}
					/>
				</div>
				<div className="input-field">
					<label htmlFor="last_name">Last Name</label>
					<input
						required
						defaultValue="name"
						className="sign-up-input"
						type="last_name"
						id="last_name"
						{...register("last_name")}
					/>
				</div>
				<div className="input-field">
					<label htmlFor="username">Username</label>
					<input
						required
						defaultValue="user123"
						className="sign-up-input"
						type="username"
						id="username"
						{...register("username")}
					/>
				</div>
				<div className="input-field">
					<label htmlFor="email">Email</label>
					<input
						required
						defaultValue="apah@gmail.com"
						className="sign-up-input"
						type="email"
						id="email"
						{...register("email")}
					/>
				</div>
				<div className="input-field">
					<label htmlFor="password">Password</label>
					<input
						required
						defaultValue="password12345?,.,><"
						className="sign-up-input"
						type="password"
						id="password"
						{...register("password")}
					/>
				</div>
				<div className="input-field">
					<label htmlFor="password">Confirm Password</label>
					<input
						required
						defaultValue="password12345?,.,><"
						className="sign-up-input"
						type="password"
						id="passwordConfirm"
						{...register("passwordConfirm")}
					/>
				</div>
				<input
					type="hidden"
					name="csrfmiddlewaretoken"
					value={csrf_token}
				/>
				<div className="input-field">
					<button className="sign-up-button" type="submit">
						Sign Up!
					</button>
				</div>
			</form>
		</div>
	);
}

export default SignUpForm;
