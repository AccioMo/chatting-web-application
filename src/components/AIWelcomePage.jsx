import { useNavigate } from "react-router";
import { api, refreshToken } from "./Auth/Auth.tsx";
import { getCookie, validCookie } from "./Auth/Cookies";
import "../styles/AIChatPage.css";
import { useEffect, useState, createContext } from "react";
import Icon from "./UI/Icons";
import NewBotMenu from "./NewBotMenu";

export const NewBotMenuContext = createContext();

function AIWelcomePage() {
	const nav = useNavigate();
	const [bots, setBots] = useState([]);
	const [createBotMenu, setCreateBotMenu] = useState(false);
	useEffect(() => {
		let access_token = getCookie("access_token");
		if (validCookie(access_token) === false) {
			access_token = refreshToken()
				.then((e) => {
					return e;
				})
				.catch((e) => {
					console.error(e);
				});
		}
		const headers = {
			Authorization: `Bearer ${access_token}`,
		};
		api.get("/api/get_bots", {
			headers: headers,
		})
			.then((chats) => {
				setBots(chats.data.bots);
			})
			.catch((e) => {
				console.error(e);
			});
	}, [bots]);

	const handleClick = async (bot_username) => {
		let access_token = getCookie("access_token");
		if (validCookie(access_token) === false) {
			access_token = await refreshToken();
		}
		const headers = {
			Authorization: `Bearer ${access_token}`,
		};
		api.post(
			"api/get_user_chats",
			{ with: bot_username },
			{ headers: headers }
		)
			.then((e) => {
				console.log("Chat found:", e.data);
				nav(`/chat-ai/${bot_username}/${e.data.chats[0].id}`);
			})
			.catch((e) => {
				api.post(
					"api/create_chat",
					{ ai: true, chatters: [bot_username] },
					{ headers: headers }
				)
					.then((e) => {
						console.log("Chat created:", e.data);
						nav(`/chat-ai/${bot_username}/${e.data.id}`);
					})
					.catch((e) => {
						console.error(e);
					});
			});
	};
	return (
		<div className="bot-page-container">
			<div className="bot-page">
				{bots.map((bot) => {
					return (
						<div className="bot-container">
							<div className="bot-outer-box">
								<div className="bot-picture">
									<img
										className="bot-img"
										fill="cover"
										src={
											"http://localhost:8000" +
											bot.picture
										}
										alt="bot"
									/>
								</div>
								<div className="bot-inner-box">
									<div className="bot-name-container">
										<div className="bot-name">
											{bot.username}
										</div>
									</div>
									<div className="bot-description-container">
										<div className="bot-description">
											{bot.description}
										</div>
									</div>
									<div className="corner-button">
										<div
											className="login-button"
											onClick={() =>
												handleClick(bot.username)
											}
										>
											Chat
										</div>
									</div>
								</div>
							</div>
						</div>
					);
				})}
				<div className="create-bot-container">
					<div className="home-door">
						<div className="home-icon">
							<Icon.Create
								onClick={() => setCreateBotMenu(true)}
							/>
						</div>
					</div>
					<NewBotMenuContext.Provider value={{ setCreateBotMenu }}>
						{createBotMenu ? <NewBotMenu /> : null}
					</NewBotMenuContext.Provider>
				</div>
			</div>
		</div>
	);
}

export default AIWelcomePage;
