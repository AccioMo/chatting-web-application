import React from 'react'
import '../styles/LoginPage.css';
import PocketBase from 'pocketbase';
import { useNavigate } from 'react-router';

const pb = new PocketBase('http://127.0.0.1:8090');

function LoginForm() {
	const nav = useNavigate();
	const handleEmailPasswordLogin = async (email, password) => {
		try {
			// const authData = await pb.collection('users').authWithPassword(
			// 	email,
			// 	password,
			// );
			const data = {
				"username": "username",
				"email": "test@example.com",
				"emailVisibility": true,
				"password": "12345678",
				"passwordConfirm": "12345678",
				"name": "test"
			};
			const record = await pb.collection("users").create(data);
			console.log('User logged in:', record);
			// Redirect to home page or perform other actions
		} catch (error) {
			console.error('Login error:', error);
			// Handle login error (e.g., display error message to user)
		}
	};
	const logUserIn = (e) => {
		const email = e.target.email.value;
		const password = e.target.password.value;
		handleEmailPasswordLogin(email, password);
		nav('/home');
	}
	return (
		<div>
			<div className='login-header'>{pb.authStore.isValid.toString()}</div>
			<form onSubmit={logUserIn} className='login-form'>
				<div className="input-field">
					<label htmlFor="email">Email</label>
					<input className='login-input' type="email" id="email" />
				</div>
				<div className="input-field">
					<label htmlFor="password">Password</label>
					<input className='login-input' type="password" id="password" />
				</div>
				<div className="input-field">
					<button className='login-button' type='submit'>Login</button>
				</div>
			</form>
		</div>
	)
}

export default LoginForm;