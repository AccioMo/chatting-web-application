import React from 'react'
import '../styles/LoginPage.css';
import PocketBase from 'pocketbase';
import { useNavigate } from 'react-router';


function LoginForm() {
	const pb = new PocketBase('http://127.0.0.1:8090');
	const nav = useNavigate();
	const logUserIn = async (e) => {
		try {
			const email = e.target.email.value;
			const password = e.target.password.value;
			const userData = await pb.collection('users').authWithPassword(email, password);
			if (userData.code != 200)
				throw new Error('Invalid credentials');
			nav('/home');
		}
		catch (error) {
			console.error('Login error:', error);
		}
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