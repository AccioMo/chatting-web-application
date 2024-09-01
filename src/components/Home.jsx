import "../styles/Home.css";

const Home = ({ authenticated }) => {
	return (
		<div className="page-content">
			<div className="home-container">
				<div className="welcome-container">
					<div className="welcome">{ authenticated ? "No friends? Buy 2 to get a third COMPLETLY FREE!" : "Looks like you're not signed in..." }</div>
				</div>
			</div>
		</div>
	);
};

export default Home;
