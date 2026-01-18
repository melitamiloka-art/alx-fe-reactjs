import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav
      style={{
        padding: '15px',
        backgroundColor: '#333',
        display: 'flex',
        gap: '20px',
        justifyContent: 'space-between' 
      }}
    >
      <Link style={{ color: 'white', textDecoration: 'none' }} to="/">Home</Link>
      <Link style={{ color: 'white', textDecoration: 'none' }} to="/about">About</Link>
      <Link style={{ color: 'white', textDecoration: 'none' }} to="/services">Services</Link>
      <Link style={{ color: 'white', textDecoration: 'none' }} to="/contact">Contact</Link>
    </nav>
  );
}

export default Navbar;