import { useNavigate } from 'react-router';
import { getCookie, deleteCookie } from './Cookies';
import '../styles/NavBar.css';

function NavBar() {
	const nav = useNavigate();
	const logOut = () => {
		try {
			deleteCookie('access_token');
			deleteCookie('refresh_token');
			deleteCookie('user');
			nav('/login');
		} catch (error) {
			console.error('Logout error:', error);
		}
	};
	const userdata = getCookie('user');
	const username = userdata ? JSON.parse(userdata).user : 'anonymous';
  	return (
		<div className='navbar-container'>
			<div className='navbar border'>
				<div className='nav-item nav-brand' onClick={() => nav('/')}>Logo</div>
				<ul className='nav-items-array'>
					<div className='nav-item accent-on-hover' onClick={() => nav('/chats')}>Chat with Human</div>
					<div className='nav-item accent-on-hover' onClick={() => nav('/chats')}>Chat with AI</div>
				</ul>
				<div className='username-item accent-on-hover' onClick={logOut}>{username}</div>
			</div>
		</div>
  	);
}

export default NavBar;