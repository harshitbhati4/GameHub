import { Spinner } from 'react-bootstrap';

const Loader = ({ size = 'md' }) => {
  const sizes = {
    sm: { width: '1.5rem', height: '1.5rem' },
    md: { width: '3rem', height: '3rem' },
    lg: { width: '5rem', height: '5rem' }
  };

  return (
    <div className="d-flex justify-content-center align-items-center my-5">
      <Spinner 
        animation="border" 
        role="status" 
        style={sizes[size]}
      >
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    </div>
  );
};

export default Loader;