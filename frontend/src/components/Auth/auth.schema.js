import PropTypes from 'prop-types';

export const userShape = PropTypes.shape({
  email: PropTypes.string,
  username: PropTypes.string,
  id: PropTypes.number,
});
