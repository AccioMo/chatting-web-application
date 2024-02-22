import React from 'react';
import { useNavigate } from 'react-router';
import { GoogleOAuthProvider, GoogleLogin, useGoogleLogin } from '@react-oauth/google';
import '../styles/LoginPage.css';
import LoginForm from './LoginForm';
import FacebookLogin from '@greatsumini/react-facebook-login';

function LoginPage() {
	const UID = process.env.REACT_APP_GOOGLE_ID;
	const nav = useNavigate();
	return (
		<div className='login-page'>
			<div className='login-container'>
				<LoginForm />
				<h3 className='login-sep'>OR</h3>
				<div className='oauth-container'>
					<div className='oauth-google'>
						<GoogleOAuthProvider clientId={UID}>
								<GoogleLogin
									type='standard'
									shape='square'
									theme='filled_black'
									text='continue_with'
									onSuccess={credentialResponse => {
										console.log("Login Success", credentialResponse);
										nav("/home");
									}}
									onError={() => {
										console.log('Login Failed');
									}}
								/>
						</GoogleOAuthProvider>

					</div>
					<div className='oauth-facebook flex'>
						// react icon mni nrj3
						
						<FacebookLogin
						appId="1088597931155576"
						style={{
							display: "flex",
							backgroundColor: "transparent",
							color: "white",
							border: "none",
							fontSize: "12px",
							fontWeight: "bold",
							cursor: "pointer",
						}}
						/>
						{/* <button  className='facebook-button'>Login with Facebook</button> */}
					</div>
				</div>
			</div>
		</div>
	)
}

export default LoginPage;