import React from 'react';
import LoginForm from './LoginForm';
import '../../styles/LoginPage.css';

function LoginPage() {
	return (
		<div className='login-page'>
			<div className='login-container'>
				<LoginForm />
				<h3 className='login-sep'>OR</h3>
			</div>
		</div>
	)
}

export default LoginPage;