import { React, useEffect, useState } from 'react';
import '../styles/SignupPage.css';
import { setCookie } from './Cookies';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import { api } from './Auth.tsx';

function SignUpForm() {
	const nav = useNavigate();
	const [ csrf_token, setToken ] = useState('');
	useEffect( () => {
		const getCsrfToken = async () => {
			const csrfToken = await api.get('/api/csrf/');
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
			api.defaults.headers.common['X-CSRFToken'] = csrf_token
			const record = await api.post('/api/register/', userData);
			sessionStorage.setItem('uuid', record.data.uuid)
			const jwt_token = await api.post('/api/token/',
				{ "username": data.username, "password": data.password },
				{ 'Content-Type': 'application/json' }
			);
			setCookie('refresh_token', jwt_token.data.refresh, 1);
			setCookie('access_token', jwt_token.data.access, 1);
			nav('/home');
			return record.data['token'];
		} catch (error) {
			console.error('sign-up error:', error);
		}
	};
	return (
		<div>
			<div className='sign-up-header'></div>
			<form onSubmit={handleSubmit(logUserIn)} className='sign-up-form'>
				<div className="input-field">
					<label htmlFor="first_name">First Name</label>
					<input required defaultValue='mo' className='sign-up-input' type="first_name" id="first_name" {...register("first_name")} />
				</div>
				<div className="input-field">
					<label htmlFor="last_name">Last Name</label>
					<input required defaultValue='name' className='sign-up-input' type="last_name" id="last_name" {...register("last_name")} />
				</div>
				<div className="input-field">
					<label htmlFor="username">Username</label>
					<input required defaultValue='user123' className='sign-up-input' type="username" id="username" {...register("username")} />
				</div>
				<div className="input-field">
					<label htmlFor="email">Email</label>
					<input required defaultValue='apah@gmail.com' className='sign-up-input' type="email" id="email" {...register("email")} />
				</div>
				<div className="input-field">
					<label htmlFor="password">Password</label>
					<input required defaultValue='password12345?,.,><' className='sign-up-input' type="password" id="password" {...register("password")} />
				</div>
				<div className="input-field">
					<label htmlFor="password">Confirm Password</label>
					<input required defaultValue='password12345?,.,><' className='sign-up-input' type="password" id="passwordConfirm" {...register("passwordConfirm")} />
				</div>
				<input type="hidden" name="csrfmiddlewaretoken" value={csrf_token} />
				<div className="input-field">
					<button className='sign-up-button' type='submit'>Sign Up!</button>
				</div>
			</form>
		</div>
	)
}

export default SignUpForm;