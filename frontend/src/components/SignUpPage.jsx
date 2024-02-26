import React from 'react';
import '../styles/LoginPage.css';
import { FaFacebookF, FaGoogle } from "react-icons/fa";
import { useNavigate } from 'react-router';
import SignUpForm from './SignUpForm';
import PocketBase from 'pocketbase';

const pb = new PocketBase('http://127.0.0.1:8090');

function SignUpPage() {
	const googleSignUp = async () => {
		const authData = await pb.collection('users').authWithOAuth2({ provider: "google" });
		console.log(authData);
		// pb.authStore.clear();
		nav("/home");
	}
	const nav = useNavigate();
	return (
		<div className='login-page'>
			<div className='login-container'>
				<SignUpForm />
				<h3 className='login-sep'>OR</h3>
				<div className='oauth-container'>
					<div className='oauth-google'>
						<div onClick={googleSignUp} className='google-button'>
							<FaGoogle color='black' size={16} />
							Continue with Google
						</div>
					</div>
				</div>
			</div>
		</div>
  )
}

export default SignUpPage;