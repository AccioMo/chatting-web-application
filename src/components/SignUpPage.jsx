import React from 'react';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import '../styles/LoginPage.css';
import FacebookLogin from '@greatsumini/react-facebook-login';
import { FaFacebookF } from "react-icons/fa";
import { useNavigate } from 'react-router';
import SignUpForm from './SignUpForm';
import PocketBase from 'pocketbase';

const pb = new PocketBase('http://127.0.0.1:8090');

function SignUpPage() {
	const googleSignUp = async () => {
		const authData = await pb.collection('users').authWithOAuth2({ provider: "google" });
		nav("/home");
	}
	const nav = useNavigate();
	const UID = process.env.REACT_APP_GOOGLE_ID;
	return (
		<div className='login-page'>
			<div className='login-container'>
				<SignUpForm />
				<h3 className='login-sep'>OR</h3>
				<div className='oauth-container'>
					<div className='oauth-google'>
						<div onClick={googleSignUp} className='google-button'>Continue with Google</div>
					</div>
					<div className='oauth-facebook'>
						<div className='icon-facebook'><FaFacebookF color='white' size={16} />Continue with Facebook</div>
					</div>
				</div>
			</div>
		</div>
  )
}

export default SignUpPage;