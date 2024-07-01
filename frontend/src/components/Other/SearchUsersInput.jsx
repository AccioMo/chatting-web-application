import { useState, createContext, useRef, useEffect } from "react";
import AutoComplete from "../AutoComplete.jsx";
import { getCookie, validCookie } from "../Auth/Cookies.jsx";
import { refreshToken, api } from "../Auth/Auth.tsx";

export const AutoCompleteContext = createContext(null);

function SearchUsersInput() {
	const withRef = useRef();
	const [matchingUsers, setMatchingUsers] = useState([]);
	const [value, setValue] = useState("");
	useEffect(() => {
		withRef.current.focus();
	}, []);
	const handleChange = (e) => {
		setValue(e.target.value);
		if (e.target.value.length > 0) {
			const users = e.target.value.split(" ");
			getMatchingUsers(users[users.length - 1]);
		} else setMatchingUsers([]);
	};
	const handleKeyDown = (event) => {
		if (
			(event.key === "Enter" ||
				event.key === "ArrowRight" ||
				event.key === "Tab") &&
				matchingUsers.length > 0
		) {
			event.preventDefault();
			const message = event.target.value;
			const previousMatches = value.split(" ").slice(0, -1).join(" ");
			if (message !== "" && matchingUsers[0] !== "") {
				if (previousMatches) setValue(previousMatches + " " + matchingUsers[0] + " ");
				else setValue(matchingUsers[0] + " ");
				setMatchingUsers([]);
			}
		}
	};
	const getMatchingUsers = async (username) => {
		if (username === "") return;
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
				{ query_by: "username", query: username },
				{ headers: headers }
			)
			.then((response) => {
				if (response.data.users.length === 0) setMatchingUsers([]);
				else
					setMatchingUsers(
						response.data.users.map((e) => {
							return e.username;
						})
					);
				console.log("matching user: ", matchingUsers);
			})
			.catch((e) => console.error("error: ", e));
	};
	return (
		<div
			className="popup-input-container"
			onClick={() => withRef.current.focus()}
		>
			<div className="popup-input">
				<input
					ref={withRef}
					name="chatters"
					type="text"
					placeholder="with..."
					value={value}
					onChange={(e) => handleChange(e)}
					onKeyDown={(e) => handleKeyDown(e)}
				/>
				<AutoCompleteContext.Provider value={{ value, setValue }}>
					{matchingUsers?.length > 0 && value && (
						<AutoComplete match={matchingUsers[0]} />
					)}
				</AutoCompleteContext.Provider>
			</div>
		</div>
	);
}

export default SearchUsersInput;
