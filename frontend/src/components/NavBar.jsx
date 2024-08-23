import { useNavigate } from 'react-router';
import { useContext } from 'react';
import { AuthContext } from './Auth/Auth.tsx';
import { getCookie, deleteCookie } from './Auth/Cookies.jsx';
import '../styles/NavBar.css';

function NavBar() {
	const { setIsAuthenticated } = useContext(AuthContext);
	const nav = useNavigate();
	const logOut = () => {
		try {
			deleteCookie('access_token');
			deleteCookie('refresh_token');
			deleteCookie('user');
			setIsAuthenticated(false);
			nav('/login');
		} catch (error) {
			console.error('Logout error:', error);
		}
	};
	const userdata = getCookie('user');
	const username = userdata ? JSON.parse(userdata).username : 'anonymous';
  	return (
		<div className='navbar-container'>
			<div className='navbar border'>
				<div className='nav-item nav-brand' onClick={() => nav('/')}>Logo</div>
				<ul className='nav-items-array'>
					<div className='nav-item accent-on-hover' onClick={() => nav('/chat-with-human')}>Chat with Human</div>
					<div className='nav-item accent-on-hover' onClick={() => nav('/chat-with-ai')}>Chat with AI</div>
				</ul>
				<div className='username-item accent-on-hover' onClick={logOut}>{username}</div>
			</div>
		</div>
  	);
}

export default NavBar;