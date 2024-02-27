import React from 'react'
import '../styles/LoginPage.css';
import PocketBase from 'pocketbase';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';


function SignUpForm() {
	const pb = new PocketBase('http://127.0.0.1:8090');
	const nav = useNavigate();
	const { register, handleSubmit } = useForm();
	const logUserIn = async (data) => {
		try {
			const userData = {
				"username": data.username,
				"email": data.email,
				"emailVisibility": true,
				"password": data.password,
				"passwordConfirm": data.passwordConfirm,
				"name": data.fullName
			};
			const record = await pb.collection("users").create(userData);
			console.log('User logged in:', record);
		} catch (error) {
			console.error('Login error:', error);
		}
		nav('/home');
	};
	return (
		<div>
			<div className='login-header'>{pb.authStore.isValid.toString()}</div>
			<form onSubmit={handleSubmit(logUserIn)} className='login-form'>
				<div className="input-field">
					<label htmlFor="name">Full Name</label>
					<input required className='login-input' type="name" id="full_name" {...register("fullName")} />
				</div>
				<div className="input-field">
					<label htmlFor="username">Username</label>
					<input required className='login-input' type="username" id="username" {...register("username")} />
				</div>
				<div className="input-field">
					<label htmlFor="email">Email</label>
					<input required className='login-input' type="email" id="email" {...register("email")} />
				</div>
				<div className="input-field">
					<label htmlFor="password">Password</label>
					<input required className='login-input' type="password" id="password" {...register("password")} />
				</div>
				<div className="input-field">
					<label htmlFor="password">Confirm Password</label>
					<input required className='login-input' type="password" id="passwordConfirm" {...register("passwordConfirm")} />
				</div>
				<div className="input-field">
					<button className='login-button' type='submit'>Login</button>
				</div>
			</form>
		</div>
	)
}

export default SignUpForm;