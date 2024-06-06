import React, { useEffect, useState } from "react";
import { api, refreshToken } from "./Auth.tsx";
import { getCookie, validCookie } from "./Cookies";
import { useNavigate } from "react-router";
import "../styles/SideBar.css";

function SideBar( { my_user } ) {
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
		const users_record = getUsers().then((users) => {
			setUsers(users);
			console.log(users);
		});
	}, [users]);
	if (!getCookie("access_token")) return null;
	return (
		<div className="sidebar-container border">
			<div className="sidebar-box">
				<div className="users-search-bar-container">
					<input
						placeholder="Search users..."
						className="users-search-bar border"
						type="search"
					/>
				</div>
				<ul className="sidebar-items">
					{users
						? users.map((user) => {
							console.log("user: ", user.username);
							console.log("my-user: ", my_user.username);
								if (
									user.username ===
									my_user.username
								)
									return null;
								return (
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
								);
						  })
						: null}
				</ul>
			</div>
		</div>
	);
}

export default SideBar;
