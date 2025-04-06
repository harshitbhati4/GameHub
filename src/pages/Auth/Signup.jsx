import { Container, Card, Button } from 'react-bootstrap';
import { SignUp } from '@clerk/clerk-react';
import { Link } from 'react-router-dom';

const Signup = () => {
  return (
    <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '80vh' }}>
      <Card style={{ width: '100%', maxWidth: '500px' }}>
        <Card.Body>
          <h2 className="text-center mb-4">Create Account</h2>
          <div className="d-flex justify-content-center mb-4">
            <SignUp routing="path" path="/signup" />
          </div>
          <div className="text-center mt-3">
            <p>Already have an account? <Link to="/login">Sign in</Link></p>
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Signup;