import PropTypes from 'prop-types';

export const userShape = PropTypes.shape({
  email: PropTypes.string,
  username: PropTypes.string,
  id: PropTypes.number,
  fullName: PropTypes.string,
  role: PropTypes.string,
  studyGroup: PropTypes.string,
});
