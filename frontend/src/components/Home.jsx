import { React, useState, useEffect } from "react";
import { useNavigate } from "react-router";
import NavBar from "./NavBar.jsx";
import PocketBase from "pocketbase";
import ChatContainer from "./ChatContainer.jsx";
import { setCookie, getCookie } from "./Cookies.jsx";
import { refreshToken, apiClient } from "./Auth.jsx";
import "../styles/Home.css";

const Home = () => {
	const nav = useNavigate();
	const [chats, setChats] = useState(null);
	useEffect(() => {
		const getChats = async (retry = 1) => {
			try {
				const headers = {
					Authorization: `Bearer ${getCookie("access_token")}`,
				};
				const chats = await apiClient.get("/api/chats/", { headers });
				return chats.data;
			} catch (error) {
				if (error.response.status === 401 && retry > 0) {
					return refreshToken().then(() => getChats(retry - 1));
				} else {
					console.error("error: ", error);
				}
			}
		};
		getChats().then((chats) => {
			setChats(chats);
		});
	}, []);
	const newChat = async () => {
		try {
			const chat_data = {
				topic: "shit",
				username: "mzeggaf",
			};
			const response = await apiClient.post(
				"/api/create_chat",
				chat_data
			);
		} catch (e) {
			console.log(e);
		}
	};
	return (
		<>
			<NavBar />
			<div className="home-container">
				<h1 className="welcome-header">landing page</h1>
				<div className="chats-container">
					{chats
						? chats.map((chat) => (
								<ChatContainer key={chat.id} chat={chat} />
						  ))
						: null}
				</div>
				<button onClick={newChat} className="new-chat-button">
					new chat
				</button>
				<button onClick={refreshToken} className="new-chat-button">
					refresh
				</button>
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
	);
};

export default Home;
