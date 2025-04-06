import { Alert } from 'react-bootstrap';

const ErrorMessage = ({ message, onRetry }) => {
  return (
    <Alert variant="danger" className="my-4">
      <div className="d-flex justify-content-between align-items-center">
        <span>{message}</span>
        {onRetry && (
          <button 
            onClick={onRetry} 
            className="btn btn-sm btn-outline-danger"
          >
            Retry
          </button>
        )}
      </div>
    </Alert>
  );
};

export default ErrorMessage;