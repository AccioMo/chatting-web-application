import { useContext } from "react";
import { useForm } from "react-hook-form";
import { NewBotMenuContext } from "./AIWelcomePage";
import { api, refreshToken } from "./Auth/Auth.tsx";
import { getCookie, validCookie } from "./Auth/Cookies.jsx";
import SubmitButton from "./SubmitButton.jsx";
import "../styles/PopupMenu.css";

function NewBotMenu() {
	const { setCreateBotMenu } = useContext(NewBotMenuContext);
	const { register, handleSubmit } = useForm();
	const registerBot = async (data) => {
		let access_token = getCookie("access_token");
		if (validCookie(access_token) === false) {
			access_token = await refreshToken();
		}
		const headers = {
			Authorization: `Bearer ${access_token}`,
		};
		const payload = { 
			username: data.username,
			description: data.description
		 };
		api
			.post(
				"/api/create_bot",
				payload,
				{ headers: headers }
			)
			.then(() => setCreateBotMenu(false))
			.catch((e) => console.error("error: ", e));
	};
	return (
		<div
			className="popup-container"
			onClick={(e) => {
				if (e.target.className === "popup-container")
					setCreateBotMenu(false);
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
							onSubmit={handleSubmit(registerBot)}
						>
							<div className="popup-input-container" >
								<div className="popup-input">
									<input
										name="topic"
										type="text"
										placeholder="Name your bot..."
										{...register("username")}
									/>
								</div>
								<div className="popup-input">
									<input
										name="topic"
										type="text"
										placeholder="What is your bot about?"
										{...register("description")}
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

export default NewBotMenu;
