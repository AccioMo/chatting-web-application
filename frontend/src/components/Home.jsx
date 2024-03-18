import { React, useState, useEffect} from 'react'
import { useNavigate } from 'react-router';
import ChatContainer from './ChatContainer.jsx';
// import chats from '../data/chats-template.json';
import NavBar from './NavBar.jsx';
import PocketBase from 'pocketbase';
import '../styles/Home.css';
import { get } from 'react-hook-form';

const Home = () => {
	const pb = new PocketBase('http://127.0.0.1:8090');
	const nav = useNavigate();
	const [chats, setChats] = useState(null);
	useEffect(() => {
		let ignore = false;
		const getChats = async () => {
			try {
				const chats = await pb.collection('chats').getList(0, 1, { filter: `user.id = "${pb.authStore.model.id}"` });
				// console.log(chats.items); // logs the chats
				return (chats.items);
			} catch (error) {
				console.error("error: ", error); // logs any error that occurred
				// throw error;
			}
		}
		setChats(null);
		getChats().then(chats => {
			if (ignore) return;
			// console.log("chats:", chats); // logs the chats
			setChats(chats);
		});
	    return () => {
			ignore = true;
		};
	}, []);
	console.log("chats:", chats); // logs the chats
	if (pb.authStore.isValid === false) {
		nav('/login');
		return null;
	}
	return (
		<>
			<NavBar />
			<div className='home-container'>
				<h1 className='welcome-header'>landing page</h1>
				<div className='chats-container'>
					{/* {chats.map(chat => (
						<ChatContainer key={chat.id} chat={chat} />
						))} */}
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