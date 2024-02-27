import React from 'react';
import PocketBase from 'pocketbase';
import LoginForm from './LoginForm';
import { FaGoogle } from "react-icons/fa";
import { useNavigate } from 'react-router';
import '../styles/LoginPage.css';

function LoginPage() {
	const pb = new PocketBase('http://127.0.0.1:8090');
	const nav = useNavigate();
	const googleLogIn = async () => {
		try {
			const authData = await pb.collection('users').authWithOAuth2({ provider: "google" });
			// console.log(authData);
			nav("/home");
		}
		catch (error) {
			console.error('Login error:', error);
		}
	}
	return (
		<div className='login-page'>
			<div className='login-container'>
				<LoginForm />
				<h3 className='login-sep'>OR</h3>
				<div className='oauth-container'>
					<div onClick={googleLogIn} className='oauth-google'>
						<FaGoogle color='black' size={16} />
						Continue with Google
					</div>
				</div>
			</div>
		</div>
	)
}

export default LoginPage;