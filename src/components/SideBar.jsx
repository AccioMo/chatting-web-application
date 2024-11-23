import { useEffect, useState } from "react";
import { api, refreshToken } from "./Auth/Auth.tsx";
import { getCookie, validCookie } from "./Auth/Cookies.jsx";
import { useNavigate } from "react-router";
import "../styles/SideBar.css";

function SideBar({ my_user }) {
	const nav = useNavigate();
	const [users, setUsers] = useState([]);
	useEffect(() => {
		const getUsers = async () => {
			let access_token = getCookie("access_token");
			if (!access_token) return [];
			if (validCookie(access_token) === false) {
				access_token = await refreshToken();
			}
			const payload = {
				query_by: "all",
			};
			const headers = {
				Authorization: `Bearer ${getCookie("access_token")}`,
			};
			const users = await api.post("/api/get_users", payload, {
				headers: headers,
			});
			if (users.data.success === false) {
				console.error(users.data.message);
				return [];
			}
			return users.data.users;
		};
		if (users.length > 0) return;
		getUsers().then((users) => {
			setUsers(users);
		});
	}, [users]);
	if (!getCookie("access_token")) return null;
	return (
		<div className="sidebar-container">
				<div className="users-search-bar-container">
					<input
						placeholder="Search users..."
						className="users-search-bar"
						type="search"
					/>
				</div>
				<ul className="sidebar-items">
					{users
						? users.map((user) => {
								return user?.username !== my_user?.username ? (
									<li
										key={user.uuid}
										className="sidebar-element-container"
									>
										<div
											className="sidebar-element accent-on-hover"
											onClick={() =>
												nav(`/users/${user.username}`)
											}
										>
											{user.username}
										</div>
									</li>
								) : null;
						  })
						: null}
				</ul>
		</div>
	);
}

export default SideBar;
