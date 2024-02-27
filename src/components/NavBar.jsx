import '../styles/NavBar.css';
import PocketBase from 'pocketbase';
import { useNavigate } from 'react-router';

const pb = new PocketBase('http://127.0.0.1:8090');

function NavBar() {
	const nav = useNavigate();
	const logOut = () => {
		pb.authStore.clear();
		nav('/login');
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