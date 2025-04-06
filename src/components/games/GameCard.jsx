import { Card, Button, Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addToLibrary, removeFromLibrary } from '../../features/library/librarySlice';
import { useUser } from '@clerk/clerk-react';

const GameCard = ({ game }) => {
  const { isSignedIn } = useUser();
  const dispatch = useDispatch();
  const library = useSelector((state) => state.library.games);
  const isInLibrary = library.some((item) => item.id === game.id);

  const handleLibraryClick = () => {
    if (isInLibrary) {
      dispatch(removeFromLibrary(game.id));
    } else {
      dispatch(addToLibrary(game));
    }
  };

  return (
    <Card className="h-100">
      <Card.Img variant="top" src={game.background_image || '/placeholder-game.png'} />
      <Card.Body>
        <Card.Title>{game.name}</Card.Title>
        <div className="mb-2">
          {game.genres?.map((genre) => (
            <Badge key={genre.id} bg="secondary" className="me-1">
              {genre.name}
            </Badge>
          ))}
        </div>
        <Card.Text className="text-truncate">{game.description_raw || 'No description available'}</Card.Text>
        <div className="d-flex justify-content-between align-items-center">
          <Link to={`/game/${game.id}`} className="btn btn-primary btn-sm">
            Details
          </Link>
          {isSignedIn && (
            <Button
              variant={isInLibrary ? 'danger' : 'success'}
              size="sm"
              onClick={handleLibraryClick}
            >
              {isInLibrary ? 'Remove' : 'Save'}
            </Button>
          )}
        </div>
      </Card.Body>
      <Card.Footer>
        <small className="text-muted">
          Released: {new Date(game.released).toLocaleDateString()} | Rating: {game.rating}/5
        </small>
      </Card.Footer>
    </Card>
  );
};

export default GameCard;