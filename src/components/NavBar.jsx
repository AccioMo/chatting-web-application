import '../styles/NavBar.css';

function NavBar() {
  return (
	<div className='navbar'>
		<div className='nav-item nav-brand' href="/home">La Balena Seguena</div>
		<div className='nav-item' href="/home">Home</div>
		<div className='nav-item' href="/profile">Profile</div>
		<div className='nav-item' href="/chats">Chats</div>
		<div className='nav-item' href="/about">About</div>
	</div>
  );
}

export default NavBar;