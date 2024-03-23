import { React, useEffect, useState } from 'react';
import axios from 'axios'
import '../styles/LoginPage.css';
import PocketBase from 'pocketbase';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';


function SignUpForm() {
	const nav = useNavigate();
	const [ csrf_token, setToken ] = useState('');
	useEffect( () => {
		const getCsrfToken = async () => {
			const csrfToken = await axios.get('/api/csrf/');
			setToken(csrfToken.data);
		}
		getCsrfToken();
	}, []);
	const { register, handleSubmit } = useForm();
	const logUserIn = async (data) => {
		try {
			const userData = {
				"first_name": data.first_name,
				"last_name": data.last_name,
				"email": data.email,
				"username": data.username,
				"password": data.password,
			};
			axios.defaults.headers.common['X-CSRFToken'] = csrf_token
			const record = await axios.post('/api/signup/', userData);
			console.log('User logged in:', record.data);
			const jwt_token = await axios.post('/api/token/',
				{ "username": data.username, "password": data.password },
				{ 'Content-Type': 'application/json' }
			);
			localStorage.setItem('access_token', jwt_token.data['access']);
			localStorage.setItem('refresh_token', jwt_token.data['refresh']);
			nav('/home');
			return record.data['token'];
		} catch (error) {
			console.error('Login error:', error);
		}
	};
	return (
		<div>
			<div className='login-header'></div>
			<form onSubmit={handleSubmit(logUserIn)} className='login-form'>
				<div className="input-field">
					<label htmlFor="first_name">First Name</label>
					<input required defaultValue='mo' className='login-input' type="first_name" id="first_name" {...register("first_name")} />
				</div>
				<div className="input-field">
					<label htmlFor="last_name">Last Name</label>
					<input required defaultValue='name' className='login-input' type="last_name" id="last_name" {...register("last_name")} />
				</div>
				<div className="input-field">
					<label htmlFor="username">Username</label>
					<input required defaultValue='user123' className='login-input' type="username" id="username" {...register("username")} />
				</div>
				<div className="input-field">
					<label htmlFor="email">Email</label>
					<input required defaultValue='apah@gmail.com' className='login-input' type="email" id="email" {...register("email")} />
				</div>
				<div className="input-field">
					<label htmlFor="password">Password</label>
					<input required defaultValue='password12345?,.,><' className='login-input' type="password" id="password" {...register("password")} />
				</div>
				<div className="input-field">
					<label htmlFor="password">Confirm Password</label>
					<input required defaultValue='password12345?,.,><' className='login-input' type="password" id="passwordConfirm" {...register("passwordConfirm")} />
				</div>
				<input type="hidden" name="csrfmiddlewaretoken" value={csrf_token} />
				<div className="input-field">
					<button className='login-button' type='submit'>Login</button>
				</div>
			</form>
		</div>
	)
}

export default SignUpForm;