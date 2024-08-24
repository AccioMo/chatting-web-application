import { useEffect, useState, useContext } from "react";
import { api, refreshToken } from "../Auth/Auth.tsx";
import { getCookie, validCookie } from "../Auth/Cookies.jsx";
import { NewChatMenuContext } from "../Chat/CommonChatsPage.jsx";
import profilePicture from "../../images/profile.png"

function Profile({ username }) {
	const { setNewChatMenu } = useContext(NewChatMenuContext);
	const [profile, setProfile] = useState(null);
	useEffect(() => {
		const getUserInfo = async () => {
			let access_token = getCookie("access_token");
			if (!access_token) return [];
			if (validCookie(access_token) === false) {
				access_token = await refreshToken();
			}
			const headers = {
				Authorization: `Bearer ${access_token}`,
			};
			const user_data = await api.post(
				`/api/get_user_info`,
				{ username: username },
				{ headers: headers }
			);
			return user_data.data.user;
		};
		getUserInfo()
			.then((user_data) => {
				setProfile(user_data);
			})
			.catch((e) => {
				console.error("error: ", e);
			});
	}, [username]);
	return (
		<div className="profile-container">
			<div className="profile-header border">
				<div className="banner-top">
					<div className="banner-picture"></div>
				</div>
				<div className="round-picture profile-picture-container">
					<img
						className="profile-picture"
						src={profilePicture}
						alt="profile"
						width={"128px"}
						height={"128px"}
					/>
				</div>
				<div className="banner-bottom">
					<div className="profile-info-container">
						<div className="profile-username">
							<h3>{username}</h3>
						</div>
						<div className="profile-info">
							{profile?.first_name + " " + profile?.last_name}
						</div>
					</div>
					<div className="profile-actions">
						<div className="profile-action-container">
							<div
								className="profile-action-button border"
								onClick={() => setNewChatMenu(true)}
							>
								New Chat
							</div>
						</div>
						<div className="profile-action-container">
							<div className="profile-action-button border">
								Add Friend
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Profile;
