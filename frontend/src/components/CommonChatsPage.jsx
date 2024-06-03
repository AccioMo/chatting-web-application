import React from "react";
import ChatContainer from "./ChatContainer";
import { useParams, useNavigate } from "react-router";
import { useEffect, useState } from "react";
import { getCookie, validCookie } from "./Cookies";
import { api, refreshToken } from "./Auth.tsx";
import "../styles/ChatContainer.css";

function CommonChatsPage() {
	const { username } = useParams();
	const [commonChats, setCommonChats] = useState(null);
	useEffect(() => {
		console.log("commonChats: ", commonChats);
		const getCommonChats = async () => {
			let access_token = getCookie("access_token");
			if (validCookie(access_token) === false) {
				access_token = await refreshToken();
			}
			const headers = {
				Authorization: `Bearer ${access_token}`,
			};
			const payload = {
				with: username,
			};
			const chats = await api.post("/api/get_user_chats", payload, {
				headers: headers,
			});
			return chats.data.chats;
		};
		getCommonChats()
		.then((chats) => {
			setCommonChats(chats);
		})
		.catch((e) => {
			console.error("error: ", e);
		});
	}, [username]);
	return (
		<div className="page-content">
			<div className="multiple-chats-container">
				{commonChats
					? commonChats.map((chat) => (
							<ChatContainer key={chat.id} chat={chat} />
					  ))
					: null}
			</div>
		</div>
	);
}

export default CommonChatsPage;
