import { Container, Row, Col, Alert } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import GameCard from '../../components/games/GameCard';

const Library = () => {
  const library = useSelector((state) => state.library.games);

  return (
    <Container className="my-4">
      <h2 className="mb-4">My Game Library</h2>
      {library.length === 0 ? (
        <Alert variant="info">Your library is empty. Save some games to see them here!</Alert>
      ) : (
        <Row xs={1} sm={2} md={3} lg={4} className="g-4">
          {library.map((game) => (
            <Col key={game.id}>
              <GameCard game={game} />
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
};

export default Library;