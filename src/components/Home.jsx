import React from 'react'
// import { GoogleOAuthProvider, googleLogout } from '@react-oauth/google';
import { useNavigate } from 'react-router';
import NavBar from './NavBar.jsx';

function Home() {
	const nav = useNavigate();
	return (
		<NavBar />
		// <GoogleOAuthProvider clientId={UIDD} >
		// 	<div>
		// 		<div className="input-field">
		// 			<googleLogout 
		// 			onLogoutSuccess={() => nav('/')}
		// 			></googleLogout>
		// 		</div>
		// 	</div>
		// </GoogleOAuthProvider>
	)
}

export default Home