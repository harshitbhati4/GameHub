import { Container, Row, Col, Image, Spinner, Alert, Button, Tab, Tabs, Badge, ListGroup } from 'react-bootstrap';
import { useParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addToLibrary, removeFromLibrary } from '../../features/library/librarySlice';
import { useUser } from '@clerk/clerk-react';
import { useGetGameDetailsQuery, useGetGameScreenshotsQuery, useGetGameSeriesQuery } from '../../features/games/gamesApi';
import Loader from '../../components/common/Loader';
import ErrorMessage from '../../components/common/ErrorMessage';

const GameDetails = () => {
  const { id } = useParams();
  const { isSignedIn } = useUser();
  const dispatch = useDispatch();
  const library = useSelector((state) => state.library.games);
  const isInLibrary = library.some((item) => item.id === parseInt(id));

  const { 
    data: game, 
    isLoading: isLoadingGame, 
    error: gameError 
  } = useGetGameDetailsQuery(id);

  const { 
    data: screenshots, 
    isLoading: isLoadingScreenshots, 
    error: screenshotsError 
  } = useGetGameScreenshotsQuery(id);

  const { 
    data: series, 
    isLoading: isLoadingSeries, 
    error: seriesError 
  } = useGetGameSeriesQuery(id);

  const handleLibraryClick = () => {
    if (isInLibrary) {
      dispatch(removeFromLibrary(parseInt(id)));
    } else {
      dispatch(addToLibrary(game));
    }
  };

  if (isLoadingGame) return <Loader />;
  if (gameError) return <ErrorMessage message={gameError} />;

  return (
    <Container className="my-4">
      <Row>
        <Col md={4}>
          <Image src={game.background_image} fluid rounded className="mb-3" />
          <div className="d-flex flex-wrap gap-2 mb-3">
            {isSignedIn && (
              <Button
                variant={isInLibrary ? 'danger' : 'success'}
                onClick={handleLibraryClick}
                className="me-2"
              >
                {isInLibrary ? 'Remove from Library' : 'Add to Library'}
              </Button>
            )}
            {game.website && (
              <Button 
                as="a" 
                href={game.website} 
                target="_blank" 
                rel="noopener noreferrer"
                variant="outline-primary"
              >
                Official Website
              </Button>
            )}
          </div>

          <div className="mb-4">
            <h4>Details</h4>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <strong>Released:</strong> {new Date(game.released).toLocaleDateString()}
              </ListGroup.Item>
              <ListGroup.Item>
                <strong>Rating:</strong> {game.rating}/5 ({game.ratings_count} ratings)
              </ListGroup.Item>
              <ListGroup.Item>
                <strong>Metacritic:</strong> {game.metacritic ? (
                  <Badge bg={game.metacritic >= 75 ? 'success' : game.metacritic >= 50 ? 'warning' : 'danger'}>
                    {game.metacritic}
                  </Badge>
                ) : 'N/A'}
              </ListGroup.Item>
              <ListGroup.Item>
                <strong>Playtime:</strong> {game.playtime} hours
              </ListGroup.Item>
            </ListGroup>
          </div>

          {game.platforms && (
            <div className="mb-4">
              <h5>Platforms</h5>
              <div className="d-flex flex-wrap gap-2">
                {game.platforms.map((p) => (
                  <Badge key={p.platform.id} bg="secondary">
                    {p.platform.name}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {game.genres && (
            <div className="mb-4">
              <h5>Genres</h5>
              <div className="d-flex flex-wrap gap-2">
                {game.genres.map((g) => (
                  <Badge key={g.id} bg="info">
                    {g.name}
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </Col>

        <Col md={8}>
          <h1>{game.name}</h1>
          
          <Tabs defaultActiveKey="description" className="mb-3">
            <Tab eventKey="description" title="Description">
              <div 
                className="game-description" 
                dangerouslySetInnerHTML={{ __html: game.description }} 
              />
            </Tab>

            <Tab eventKey="screenshots" title="Screenshots">
              {isLoadingScreenshots ? (
                <Loader size="sm" />
              ) : screenshotsError ? (
                <ErrorMessage message={screenshotsError} />
              ) : (
                <Row>
                  {screenshots.results.map((screenshot) => (
                    <Col key={screenshot.id} xs={6} md={4} className="mb-3">
                      <Image 
                        src={screenshot.image} 
                        fluid 
                        rounded 
                        className="screenshot-img"
                      />
                    </Col>
                  ))}
                </Row>
              )}
            </Tab>

            <Tab eventKey="series" title="Game Series">
              {isLoadingSeries ? (
                <Loader size="sm" />
              ) : seriesError ? (
                <ErrorMessage message={seriesError} />
              ) : series.results.length > 0 ? (
                <Row>
                  {series.results.slice(0, 6).map((game) => (
                    <Col key={game.id} sm={6} md={4} className="mb-3">
                      <Link to={`/game/${game.id}`} className="text-decoration-none">
                        <Card className="h-100">
                          <Card.Img variant="top" src={game.background_image || '/placeholder-game.png'} />
                          <Card.Body>
                            <Card.Title>{game.name}</Card.Title>
                            <Card.Text className="text-muted">
                              Rating: {game.rating}/5
                            </Card.Text>
                          </Card.Body>
                        </Card>
                      </Link>
                    </Col>
                  ))}
                </Row>
              ) : (
                <Alert variant="info">No related games found</Alert>
              )}
            </Tab>
          </Tabs>
        </Col>
      </Row>
    </Container>
  );
};

export default GameDetails;