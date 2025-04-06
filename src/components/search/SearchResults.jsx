import { Alert } from 'react-bootstrap';
import PropTypes from 'prop-types';

const SearchResults = ({ query, count, className }) => {
  if (!query) return null;

  return (
    <Alert variant="info" className={className}>
      {count > 0 ? (
        <>
          Found <strong>{count}</strong> results for "<strong>{query}</strong>"
        </>
      ) : (
        <>
          No results found for "<strong>{query}</strong>"
        </>
      )}
    </Alert>
  );
};

SearchResults.propTypes = {
  query: PropTypes.string,
  count: PropTypes.number,
  className: PropTypes.string
};

export default SearchResults;