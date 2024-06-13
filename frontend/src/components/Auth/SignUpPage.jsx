import React from 'react';
import { FaFacebookF, FaGoogle } from "react-icons/fa";
import { useNavigate } from 'react-router';
import SignUpForm from './SignUpForm';
import '../../styles/SignupPage.css';


function SignUpPage() {
	const nav = useNavigate();
	const googleSignUp = async () => {
		// pb.authStore.clear();
		nav("/home");
	}
	return (
		<div className='sign-up-page'>
			<div className='sign-up-container'>
				<SignUpForm />
				{/* <h3 className='login-sep'>OR</h3>
				<div className='oauth-container'>
					<div onClick={googleSignUp} className='oauth-google'>
						<FaGoogle color='black' size={16} />
						Continue with Google
					</div>
				</div> */}
			</div>
		</div>
  )
}

export default SignUpPage;