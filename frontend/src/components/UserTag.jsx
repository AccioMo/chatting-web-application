import { useNavigate } from "react-router";

function UserTag( { username } ) {
	const nav = useNavigate();
	return (
		<div className="chat-chatter" onClick={() => nav(`/users/${username}`)}>
			{username}
		</div>
	);
}

export default UserTag;
