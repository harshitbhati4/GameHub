import { Container, Card, Button } from 'react-bootstrap';
import { SignIn } from '@clerk/clerk-react';
import { Link } from 'react-router-dom';

const Login = () => {
  return (
    <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '80vh' }}>
      <Card style={{ width: '100%', maxWidth: '500px' }}>
        <Card.Body>
          <h2 className="text-center mb-4">Sign In</h2>
          <div className="d-flex justify-content-center mb-4">
            <SignIn routing="path" path="/login" />
          </div>
          <div className="text-center mt-3">
            <p>Don't have an account? <Link to="/signup">Sign up</Link></p>
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Login;