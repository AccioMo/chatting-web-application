import { React, useState, useEffect} from 'react'
import { useNavigate } from 'react-router';
import NavBar from './NavBar.jsx';
import PocketBase from 'pocketbase';
import ChatContainer from './ChatContainer.jsx';
import axios from 'axios';
import '../styles/Home.css';

const Home = () => {
	const nav = useNavigate();
	const refreshToken = async () => {
		try{
			const access_token = localStorage.getItem('access_token');
			const refresh_token = localStorage.getItem('refresh_token');
			const headers = {
				'Authorization': `Bearer ${access_token}`
			};
			const payload = {
				"refresh": refresh_token
			};
			const token = await axios.post('/api/token/refresh/', payload, { headers });
			console.log('new access token:', token.data['access']);
			localStorage.setItem('access_token', token.data['access']);
			localStorage.setItem('refresh_token', token.data['refresh']);
		} catch (error) {
			console.error('error:', error);
		}
	}
	const [chats, setChats] = useState(null);
	useEffect(() => {
		const getChats = async (retry = 1) => {
			try {
				const token = localStorage.getItem('access_token');
				const headers = {
					'Authorization': `Bearer ${token}`
				};
				const chats = await axios.get('/api/chats/', { headers });
				return (chats.data);
			} catch (error) {
				if (error.response.status === 401 && retry > 0) {
					return refreshToken().then(() => getChats(retry - 1));
				} else {
					console.error("error: ", error);
				}
			}
		}
		getChats().then(chats => {
			setChats(chats);
		});
		}, []);
	return (
		<>
			<NavBar />
			<div className='home-container'>
				<h1 className='welcome-header'>landing page</h1>
				<div className='chats-container'>
					{
						chats ? chats.map(chat => (
							<ChatContainer key={chat.id} chat={chat} />
						)):null
					}
				</div>
				<button onClick={refreshToken} className='new-chat-button'>refresh</button>
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