import React from 'react';
import { GoogleOAuthProvider, GoogleLogin, useGoogleLogin } from '@react-oauth/google';
import '../styles/LoginPage.css';
import LoginForm from './LoginForm';
import FacebookLogin from '@greatsumini/react-facebook-login';
import { FaFacebookF } from "react-icons/fa";
import { useNavigate } from 'react-router';

// const result = await pb.collection('example').getList(1, 20, {
//     filter: 'status = true && created > "2022-08-01 10:00:00"'
// });

// const userData = await pb.collection('users').authWithPassword('test@example.com', '123456');

// const adminData = await pb.admins.authWithPassword('test@example.com', '123456');

function LoginPage() {
	const nav = useNavigate();
	const UID = process.env.REACT_APP_GOOGLE_ID;
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
					<div className='oauth-facebook'>
						<div className='icon-facebook'><FaFacebookF color='white' size={16} /></div>
							<FacebookLogin
							appId="1088597931155576"
							style={{
								display: "flex",
								backgroundColor: "transparent",
								color: "white",
								border: "none",
								fontSize: "13px",
								cursor: "pointer",
							}}
							/>
					</div>
				</div>
			</div>
		</div>
	)
}

export default LoginPage;