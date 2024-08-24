import { createContext } from "react";
import ChatContainer from "./ChatContainer";
import Profile from "../Profile/Profile.jsx";
import NewChatMenu from "./NewChatMenu.jsx";
import { useParams } from "react-router";
import { useEffect, useState } from "react";
import { getCookie, validCookie } from "../Auth/Cookies.jsx";
import { api, refreshToken } from "../Auth/Auth.tsx";
import "../../styles/Chat.css";

export const NewChatMenuContext = createContext(null);

function CommonChatsPage() {
	const { username } = useParams();
	const [commonChats, setCommonChats] = useState(null);
	const [newChatMenu, setNewChatMenu] = useState(false);
	useEffect(() => {
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
				bot: false,
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
				if (e.response.status === 401) {
					console.error("Unauthorized");
				} else if (e.response.status === 404) {
					console.error("No common chats found");
				} else {
					console.error(e);
				}
				setCommonChats([]);
			});
	}, [username, newChatMenu]);
	return (
		<div className={`page-content`}>
			<NewChatMenuContext.Provider
				value={{ setNewChatMenu }}
				>
				{newChatMenu ? <NewChatMenu chatWith={username} /> : null}
				<Profile username={username} />
			</NewChatMenuContext.Provider>
			<div className="multiple-chats-container">
				{commonChats?.length > 0
					? commonChats.map((chat) => (
							<ChatContainer key={chat.id} chat={chat} />
					  ))
					: "No common chats found"}
			</div>
		</div>
	);
}

export default CommonChatsPage;
