import { useNavigate } from "react-router";
import "../styles/Home.css";

const Home = ({ authenticated }) => {
	const nav = useNavigate();
    return (
        <div className="page-content">
            <div className="home-container">
                <div className="welcome-container">
                    {authenticated ? (
                        <div className="welcome">
                            Get started by choosing a user from the sidebar and
                            starting a chat!
                        </div>
                    ) : (
                        <div className="welcome">
                            Looks like you're not signed in...
                            <div className="flex-center">
                                <button className="bubble-button" onClick={() => nav('/join')}>
                                    Sign up
                                </button>
                                <button className="bubble-button" onClick={() => nav('/login')}>Login</button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Home;
