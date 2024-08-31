import { useContext, useRef } from "react";
import { NewChatMenuContext } from "./CommonChatsPage";
import { api, refreshToken } from "../Auth/Auth.tsx";
import { getCookie, validCookie } from "../Auth/Cookies.jsx";
import SearchUsersInput from "../Other/SearchUsersInput.jsx";
import SubmitButton from "../SubmitButton.jsx";
import "../../styles/PopupMenu.css";

function NewChatMenu({ chatWith }) {
	const topicRef = useRef();
	const { setNewChatMenu } = useContext(NewChatMenuContext);

	const handleSubmit = async (e) => {
		e.preventDefault();
		let access_token = getCookie("access_token");
		if (validCookie(access_token) === false) {
			access_token = await refreshToken();
		}
		const headers = {
			Authorization: `Bearer ${access_token}`,
		};
		const chatters = e.target.elements.chatters.value.trim().split(" ");
		const topic = e.target.elements.topic.value;
		api
			.post(
				"/api/create_chat",
				{ chatters: chatters, topic: topic, bot: false },
				{ headers: headers }
			)
			.then(() => setNewChatMenu(false))
			.catch((e) => console.error("error: ", e));
	};
	return (
		<div
			className="popup-container"
			onClick={(e) => {
				if (e.target.className === "popup-container")
					setNewChatMenu(false);
			}}
		>
			<div className="popup-menu">
				<div className="popup">
					<div className="popup-header">
						<h1>New Chat</h1>
					</div>
					<div className="popup-body">
						<form
							className="popup-body-content"
							onSubmit={handleSubmit}
						>
							<SearchUsersInput defaultValue={chatWith} />
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
								<SubmitButton />
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>
	);
}

export default NewChatMenu;
