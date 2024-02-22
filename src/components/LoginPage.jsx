import React from 'react';
import { useNavigate } from 'react-router';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';

function LoginPage() {
	const UID = process.env.REACT_APP_GOOGLE_ID;
	const nav = useNavigate();
	console.log(UID);
	return (
		<GoogleOAuthProvider clientId={UID} >
			<div>
				<div className="input-field">
					<GoogleLogin
						onSuccess={credentialResponse => {
							console.log("Login Success", credentialResponse);
							nav("/home");
						}}
						onError={() => {
							console.log('Login Failed');
						}}
					/>
				</div>
			</div>
		</GoogleOAuthProvider>
	)
}

export default LoginPage;