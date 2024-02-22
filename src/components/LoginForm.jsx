import React from 'react'
import '../styles/LoginPage.css';

function LoginForm() {
  return (
	<div className='login-form'>
		<form>
			<div className="input-field">
				<label htmlFor="email">Email</label>
				<input className='login-input' type="email" id="email" />
			</div>
			<div className="input-field">
				<label htmlFor="password">Password</label>
				<input className='login-input' type="password" id="password" />
			</div>
			<div className="input-field">
				<button className='login-button'>Login</button>
			</div>
		</form>
	</div>
  )
}

export default LoginForm;