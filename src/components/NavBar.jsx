import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import '../styles/NavBar.css';

function NavBar() {
  return (
    <>
      <Navbar className='navbar'>
        <Container>
          <Nav>
          	<Navbar.Brand className='nav-item' href="/home">Chat App</Navbar.Brand>
            <Nav.Link className='nav-item' href="/home">Home</Nav.Link>
            <Nav.Link className='nav-item' href="/chats">Chats</Nav.Link>
            <Nav.Link className='nav-item' href="/about">About</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
}

export default NavBar;