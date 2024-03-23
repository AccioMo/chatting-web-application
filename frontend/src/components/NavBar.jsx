import '../styles/NavBar.css';
import axios from 'axios';
import { useNavigate } from 'react-router';

function NavBar() {
	const nav = useNavigate();
	const logOut = () => {
		try {
			localStorage.removeItem('access_token');
			localStorage.removeItem('refresh_token');
			nav('/login');
		} catch (error) {
			console.error('Logout error:', error);
		}
	}
  	return (
		<div className='navbar'>
			<div className='nav-item nav-brand' href="/home">La Balena Seguena</div>
			<div className='nav-item' href="/home">Home</div>
			<div className='nav-item' href="/profile">Profile</div>
			<div className='nav-item' href="/chats">Chats</div>
			<div className='nav-item' href="/about">About</div>
			<div className='nav-item' href="/contact">Contact</div>
			<div className='nav-item' onClick={logOut} href="/login">Sign Out</div>
		</div>
  	);
}

export default NavBar;