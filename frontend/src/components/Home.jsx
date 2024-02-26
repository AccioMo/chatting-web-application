import React from 'react'
import { useNavigate } from 'react-router';
import ChatContainer from './ChatContainer.jsx';
import chats from '../data/chats-template.json';
import NavBar from './NavBar.jsx';
import '../styles/Home.css';

function Home() {
	const nav = useNavigate();
	return (
		<>
			<NavBar />
			<div className='home-container'>
				<h1 className='welcome-header'>Start Chatting</h1>
				<div className='chats-container'>
					{chats.map(chat => (
						<ChatContainer chat={chat} />
						))}
				</div>
			</div>
		</>
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