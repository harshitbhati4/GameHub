import { Row, Col } from 'react-bootstrap';
import PropTypes from 'prop-types';
import GameCard from './GameCard';

const GameGrid = ({ games }) => {
  return (
    <Row xs={1} sm={2} md={3} lg={4} className="g-4 py-4">
      {games.map((game) => (
        <Col key={game.id}>
          <GameCard game={game} />
        </Col>
      ))}
    </Row>
  );
};

GameGrid.propTypes = {
  games: PropTypes.array.isRequired
};

export default GameGrid;