import { Container, Row, Col, Spinner, Alert, Button } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchGames } from '../../features/games/gamesSlice';
import GameCard from '../../components/games/GameCard';
import Sidebar from '../../components/layout/Sidebar';

const Home = () => {
  const dispatch = useDispatch();
  const { games, status, error, next } = useSelector((state) => state.games);
  const [filters, setFilters] = useState({
    genres: '',
    tags: '',
    dates: '',
    ordering: ''
  });

  useEffect(() => {
    dispatch(fetchGames({ filters }));
  }, [dispatch, filters]);

  const handleLoadMore = () => {
    if (next) {
      const nextPage = new URL(next).searchParams.get('page');
      dispatch(fetchGames({ page: nextPage, filters }));
    }
  };

  if (status === 'loading' && games.length === 0) {
    return (
      <Container className="text-center mt-5">
        <Spinner animation="border" />
      </Container>
    );
  }

  if (status === 'failed') {
    return (
      <Container className="mt-5">
        <Alert variant="danger">{error}</Alert>
      </Container>
    );
  }

  return (
    <Container fluid>
      <Row>
        <Col md={3} lg={2} className="d-none d-md-block">
          <Sidebar filters={filters} setFilters={setFilters} />
        </Col>
        <Col md={9} lg={10}>
          <Row xs={1} sm={2} md={3} lg={4} className="g-4 py-4">
            {games.map((game) => (
              <Col key={game.id}>
                <GameCard game={game} />
              </Col>
            ))}
          </Row>
          {next && (
            <div className="text-center mb-4">
              <Button onClick={handleLoadMore} disabled={status === 'loading'}>
                {status === 'loading' ? 'Loading...' : 'Load More'}
              </Button>
            </div>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default Home;