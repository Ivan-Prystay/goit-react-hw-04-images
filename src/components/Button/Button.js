import PropTypes from 'prop-types';

import { LoadMore } from './Button.styled';

export function Button({ addPage }) {
  return (
    <LoadMore type="button" onClick={addPage}>
      Load more
    </LoadMore>
  );
}

Button.propTypes = {
  addPage: PropTypes.func.isRequired,
};
