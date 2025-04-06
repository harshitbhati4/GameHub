import { Container, Navbar, Form, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { UserButton, useUser } from '@clerk/clerk-react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { fetchGames } from '../../features/games/gamesSlice';

const Header = () => {
  const { isSignedIn } = useUser();
  const [searchQuery, setSearchQuery] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    dispatch(fetchGames({ search: searchQuery }));
    navigate('/');
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/">GameHub</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Form className="d-flex ms-auto me-3" onSubmit={handleSearch}>
            <Form.Control
              type="search"
              placeholder="Search games..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Button variant="outline-light" type="submit">Search</Button>
          </Form>
          {isSignedIn ? (
            <div className="d-flex align-items-center">
              <Link to="/library" className="btn btn-outline-light me-2">
                My Library
              </Link>
              <UserButton />
            </div>
          ) : (
            <Link to="/login" className="btn btn-outline-light">
              Sign In
            </Link>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;