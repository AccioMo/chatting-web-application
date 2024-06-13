import { useState, useContext } from "react";
import { NewChatMenuContext } from "./CommonChatsPage";
import { api, refreshToken } from "./Auth.tsx";
import { getCookie, validCookie } from "./Cookies";
import "../styles/PopupMenu.css";

function NewChatMenu() {
	const { newChatMenu, setNewChatMenu } = useContext(NewChatMenuContext);
	const [ matchingUser, setMatchingUser ] = useState(null);
	const getMatchingUsers = async (e) => {
		let access_token = getCookie("access_token");
		if (validCookie(access_token) === false) {
			access_token = await refreshToken();
		}
		const headers = {
			Authorization: `Bearer ${access_token}`,
		};
		const response = api
			.post(
				"/api/get_users",
				{ query_by: 'username', query: e.target.value },
				{ headers: headers }
			)
			.then((response) => {
				setMatchingUser(response.data.users[0]?.username);
				console.log("matching user: ", matchingUser);
			})
			.catch((e) => console.error("error: ", e));
	};
	const handleSubmit = async (e) => {
		e.preventDefault();
		let access_token = getCookie("access_token");
		if (validCookie(access_token) === false) {
			access_token = await refreshToken();
		}
		const headers = {
			Authorization: `Bearer ${access_token}`,
		};
		const chatters = e.target.elements.chatters.value.split(", ");
		const topic = e.target.elements.topic.value;
		const response = api
			.post(
				"/api/create_chat",
				{ chatters: chatters, topic: topic },
				{ headers: headers }
			)
			.then(() => setNewChatMenu(false))
			.catch((e) => console.error("error: ", e));
	};
	return (
		<div className="popup-container">
			<div className="popup-menu border">
				<div className="popup">
					<div className="popup-header">
						<h1>New Chat</h1>
					</div>
					<div className="popup-body">
						<form
							className="popup-body-content"
							onSubmit={handleSubmit}
						>
							<div className="popup-input-container">
								<div className="popup-input">
									<input
										name="chatters"
										type="text"
										placeholder="with..."
										onChange={getMatchingUsers}
									/>
								</div>
							</div>
							<div className="popup-input-container">
								<div className="popup-input">
									<input
										name="topic"
										type="text"
										placeholder="talk about..."
									/>
								</div>
							</div>
							<div className="popup-body-content-item">
								<button
									className="popup-body-content-item-button"
									type="submit"
								>
									Create Chat
								</button>
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>
	);
}

export default NewChatMenu;
