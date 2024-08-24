import { useState } from 'react'

function ChatInput({ onSend }) {
	const [value, setValue] = useState("");
	const handleKeyDown = (event) => {
		if (event.key === "Enter") {
			event.preventDefault();
			const message = event.target.value;
			if (message === "") return ;
			setValue("");
			onSend(message);
		}
	};
  return (
	<div className="container-of-container">
		<div className="input-container border">
			<textarea
				className="input-box"
				value={value}
				onChange={(e) => setValue(e.target.value)}
				onKeyDown={handleKeyDown}
			/>
		</div>
	</div>
  )
}

export default ChatInput