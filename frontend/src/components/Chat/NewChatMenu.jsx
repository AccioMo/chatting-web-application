import { useState, useContext, useRef } from "react";
import { NewChatMenuContext } from "./CommonChatsPage";
import { api, refreshToken } from "../Auth/Auth.tsx";
import { getCookie, validCookie } from "../Auth/Cookies.jsx";
import SearchUsersInput from "../Other/SearchUsersInput.jsx";
import "../../styles/PopupMenu.css";

function NewChatMenu() {
	const topicRef = useRef();
	const { newChatMenu, setNewChatMenu } = useContext(NewChatMenuContext);

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
		<div
			className="popup-container"
			onClick={(e) => {
				if (e.target.className == "popup-container")
					setNewChatMenu(false);
			}}
		>
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
							<SearchUsersInput />
							<div className="popup-input-container" onClick={() => topicRef.current.focus()}>
								<div className="popup-input">
									<input
										ref={topicRef}
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
