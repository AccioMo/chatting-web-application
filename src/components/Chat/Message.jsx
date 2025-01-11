import React, { forwardRef } from "react";
import { getCookie } from "../Auth/Cookies";
import ReactMarkdown from 'react-markdown'
import "../../styles/Message.css";

const Message = forwardRef((props, ref) => {
	const { sender, content } = props;
	const user = getCookie("user");
	const username = user ? JSON.parse(user).username : null;
	const isUser = (sender) => {
		if (sender === username) {
			return true;
		} else {
			return false;
		}
	};
	return (
		<div
			ref={ref}
			className={`${isUser(sender) ? "right" : "left"} message-outer-box`}
		>
			<div
				className={` ${
					isUser(sender) ? "sender-me" : "sender-other"
				} shadow message-inner-box`}
			>
				<div className="message-content-box">
					<div className="message-content">
						<ReactMarkdown>{content}</ReactMarkdown>
					</div>
				</div>
				<div className="message-meta">
					<div className="message-sender">{sender}</div>
				</div>
			</div>
		</div>
	);
});

export default Message;
