import React from 'react';
import PropTypes from 'prop-types'; // For prop type validation

const Text = ({
  tag = 'p', // Default tag is <p>
  children,
  className,
  style,
  color,
  ...rest
}) => {
  // Valid HTML tags for the Text component
  const Component = tag;

  return (
    <Component
      className={className}
      style={{ color, ...style }} // Apply color and additional styles if provided
      {...rest}
    >
      {children}
    </Component>
  );
};

// Prop validation
Text.propTypes = {
  tag: PropTypes.oneOf(['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'span']),
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  style: PropTypes.object,
  color: PropTypes.string, // You can also use Tailwind colors directly
};

// Default Props
Text.defaultProps = {
  tag: 'p',
  className: '',
  style: {},
  color: 'inherit', // Default to inherit color from the parent
};

export default Text;
