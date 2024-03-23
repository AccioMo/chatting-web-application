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
			const access_token = localStorage.getItem('authToken');
			const headers = {
				'Authorization': `Bearer ${token['access']}`
			};
			const payload = {
				"refresh": token['refresh']
			};
			const token = await axios.post('/api/token/refresh/', payload, { headers });
			localStorage.setItem('authToken', JSON.stringify(token.data));
		} catch (error) {
			console.error('error:', error);
		}
	}
	const [chats, setChats] = useState(null);
	useEffect(() => {
		const getChats = async (retry = 1) => {
			try {
				const token = JSON.parse(localStorage.getItem('authToken'))['access'];
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