import { useNavigate } from 'react-router';
import { deleteCookie } from './Cookies';
import '../styles/NavBar.css';

function NavBar() {
	const nav = useNavigate();
	const logOut = () => {
		try {
			deleteCookie('access_token');
			deleteCookie('refresh_token');
			nav('/login');
		} catch (error) {
			console.error('Logout error:', error);
		}
	}
  	return (
		<div className='navbar'>
			<div className='nav-item nav-brand' onClick={() => nav('/')}>La Balena Seguena</div>
			<div className='nav-item' onClick={() => nav('/home')}>Home</div>
			<div className='nav-item' onClick={() => nav('/profile')}>Profile</div>
			<div className='nav-item' onClick={() => nav('/chats')}>Chats</div>
			<div className='nav-item' onClick={() => nav('/about')}>About</div>
			<div className='nav-item' onClick={() => nav('/contact')}>Contact</div>
			<div className='nav-item' onClick={logOut}>Sign Out</div>
		</div>
  	);
}

export default NavBar;