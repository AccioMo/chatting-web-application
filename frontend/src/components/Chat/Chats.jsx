import React from 'react'

function Chats() {
	const [chats, setChats] = useState(null);
	// const access_token = getCookie("access_token");
	// const decodedToken = jwtDecode(access_token);
	// const uuid = decodedToken.uuid;
	useEffect(() => {
		const getChats = async (retry = 1) => {
			try {
				const headers = {
					Authorization: `Bearer ${getCookie("access_token")}`,
				};
				const chats = await api.get("/api/get_user_chats", {
					headers: headers,
				});
				return chats.data.chats;
			} catch (e) {
				if (e.response && e.response.status == 401 && retry > 0) {
					return refreshToken().then(() => getChats(retry - 1));
				} else {
					console.error("error: ", e);
				}
			}
		};
		if (chats === null) {
			getChats().then((chats) => {
				setChats(chats);
			});
		}
	}, [chats]);
	const newChat = async () => {
		try {
			const chat_data = {
				topic: "shit",
				username: "mzeggaf",
			};
			const response = await api.post("/api/create_chat", chat_data);
			setChats([ ...chats, response.data]);
		} catch (e) {
			console.log(e);
		}
	};
  return (
	<div className='chats-container'>
		{chats.map(chat => (
			<ChatContainer key={chat.id} chat={chat} />
			))}
	</div>
  )
}

export default Chats