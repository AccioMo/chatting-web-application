import React from 'react';
import PocketBase from 'pocketbase';
import LoginForm from './LoginForm';
import { FaGoogle } from "react-icons/fa";
import { useNavigate } from 'react-router';
import '../styles/LoginPage.css';

// const userData = await pb.collection('users').authWithPassword('test@example.com', '123456');

function LoginPage() {
	const pb = new PocketBase('http://127.0.0.1:8090');
	const nav = useNavigate();
	const googleLogIn = async () => {
		const authData = await pb.collection('users').authWithOAuth2({ provider: "google" });
		console.log(authData);
		nav("/home");
	}
	return (
		<div className='login-page'>
			<div className='login-container'>
				<LoginForm />
				<h3 className='login-sep'>OR</h3>
				<div className='oauth-container'>
					<div className='oauth-google'>
						<div onClick={googleLogIn} className='google-button'>
							<FaGoogle color='black' size={16} />
							Continue with Google
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default LoginPage;