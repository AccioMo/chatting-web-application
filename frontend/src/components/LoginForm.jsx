import { React, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import '../styles/LoginPage.css';
import axios from 'axios';
import { useNavigate } from 'react-router';


function LoginForm() {
	const nav = useNavigate();
	// const [ csrf_token, setToken ] = useState('');
	// useEffect( () => {
	// 	const getCsrfToken = async () => {
	// 		const csrfToken = await axios.get('/api/csrf/');
	// 		setToken(csrfToken.data);
	// 		console.log('CSRF token:', csrfToken.data);
	// 	}
	// 	getCsrfToken();
	// }, []);
	const { register, handleSubmit } = useForm();
	const logUserIn = async (data) => {
		try {
			const username = data.username;
			const password = data.password;
			const userData = {
				"username": username,
				"password": password,
			};
			// axios.defaults.headers.common['X-CSRFToken'] = csrf_token
			const record = await axios.post('/api/login/', userData);
			console.log('User logged in:', record.status);
			const jwt_token = await axios.post('/api/token/', userData,
				{ 'Content-Type': 'application/json' }
			);
			console.log('JWT token:', jwt_token.data['access']);
			localStorage.setItem('access_token', jwt_token.data['access']);
			localStorage.setItem('refresh_token', jwt_token.data['refresh']);
			nav('/home');
		}
		catch (error) {
			if (error.response.status === 404)
				console.log('incorrect password');
			else if (error.response.status === 500)
				console.log('username not found');
			else
				console.error('Login error:', error);
		}
	}
	return (
		<div>
			<div className='login-header'></div>
			<form onSubmit={handleSubmit(logUserIn)} className='login-form'>
				<div className="input-field">
					<label htmlFor="username">Username</label>
					<input className='login-input' type="username" id="username" {...register("username")} />
				</div>
				<div className="input-field">
					<label htmlFor="password">Password</label>
					<input className='login-input' type="password" id="password" {...register("password")} />
				</div>
				{/* <input type="hidden" name="csrfmiddlewaretoken" value={csrf_token} /> */}
				<div className="input-field">
					<button className='login-button' type='submit'>Login</button>
				</div>
			</form>
		</div>
	)
}

export default LoginForm;