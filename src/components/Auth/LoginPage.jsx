import React from 'react';
import LoginForm from './LoginForm';
import '../../styles/LoginPage.css';

function LoginPage() {
	return (
		<div className='login-page'>
			<div className='login-container'>
				<LoginForm />
			</div>
		</div>
	)
}

export default LoginPage;