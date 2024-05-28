import { React, useState, useEffect } from "react";
import SideBar from "./SideBar.jsx";
import ChatContainer from "./ChatContainer.jsx";
import { setCookie, getCookie } from "./Cookies.jsx";
import { refreshToken, api } from "./Auth.tsx";
import { jwtDecode } from "jwt-decode";
import "../styles/Home.css";

const Home = () => {
	const [chats, setChats] = useState(null);
	const access_token = getCookie("access_token");
	const decodedToken = jwtDecode(access_token);
	const uuid = decodedToken.uuid;
	useEffect(() => {
		const getChats = async (retry = 1) => {
			try {
				const headers = {
					Authorization: `Bearer ${getCookie("access_token")}`,
				};
				const chats = await api.get("/api/get_user_chats", {
					headers: headers,
				});
				return chats.data.chats;
			} catch (e) {
				if (e.response && e.response.status == 401 && retry > 0) {
					return refreshToken().then(() => getChats(retry - 1));
				} else {
					console.error("error: ", e);
				}
			}
		};
		if (chats === null) {
			getChats().then((chats) => {
				setChats(chats);
			});
		}
	}, [chats]);
	const newChat = async () => {
		try {
			const chat_data = {
				topic: "shit",
				username: "mzeggaf",
			};
			const response = await api.post("/api/create_chat", chat_data);
			setChats([ ...chats, response.data]);
		} catch (e) {
			console.log(e);
		}
	};
	return (
		<div className="page-content">
			<SideBar />
			<div className="home-container">
				<div className="chats-container">
					{chats
						? chats.map((chat) => (
								<ChatContainer key={chat.id} uuid={uuid} chat={chat} />
						  ))
						: null}
				</div>
				{/* <button onClick={newChat} className="new-chat-button">
					new chat
				</button>
				<button onClick={refreshToken} className="new-chat-button">
					refresh
				</button> */}
			</div>
		</div>
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
