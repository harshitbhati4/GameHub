import { Form, InputGroup, Button } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { FaSearch, FaTimes } from 'react-icons/fa';

const SearchBar = ({ initialValue = '', onSearch, className }) => {
  const [query, setQuery] = useState(initialValue);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (query !== initialValue) {
        onSearch(query);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [query, initialValue, onSearch]);

  const clearSearch = () => {
    setQuery('');
    onSearch('');
  };

  return (
    <Form className={className}>
      <InputGroup>
        <Form.Control
          type="search"
          placeholder="Search games..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          aria-label="Search games"
        />
        {query ? (
          <Button variant="outline-secondary" onClick={clearSearch}>
            <FaTimes />
          </Button>
        ) : (
          <Button variant="outline-secondary">
            <FaSearch />
          </Button>
        )}
      </InputGroup>
    </Form>
  );
};

SearchBar.propTypes = {
  initialValue: PropTypes.string,
  onSearch: PropTypes.func.isRequired,
  className: PropTypes.string
};

export default SearchBar;