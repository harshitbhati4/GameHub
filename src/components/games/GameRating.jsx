import { ProgressBar, Badge } from 'react-bootstrap';
import PropTypes from 'prop-types';

const GameRating = ({ rating, ratingsCount }) => {
  const normalizedRating = Math.min(5, Math.max(0, rating));
  const percentage = (normalizedRating / 5) * 100;

  return (
    <div className="mb-2">
      <div className="d-flex justify-content-between align-items-center mb-1">
        <Badge bg="warning" text="dark">
          {normalizedRating.toFixed(1)}/5
        </Badge>
        <small className="text-muted">{ratingsCount} ratings</small>
      </div>
      <ProgressBar 
        now={percentage} 
        variant="warning" 
        style={{ height: '6px' }} 
      />
    </div>
  );
};

GameRating.propTypes = {
  rating: PropTypes.number.isRequired,
  ratingsCount: PropTypes.number.isRequired
};

export default GameRating;