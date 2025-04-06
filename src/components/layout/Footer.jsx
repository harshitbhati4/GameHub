import { Container, Navbar } from 'react-bootstrap';

const Footer = () => {
  return (
    <Navbar bg="dark" variant="dark" fixed="bottom" className="mt-5">
      <Container className="justify-content-center">
        <Navbar.Text>
          © {new Date().getFullYear()} GameHub - Powered by RAWG API
        </Navbar.Text>
      </Container>
    </Navbar>
  );
};

export default Footer;