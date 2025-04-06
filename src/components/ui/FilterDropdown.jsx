import { Dropdown, Form } from 'react-bootstrap';
import PropTypes from 'prop-types';

const FilterDropdown = ({ 
  title, 
  options, 
  selectedValue, 
  onSelect, 
  className 
}) => {
  return (
    <Dropdown className={className}>
      <Dropdown.Toggle variant="outline-secondary" className="w-100">
        {title}: {selectedValue || 'All'}
      </Dropdown.Toggle>
      <Dropdown.Menu className="p-2" style={{ width: '250px' }}>
        <Form>
          {options.map((option) => (
            <Form.Check
              key={option.value}
              type="radio"
              id={`filter-${option.value}`}
              label={option.label}
              name="filterGroup"
              checked={selectedValue === option.value}
              onChange={() => onSelect(option.value)}
              className="mb-2"
            />
          ))}
        </Form>
      </Dropdown.Menu>
    </Dropdown>
  );
};

FilterDropdown.propTypes = {
  title: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired
    })
  ).isRequired,
  selectedValue: PropTypes.string,
  onSelect: PropTypes.func.isRequired,
  className: PropTypes.string
};

export default FilterDropdown;