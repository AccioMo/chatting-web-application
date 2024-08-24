import { useNavigate } from "react-router";
import { api, refreshToken } from "./Auth/Auth.tsx";
import { getCookie, validCookie } from "./Auth/Cookies";
import "../styles/AIChatPage.css";

function AIWelcomePage() {
	const nav = useNavigate();
	const handleClick = async () => {
		let access_token = getCookie("access_token");
		if (validCookie(access_token) === false) {
			access_token = await refreshToken();
		}
		const headers = {
			Authorization: `Bearer ${access_token}`,
		};
		const payload = {
			with: "AI",
		};
		api.post("/api/get_user_chats", payload, {
			headers: headers,
		})
			.then((chats) => {
				nav(`/chat-with-ai/${chats.data.chats[0].id}`);
				return;
			})
			.catch((e) => {
				console.error(e);
				api.post(
					"api/create_chat",
					{ topic: "bot", chatters: ["AI"] },
					{ headers: headers }
				)
					.then((e) => {
						console.log("Chat created:", e.data);
						nav(`/chat-with-ai/${e.data.id}`);
					})
					.catch((e) => {
						console.error(e);
					});
			});
	};
	return (
		<div className="flex-page">
			<div onClick={() => handleClick()}>hello</div>
		</div>
	);
}

export default AIWelcomePage;
