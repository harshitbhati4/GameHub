import { Button as BootstrapButton } from 'react-bootstrap';
import PropTypes from 'prop-types';

const Button = ({ children, variant = 'primary', size, className, icon, ...props }) => {
  return (
    <BootstrapButton
      variant={variant}
      size={size}
      className={`d-flex align-items-center ${className}`}
      {...props}
    >
      {icon && <span className="me-2">{icon}</span>}
      {children}
    </BootstrapButton>
  );
};

Button.propTypes = {
  children: PropTypes.node.isRequired,
  variant: PropTypes.string,
  size: PropTypes.string,
  className: PropTypes.string,
  icon: PropTypes.node
};

export default Button;