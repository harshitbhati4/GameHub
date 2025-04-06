import { Form, Accordion, Button } from 'react-bootstrap';

const Sidebar = ({ filters, setFilters }) => {
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  const clearFilters = () => {
    setFilters({
      genres: '',
      tags: '',
      dates: '',
      ordering: ''
    });
  };

  return (
    <div className="p-3">
      <h5>Filters</h5>
      <Accordion defaultActiveKey="0" flush>
        <Accordion.Item eventKey="0">
          <Accordion.Header>Genres</Accordion.Header>
          <Accordion.Body>
            <Form.Select
              name="genres"
              value={filters.genres}
              onChange={handleFilterChange}
            >
              <option value="">All Genres</option>
              <option value="4">Action</option>
              <option value="3">Adventure</option>
              <option value="5">RPG</option>
              <option value="2">Shooter</option>
              <option value="7">Puzzle</option>
            </Form.Select>
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="1">
          <Accordion.Header>Tags</Accordion.Header>
          <Accordion.Body>
            <Form.Select
              name="tags"
              value={filters.tags}
              onChange={handleFilterChange}
            >
              <option value="">All Tags</option>
              <option value="7">Singleplayer</option>
              <option value="1">Multiplayer</option>
              <option value="17">Co-op</option>
              <option value="19">Online Co-op</option>
            </Form.Select>
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="2">
          <Accordion.Header>Release Year</Accordion.Header>
          <Accordion.Body>
            <Form.Select
              name="dates"
              value={filters.dates}
              onChange={handleFilterChange}
            >
              <option value="">All Years</option>
              <option value="2020-01-01,2023-12-31">2020-2023</option>
              <option value="2010-01-01,2019-12-31">2010-2019</option>
              <option value="2000-01-01,2009-12-31">2000-2009</option>
            </Form.Select>
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="3">
          <Accordion.Header>Sort By</Accordion.Header>
          <Accordion.Body>
            <Form.Select
              name="ordering"
              value={filters.ordering}
              onChange={handleFilterChange}
            >
              <option value="">Default</option>
              <option value="-rating">Highest Rated</option>
              <option value="-released">Newest Releases</option>
              <option value="name">A-Z</option>
              <option value="-name">Z-A</option>
            </Form.Select>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
      <Button variant="outline-secondary" className="mt-3 w-100" onClick={clearFilters}>
        Clear Filters
      </Button>
    </div>
  );
};

export default Sidebar;