import "../styles/SubmitButton.css";

function SubmitButton({ children, ...props }) {
	return (
		<div className="submit-button-outer">
			<div className="submit-button-inner">
				<button {...props} className="submit-button" type="submit">{children}</button>
			</div>
		</div>
	);
}

export default SubmitButton;
